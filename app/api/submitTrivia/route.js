import { NextResponse } from "next/server";
import { query } from "../../../app/lib/db";

function generateTriviaID(index) {
  const timestamp = Date.now();
  return `TRI${timestamp}${index.toString().padStart(2, "0")}`;
}

export async function POST(req) {
  const { triviadata, externalData } = await req.json();

  try {
    await Promise.all(
      triviadata.map(async (items, index) => {
        const triviaID = generateTriviaID(index);

        await query(
          `INSERT INTO trivia (
            TriviaID, ArticleID, UserID, TriviaQuestion, TriviaOptionA, TriviaOptionB,
            TriviaOptionC, TriviaOptionD, TriviaAnswer
          )
          VALUES (@param0, @param1, @param2, @param3, @param4, @param5, @param6, @param7, @param8)`,
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
