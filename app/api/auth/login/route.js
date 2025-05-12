import { handleLogin } from "@auth0/nextjs-auth0";

export function GET(request) {
  return handleLogin(request, {
    returnTo: '/post-login', 
  });
}