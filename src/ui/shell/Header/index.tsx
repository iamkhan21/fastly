import React from "react";
import { Link } from "wouter";
import { logout } from "@application/auth";

const Header = () => {
  return (
    <header
      className="card card--left p-2 flex flex-col items-center z-1"
      data-testid="header"
    >
      <h2 className="m-0 mb-5">D</h2>
      <nav className="flex flex-col space-y-2">
        <Link href="/home">
          <a>H</a>
        </Link>
        <Link href="/home/3ortis">
          <a>J</a>
        </Link>
        <Link href="/users">
          <a>P</a>
        </Link>
        <Link href="/about">
          <a>A</a>
        </Link>
      </nav>

      <button type="button" className="mt-auto" onClick={() => logout()}>
        M
      </button>
    </header>
  );
};

export default Header;
