import { NextResponse } from "next/server";
import { query } from "../../../app/lib/db";
export async function POST(req){
    const {ArticleID} = await req.json()
    try{
        const response = await query('SELECT TriviaQuestion, TriviaOptionA, TriviaOptionB, TriviaOptionC, TriviaOptionD, TriviaAnswer from trivia WHERE ArticleID = @param0',[ArticleID])
        return NextResponse.json({trivia:response});
    }
    catch(error){
        return NextResponse.error(error);
    }
}