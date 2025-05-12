import { NextResponse } from "next/server";
import { query } from "../../../app/lib/db";

export async function POST(req) {
  const { triviadata, externalData } = await req.json();

  try {
    await Promise.all(
      triviadata.map(async (items) => {
        const insertResult = await query(
          `INSERT INTO trivia (
            ArticleID, UserID, TriviaQuestion, TriviaOptionA, TriviaOptionB,
            TriviaOptionC, TriviaOptionD, TriviaAnswer
          )
          OUTPUT INSERTED.id
          VALUES (@param0, @param1, @param2, @param3, @param4, @param5, @param6, @param7)`,
          [
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

        const insertedId = insertResult[0]?.id;
        const triviaID = 'TRI' + insertedId.toString().padStart(3, '0');

        await query(
          'UPDATE trivia SET TriviaID = @param0 WHERE id = @param1',
          [triviaID, insertedId]
        );
      })
    );

    return NextResponse.json({
      success: true,
      message: "yay",
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      success: false,
      message: e.message ?? "nay",
    });
  }
}
