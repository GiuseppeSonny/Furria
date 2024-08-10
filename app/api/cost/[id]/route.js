import dbConnection from "../../../utils/dbConnection";
import Cost from "@/app/models/Cost";

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    await dbConnection();
    const costItem = await Cost.findById(id);
    if (!costItem) {
      return new Response(
        JSON.stringify({ success: false, error: "Expense not found!" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(JSON.stringify({ success: true, data: costItem }), {
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
    const costItem = await Cost.findByIdAndUpdate(id, body, { new: true });
    if (!costItem) {
      return new Response(
        JSON.stringify({ success: false, error: "Expense not found!" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(JSON.stringify({ success: true, data: costItem }), {
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
    const costItem = await Cost.findByIdAndDelete(id);
    if (!costItem) {
      return new Response(
        JSON.stringify({ success: false, error: "Expense not found!" }),
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
