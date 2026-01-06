
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
  const headerStyle = {
    backgroundColor: "hsl(var(--primary))",
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill-opacity='0.4'%3E%3Cpath fill='%23ffc0cb' d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3Cpath fill='%23add8e6' d='M36 0v4h-2V0h-4v2h4v4h2V6h4V4h-4z'/%3E%3Cpath fill='%2390ee90' d='M6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3Cpath fill='%23ffff00' d='M6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 text-primary-foreground"
      style={headerStyle}
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
