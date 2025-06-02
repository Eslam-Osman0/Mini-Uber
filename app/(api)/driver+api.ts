import { neon } from "@neondatabase/serverless";

export const GET = async () => {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`SELECT * FROM drivers`;
    return Response.json({ data: response }, { status: 200 });
  } catch (error) {
    return Response.json({ data: { error } }, { status: 500 });
  }
};
