
import { getSession } from '@auth0/nextjs-auth0';
import { createAccessToken } from "../../lib/createAccessToken";
import mysql from 'mysql2/promise';

export async function POST() {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
      });
    }
    const token = await createAccessToken();
    const res = await fetch(
        `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${session.user.sub}/roles`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
    // const data = await res.json();

    const { sub: userID, nickname: username, email: userEmail , picture: userPicture} = session.user;

    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'test',
    });

    const [rows] = await db.execute('SELECT * FROM msuser WHERE UserID = ?', [userID]);

    if (rows.length === 0) {
      await db.execute(
        'INSERT INTO msuser (UserID, Email, Username, UserPicture, UserScore) VALUES (?, ?, ?, ?, 0)',
        [userID, userEmail, username, userPicture]
      );
    }

    await db.end();

    return new Response(JSON.stringify({ message: 'User saved to database' }), {
      status: 200,
    });
  } catch (err) {
    console.error('❌ Database error:', err);
    return new Response(JSON.stringify({ message: 'Database error', error: err.message }), {
      status: 500,
    });
  }
}
