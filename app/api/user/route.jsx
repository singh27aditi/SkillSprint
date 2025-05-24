import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req) {
  const { email, name } = await req.json();

  // Basic validation
  if (!email || !name) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  // Check if user already exists
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  // If user does not exist, insert
  if (users.length === 0) {
    const result = await db
      .insert(usersTable)
      .values({
        name: name,
        email: email,
      })
      .returning();

    return NextResponse.json(result[0]);
  }

  // User already exists
  return NextResponse.json(users[0]);
}
