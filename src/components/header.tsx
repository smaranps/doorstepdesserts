
"use client";

import Link from "next/link";
import { CakeSlice } from "lucide-react";

export function Header() {
  const dripBg = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill-opacity='0.4'%3E%3Cpath fill='%23ffc0cb' d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3Cpath fill='%23add8e6' d='M36 0v4h-2V0h-4v2h4v4h2V6h4V4h-4z'/%3E%3Cpath fill='%2390ee90' d='M6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3Cpath fill='%23ffff00' d='M6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;
  const chocolateBg = "hsl(var(--primary))";

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 text-primary-foreground"
      style={{
        backgroundColor: chocolateBg,
        backgroundImage: dripBg,
      }}
    >
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <CakeSlice className="h-6 w-6 text-primary-foreground" />
            <span className="font-bold font-headline text-primary-foreground">
              Doorstep Desserts
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
