import { getSession } from '@auth0/nextjs-auth0';
import { createAccessToken } from "../../lib/createAccessToken";
import { query } from '../../../app/lib/db';

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

    const { sub: userID, nickname: username, email: userEmail, picture: userPicture } = session.user;

    const rows = await query('SELECT * FROM msuser WHERE UserID = @param0', [userID]);

    if (!rows || rows.length === 0) {
      await query(
        'INSERT INTO msuser (UserID, Email, Username, UserPicture, UserScore) VALUES (@param0, @param1, @param2, @param3, 0)',
        [userID, userEmail, username, userPicture]
      );
    }

    return new Response(JSON.stringify({ message: 'User saved to database' }), {
      status: 200,
    });

  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: 'Database error', error: err.message }),
      { status: 500 }
    );
  }
}
