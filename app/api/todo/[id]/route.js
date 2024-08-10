import dbConnection from "../../../utils/dbConnection";
import Todo from "@/app/models/Todo";

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    await dbConnection();
    const todoItem = await Todo.findById(id);
    if (!todoItem) {
      return new Response(
        JSON.stringify({ success: false, error: "Todo not found!" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(JSON.stringify({ success: true, data: todoItem }), {
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
    const todoItem = await Todo.findByIdAndUpdate(id, body, { new: true });
    if (!todoItem) {
      return new Response(
        JSON.stringify({ success: false, error: "Todo not found!" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(JSON.stringify({ success: true, data: todoItem }), {
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
    const todoItem = await Todo.findByIdAndDelete(id);
    if (!todoItem) {
      return new Response(
        JSON.stringify({ success: false, error: "Todo not found!" }),
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
