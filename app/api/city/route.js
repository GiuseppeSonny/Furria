import dbConnection from "../../utils/dbConnection";
import City from "@/app/models/City";

export const GET = async (req) => {
  try {
    await dbConnection();
    const city = await City.find({});
    return new Response(JSON.stringify({ success: true, data: city }), {
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
    const city = await City.create(body);
    return new Response(JSON.stringify({ success: true, data: city }), {
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
