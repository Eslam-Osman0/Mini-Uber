import { neon } from "@neondatabase/serverless";

export const POST = async (request: Request) => {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { name, email, clerkId } = await request.json();
    if (!name || !email || !clerkId) {
      return Response.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await sql`
    INSERT INTO users (name, email, clerk_id)
    VALUES (${name}, ${email}, ${clerkId})
    `;
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
