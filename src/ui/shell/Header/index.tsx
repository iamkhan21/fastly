import React from "react";
import { Link } from "wouter";
import { logout } from "@application/auth";

const Header = () => {
  return (
    <header
      className="p-2 flex flex-col items-center bg-gray-800 text-white shadow-lg shadow-gray-500 z-1"
      data-testid="header"
    >
      <h2 className="m-0 mb-5">D</h2>
      <nav className="flex flex-col space-y-2">
        <Link href="/home">
          <a className="text-white">H</a>
        </Link>
        <Link href="/home/3ortis">
          <a className="text-white">J</a>
        </Link>
        <Link href="/users">
          <a className="text-white">P</a>
        </Link>
        <Link href="/about">
          <a className="text-white">A</a>
        </Link>
      </nav>

      <button type="button" className="mt-auto" onClick={() => logout()}>
        M
      </button>
    </header>
  );
};

export default Header;
