import { query } from "../../../app/lib/db";
import { NextResponse } from "next/server";
export async function POST(req){
    const {request, category} = await req.json();
    try{
        let posts
        if(request==='article'){
            if (category){
                posts = await query(`SELECT * FROM artikel WHERE ArticleCategory = @param0`,[category]);
              
            }else{
                posts = await query(`SELECT * FROM artikel`);
            }
        }else if(request==='trivia'){
            posts = await query(`SELECT * FROM artikel WHERE Trivia = 1`);
        }
        return NextResponse.json({article:posts,})
    }
    catch(error)
    {
        console.log(error)
        return NextResponse.json({error: error.message})
    }
}