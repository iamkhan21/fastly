import React, { useEffect, useState } from "react";
import { logout } from "@application/auth";

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    function listenCLickOutside(event: MouseEvent) {
      if ((event.target as HTMLElement)?.closest("#menu")) return;
      setShowMenu(false);
    }

    showMenu &&
      document.addEventListener("click", listenCLickOutside, { once: true });

    return () => {
      document.removeEventListener("click", listenCLickOutside);
    };
  }, [showMenu]);

  return (
    <>
      <button
        id="menu-btn"
        type="button"
        className="m-2 mt-auto p-1"
        onClick={() => setShowMenu(!showMenu)}
      >
        {/*onClick={() => logout()}*/}
        <div className="i-mdi-settings text-xl" />
      </button>
      {showMenu && (
        <section
          id="menu"
          className="absolute bottom-10 left-10 card card--primary p-2 min-w-60 rounded"
        >
          <h4 className="mb-2">Menu</h4>
          <nav>
            <button onClick={() => logout()}>Logout</button>
          </nav>
        </section>
      )}
    </>
  );
};

export default Menu;
