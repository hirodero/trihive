import { handleLogin } from "@auth0/nextjs-auth0";

export function GET(request) {
  const { searchParams } = new URL(request.url);
  const returnTo = searchParams.get('returnTo') || '/post-login'; 

  return handleLogin(request, {
    returnTo,
  });
}
