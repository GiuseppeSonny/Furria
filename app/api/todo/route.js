import dbConnection from "../../utils/dbConnection";
import Todo from "@/app/models/Todo";

export const GET = async (req) => {
  try {
    await dbConnection();
    const url = new URL(req.url);
    const cityId = url.searchParams.get("cityId");

    let todos;
    if (cityId) {
      todos = await Todo.find({ cityId });
    } else {
      todos = await Todo.find({});
    }

    return new Response(JSON.stringify({ success: true, data: todos }), {
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
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const todo = await Todo.create(body);
    return new Response(JSON.stringify({ success: true, data: todo }), {
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
