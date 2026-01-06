
"use client";

import Link from "next/link";

const Logo = () => (
  <svg
    className="h-8 w-8 text-primary-foreground"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#FADADD"
    />
    <path
      d="M2 7L12 12L22 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22V12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 4.5L16 9L12 12L8 9L6.5 4.5"
      stroke="hsl(var(--primary))"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


export function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 text-primary-foreground bg-primary"
    >
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="font-bold font-headline text-primary-foreground">
              Doorstep Desserts
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
