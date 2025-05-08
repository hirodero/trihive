import { query } from "../../../app/lib/db";
import { NextResponse } from "next/server";
export async function GET(){
    try{
        const posts = await query(`SELECT * FROM faq`);
        
        return NextResponse.json({faq:posts,})
    }
    catch(error)
    {
        console.log(error)
        return NextResponse.json({error: error.message})
    }
}