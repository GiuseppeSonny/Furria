import dbConnection from "../../../utils/dbConnection";
import City from "@/app/models/City";

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    await dbConnection();
    const cityItem = await City.findById(id);
    if (!cityItem) {
      return new Response(
        JSON.stringify({ success: false, error: "City not found!" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(JSON.stringify({ success: true, data: cityItem }), {
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
    const cityItem = await City.findByIdAndUpdate(id, body, { new: true });
    if (!cityItem) {
      return new Response(
        JSON.stringify({ success: false, error: "City not found!" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(JSON.stringify({ success: true, data: cityItem }), {
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
    const cityItem = await City.findByIdAndDelete(id);
    if (!cityItem) {
      return new Response(
        JSON.stringify({ success: false, error: "City not found!" }),
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
