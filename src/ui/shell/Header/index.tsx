import React, { FC } from "react";
import { Link, useLocation } from "wouter";
import Menu from "@ui/shell/Header/Menu";
import style from "./style.module.pcss";
import { useAuthState } from "@ui/hooks/useAuthState";
import { checkIsUserAdmin } from "@domain/user";

interface Props {
  href: string;
  title?: string;
}

const ActiveLink: FC<Props> = ({ children, title, ...props }) => {
  const [location] = useLocation();

  const active = location.includes(props.href) ? style.active : "";
  return (
    <Link {...props}>
      <a className={`${style.link} ${active}`} title={title}>
        {children}
      </a>
    </Link>
  );
};

const Header = () => {
  const auth = useAuthState();

  const isAdmin = checkIsUserAdmin(auth);

  return (
    <header
      className="relative card card--left w-12 flex flex-col items-stretch z-5"
      data-testid="header"
    >
      <h2 className="m-0 mb-5 text-center">F</h2>

      <nav className="flex flex-col space-y-3">
        <ActiveLink href="/home" title="Dispatches">
          <i className={`${style.icon} icon i-mdi-headset`} />
        </ActiveLink>
        <ActiveLink href="/jobs" title="Jobs management">
          <i className={`${style.icon} icon i-mdi-file-document-multiple`} />
        </ActiveLink>
        <ActiveLink href="/fleet" title="Fleet management">
          <i className={`${style.icon} icon i-mdi-badge-account`} />
        </ActiveLink>
        {isAdmin && (
          <ActiveLink href="/finance" title="Job payments">
            <i className={`${style.icon} icon i-mdi-wallet`} />
          </ActiveLink>
        )}
      </nav>

      <Menu />
    </header>
  );
};

export default Header;
