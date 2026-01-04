import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isAuthPage = nextUrl.pathname.startsWith("/login");
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isPublicRoute = ["/", "/terms"].includes(nextUrl.pathname);

  if (!isLoggedIn && !isAuthPage && !isApiAuthRoute && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  if (isLoggedIn && isAuthPage) {
    return Response.redirect(new URL("/chat/1", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
