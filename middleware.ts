// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isPublic = createRouteMatcher(["/(.*)", "/sign-in(.*)", "/sign-up(.*)"]);

// //  here we mentioning which routes are public.

// export default clerkMiddleware(async (auth, request) => {
//   if (isPublic(request)) await auth.protect();
// });

// // export default clerkMiddleware({
// //   publicRoutes: ["/", "/sign-in(.*)", "/sign-up(.*)"],
// // });

// export const config = {
//   matcher: [
//     //
//     //  Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     //
//     //  Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
