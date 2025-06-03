import { query } from "../../../app/lib/db";
export async function POST(req) {
    try {
      const body = await req.json();
      const { articleID } = body;
      
      const checkTrivia = await query('SELECT Trivia FROM artikel WHERE ArticleID = ?',[articleID])
      console.log(checkTrivia)
      if(checkTrivia[0].Trivia===1){
        const deleteTrivia = [await query('DELETE FROM trivia WHERE ArticleID = ?',[articleID]),
        await query('UPDATE artikel SET Trivia = 0 WHERE ArticleID = ?',[articleID])]
      }
      const deleteArticle = await query('DELETE FROM artikel WHERE ArticleID = ?',[articleID])

      return new Response(JSON.stringify({ message: 'Article deleted successfully' }), {
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
  