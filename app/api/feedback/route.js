import { query } from "../../../app/lib/db";
export async function POST(req) {
    try {
      const body = await req.json();
      const { rating, feedback, userID , Email, Username} = body;

  
      await query(
        'INSERT INTO feedback (UserID, Username, Email, Rate, FeedbackDescription) VALUES (@param0, @param1, @param2, @param3, @param4)',
        [userID, Username, Email, rating, feedback] 
      );
  
      return new Response(JSON.stringify({ message: 'Feedback saved successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e) {
      console.error(e);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  