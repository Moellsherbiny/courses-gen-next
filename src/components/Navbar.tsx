"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "معرفة المزيد" },
  { href: "/how-it-works", label: "كيف تعمل؟" },
]
export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary">

      <nav className="container px-4 md:px-16 py-3 flex items-center justify-between">
        <Logo />


        {/* Desktop Links */}
        <div className="hidden md:flex items-center md:gap-8">
          {links.map((link) => {
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-white  hover:text-gray-200 transition-colors duration-200"
              >
                {link.label}
              </Link>
            )
          })}
          <Button className="bg-secondary text-primary">
            <Link href="/auth/signin">تسجيل الدخول</Link>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6 transition-transform duration-200 transform rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow rounded-lg p-4 flex flex-col space-y-3 md:hidden transition-all duration-200 animate-accordion-down z-10">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Button>
              <Link href="/auth/signin">تسجيل الدخول</Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
