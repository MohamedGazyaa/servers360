import { NextResponse } from "next/server";

const USERS_URL = `${process.env.MOCKAPI_BASE_URL}/users`;

export async function POST(request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const listRes = await fetch(USERS_URL);
  if (!listRes.ok) {
    return NextResponse.json({ error: "Failed to reach user store." }, { status: 502 });
  }

  const users = await listRes.json();
  if (users.some((u) => u.email === email)) {
    return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
  }

  const createRes = await fetch(USERS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, providers: ["credentials"] }),
  });

  if (!createRes.ok) {
    return NextResponse.json({ error: "Failed to create account." }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}