import { getSession } from "@auth0/nextjs-auth0";
import { createAccessToken } from "../../../lib/createAccessToken";
import { NextResponse } from "next/server";

export async function GET() {
  try{
    const session = await getSession();
    if (!session || !session.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
  
    const token = await createAccessToken();
    const res = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${session.user.sub}/roles`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
  
    
    return new Response(JSON.stringify({data:data[0]}), { status: 200 });
  }catch(e){
    return NextResponse.json({
      data:[]
    })
  }
}
