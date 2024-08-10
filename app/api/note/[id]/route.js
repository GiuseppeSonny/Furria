import dbConnection from "../../../utils/dbConnection";
import Note from "../../../models/Note";

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    await dbConnection();
    const noteItem = await Note.findById(id);
    if (!noteItem) {
      return new Response(
        JSON.stringify({ success: false, error: "Note not found!" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(JSON.stringify({ success: true, data: noteItem }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const PUT = async (req, { params }) => {
  const { id } = params;

  try {
    await dbConnection();
    const body = await req.json();
    const noteItem = await Note.findByIdAndUpdate(id, body, { new: true });
    if (!noteItem) {
      return new Response(
        JSON.stringify({ success: false, error: "Note not found!" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(JSON.stringify({ success: true, data: noteItem }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await dbConnection();
    const noteItem = await Note.findByIdAndDelete(id);
    if (!noteItem) {
      return new Response(
        JSON.stringify({ success: false, error: "Note not found!" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(JSON.stringify({ success: true, data: {} }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
