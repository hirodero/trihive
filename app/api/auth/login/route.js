import { handleLogin } from "@auth0/nextjs-auth0";

export function GET(request) {
  const returnTo = request.nextUrl.searchParams.get("returnTo") || "/post-login";

  return handleLogin(request, {
    returnTo,
  });
}
