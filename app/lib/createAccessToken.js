import axios from "axios";

export async function createAccessToken() {
  try {
    const response = await axios.post(
      `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET, 
        audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
      }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } catch (err) {
    console.error("Access token error:", err);
    return null;
  }
}
