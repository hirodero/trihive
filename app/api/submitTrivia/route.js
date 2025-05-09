import { NextResponse } from "next/server";
import {query} from '../../../app/lib/db'
export async function POST(req){
    const {triviadata,externalData}=await req.json()
    try{
        await Promise.all(
            triviadata.map( async (items,index)=>{
            const data = await query('INSERT INTO trivia (ArticleID, UserID, TriviaQuestion, TriviaOptionA, TriviaOptionB,   TriviaOptionC, TriviaOptionD, TriviaAnswer) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [externalData.id, externalData.UserID, items.question, items.options[0], items.options[1], items.options[2], items.options[3], items.answer]
            )
            const id= 'TRI' + data?.insertId.toString().padStart(3,'0');
            return await query('UPDATE trivia SET TriviaID = ? WHERE id = ?',[id,data.insertId] )
        }))
        return NextResponse.json({
            success: true,
            message: 'yay'
        })
    }catch(e){
        return NextResponse.json({
            success:false,
            message:'nay'
        })
    }
}