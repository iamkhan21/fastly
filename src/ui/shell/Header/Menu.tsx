import React, { useEffect, useRef } from "react";
import { logout } from "@application/auth";
import { animate } from "motion";

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
        className="m-2 mt-auto p-1"
        onClick={toggleMenu}
      >
        <div className="i-mdi-cog text-xl" />
      </button>
      <section
        id="menu"
        className="absolute bottom-10 left-10 card card--primary p-2 min-w-60 rounded origin-bottom-left will-change-transform"
        style={{ transform: "scale(0)" }}
      >
        <h4 className="mb-2">Menu</h4>
        <nav>
          <button onClick={() => logout()}>Logout</button>
        </nav>
      </section>
    </>
  );
};

export default Menu;
