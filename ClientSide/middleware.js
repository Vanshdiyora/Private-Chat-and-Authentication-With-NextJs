import { NextRequest, NextResponse } from 'next/server';

function parseCookies(cookieString) {
  const cookies = {};
  cookieString.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.split('=');
    cookies[name.trim()] = rest.join('=').trim();
  });
  return cookies;
}

export default function middleware(req) {
  const cookie = req.headers.get('cookie') || '';
  const cookies = parseCookies(cookie);
  const userCookie = cookies.user;

  let userState = null;


    userState = userCookie ? JSON.parse(decodeURIComponent(userCookie)) : null;
 

  const response = NextResponse.next();

  const chatRoutePattern = /^\/chat\/[^/]+$/;
  if (!userState || !userState.isAuth) {
    if (chatRoutePattern.test(req.nextUrl.pathname)) {
      const loginURL = new URL('/login', req.nextUrl.origin);
      return NextResponse.redirect(loginURL.toString());
    }
  }

  return response;
}
