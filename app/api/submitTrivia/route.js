import { NextResponse } from "next/server";
import { query } from "../../../app/lib/db";
import { nanoid } from 'nanoid';

function generateTriviaID() {
  return `TRI-${nanoid(5)}`; 
}
export async function POST(req) {
  const { triviadata, externalData } = await req.json();
  console.log(triviadata, externalData)
  try {
    await Promise.all(
      triviadata.map(async (items, index) => {
        const triviaID = generateTriviaID();
        await query(
          `INSERT INTO trivia (
            TriviaID, ArticleID, UserID, TriviaQuestion, TriviaOptionA, TriviaOptionB,
            TriviaOptionC, TriviaOptionD, TriviaAnswer
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            triviaID,
            externalData.id,
            externalData.UserID,
            items.question,
            items.options[0],
            items.options[1],
            items.options[2],
            items.options[3],
            items.answer,
          ]
        );
      })
    );

    return NextResponse.json({
      success: true,
      message: "Trivia berhasil disimpan!",
    });
  } catch (e) {
    console.error("Trivia submit error:", e);
    return NextResponse.json({
      success: false,
      message: e.message ?? "Trivia gagal dikirim",
    });
  }
}
