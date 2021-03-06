import React, { useEffect, useRef } from "react";
import { logout } from "@application/auth";
import { animate } from "motion";
import { Link } from "wouter";
import style from "./style.module.pcss";

const Menu = () => {
  const state = useRef(false);

  useEffect(() => {
    function listenCLickOutside(event: MouseEvent) {
      const isMenuClick = (event.target as HTMLElement)?.closest("#menu");
      const isButtonClick = (event.target as HTMLElement)?.closest("#menu-btn");
      if (isMenuClick || isButtonClick) return;
      state.current && toggleMenu();
    }

    document.addEventListener("click", listenCLickOutside);

    return () => {
      document.removeEventListener("click", listenCLickOutside);
    };
  }, []);

  function toggleMenu() {
    const selector = "#menu";
    const duration = 0.15;

    if (state.current) {
      animate(
        selector,
        { transform: "scale(0)" },
        { duration, easing: "ease-in" }
      );
    } else {
      animate(
        selector,
        { transform: "scale(1)" },
        { duration, easing: "ease-out" }
      );
    }

    state.current = !state.current;
  }

  return (
    <>
      <button
        id="menu-btn"
        type="button"
        className="m-2 mt-auto btn btn-icon btn-outline"
        onClick={toggleMenu}
      >
        <i className="i-mdi-cog" />
      </button>
      <section
        id="menu"
        className="absolute bottom-10 left-10 card card--primary py-3 px-4 min-w-60 rounded origin-bottom-left will-change-transform"
        style={{ transform: "scale(0)" }}
      >
        <h4 className="mb-2">Menu</h4>
        <nav className="flex flex-col">
          <Link className={style.menulink} href="/organization">
            Business info
          </Link>
          <Link className={style.menulink} href="/faqs">
            FAQs
          </Link>
          <Link className={style.menulink} href="/about">
            About app
          </Link>
        </nav>
        <br />
        <button className="btn btn-danger btn-small" onClick={() => logout()}>
          Logout
        </button>
      </section>
    </>
  );
};

export default Menu;
