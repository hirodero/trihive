import { getSession } from "@auth0/nextjs-auth0";
import { createAccessToken } from "../../../lib/createAccessToken";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const token = await createAccessToken();

    const response = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${user.sub}/roles`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: `Failed to fetch roles: ${errText}` }, { status: 500 });
    }

    const data = await response.json();
    console.log("User roles:", data[0]);

    return NextResponse.json({ role: data[0] });
  } catch (err) {
    console.error("Error fetching roles:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
