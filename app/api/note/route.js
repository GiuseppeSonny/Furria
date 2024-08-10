import dbConnection from "../../utils/dbConnection";
import Note from "../../models/Note";

export const GET = async (req) => {
  try {
    await dbConnection();
    const url = new URL(req.url);
    const cityId = url.searchParams.get("cityId");

    let note;
    if (cityId) {
      note = await Note.find({ cityId });
    } else {
      note = await Note.find({});
    }
    return new Response(JSON.stringify({ success: true, data: note }), {
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

export const POST = async (req) => {
  try {
    await dbConnection();
    const body = await req.json();
    if (!body.cityId) {
      return new Response(
        JSON.stringify({ success: false, error: "City ID is required" }),
        {
          status: 400,
          headers: { "Content-type": "application/json" },
        }
      );
    }
    const note = await Note.create(body);
    return new Response(JSON.stringify({ success: true, data: note }), {
      status: 201,
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
