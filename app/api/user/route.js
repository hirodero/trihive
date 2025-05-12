import { query } from "../../../app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { Request, UserID} = await req.json();
    try {
        let posts;
        if (!Request && !UserID) {
            posts = await query('SELECT * FROM msuser');
        } else if (UserID) {
            console.log('this is userID',UserID)
            posts = await query('SELECT * FROM msuser WHERE UserID = @param0', [UserID]);
        } else if (Request === 'Score') {
            posts = await query('SELECT * FROM msuser ORDER BY UserScore DESC');
        } else if (Request === 'Top3'){
            posts = await query('SELECT TOP 3 * FROM msuser ORDER BY UserScore DESC');

        }
         else {
            posts = [];
        }

        return NextResponse.json({ posts: posts || [] });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message });
    }
}
