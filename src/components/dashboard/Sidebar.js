"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

const NAV = [
  {
    href: "/dashboard",
    label: "Dashboard",
    d: "M4 6h16M4 10h16M4 14h16M4 18h16",
  },
  {
    href: "/servers/add",
    label: "Add Server",
    d: "M12 4v16m8-8H4",
  },
];

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div aria-hidden="true" className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
      <span className="font-bold text-gray-900">Servers360</span>
    </div>
  );
}

function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="space-y-1">
      {NAV.map(({ href, label, d }) => (
        <Link
          key={href}
          href={href}
          aria-current={pathname === href ? "page" : undefined}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            pathname === href
              ? "text-indigo-600 bg-indigo-50"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
          </svg>
          {label}
        </Link>
      ))}
    </div>
  );
}

function UserInfo({ user }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2 mb-1">
      {user?.image ? (
        <img src={user.image} alt={`${user.name ?? "User"}'s avatar`} className="w-7 h-7 rounded-full" />
      ) : (
        <div aria-hidden="true" className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-600">
          {user?.name?.[0]?.toUpperCase() ?? "U"}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{user?.name ?? "User"}</p>
        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
      </div>
    </div>
  );
}

export default function Sidebar({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top navbar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-30 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <Logo />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Open navigation menu"
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          aria-hidden="true"
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`md:hidden fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 p-3">
          <NavLinks />
        </nav>

        <div className="p-3 border-t border-gray-100">
          <UserInfo user={user} />
          <SignOutButton />
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col shrink-0">
        <div className="p-5 border-b border-gray-100">
          <Logo />
        </div>

        <nav className="flex-1 p-3">
          <NavLinks />
        </nav>

        <div className="p-3 border-t border-gray-100">
          <UserInfo user={user} />
          <SignOutButton />
        </div>
      </aside>
    </>
  );
}
