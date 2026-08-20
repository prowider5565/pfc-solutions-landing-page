import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip everything that isn't a page: Next internals, the API surface, and —
  // importantly — /assets, which holds the ~150 MB template asset tree. Any path
  // containing a dot (a file extension) is excluded too.
  matcher: "/((?!api|_next|_vercel|assets|.*\\..*).*)",
};
