// middleware.js
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";

  // Check if it's subdomain (excluding www & main domain)
  if (host.includes("localhost")) {
    // Local testing: subdomain.localhost:3000
    const parts = host.split(".");
    if (parts.length > 2 && parts[0] !== "www") {
      const sub = parts[0];
      url.pathname = `/${sub}`; // redirect to dynamic route
      return NextResponse.rewrite(url);
    }
  } 
  else {
    // Production (enamaskar.com)
    // if (host !== "enamaskar.com" && host !== "www.enamaskar.com") {
    //   const sub = host.split(".")[0]; // subdomain
    //   url.pathname = `/${sub}`; // send request to eventSlug route
    //   return NextResponse.rewrite(url);
    // }
  }

  return NextResponse.next();
}
