import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/** Locale-aware wrappers. Use these instead of next/link and next/navigation
 *  so the active locale is preserved on every internal navigation. */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
