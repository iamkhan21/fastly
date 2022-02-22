import React, { FC } from "react";
import { Link, useRoute } from "wouter";
import Menu from "@ui/shell/Header/Menu";
import style from "./style.module.pcss";

interface Props {
  href: string;
}

const ActiveLink: FC<Props> = ({ children, ...props }) => {
  const [isActive] = useRoute(props.href);

  const active = isActive ? style.active : "";
  return (
    <Link {...props}>
      <a className={`${style.link} ${active}`}>{children}</a>
    </Link>
  );
};

const Header = () => {
  return (
    <header
      className="relative card card--left w-12 flex flex-col items-stretch z-1"
      data-testid="header"
    >
      <h2 className="m-0 mb-5 text-center">F</h2>

      <nav className="flex flex-col space-y-3">
        <ActiveLink href="/home">
          <i className={`${style.icon} i-mdi-headset-mic`} />
        </ActiveLink>
        <ActiveLink href="/users">
          <i className={`${style.icon} i-mdi-people`} />
        </ActiveLink>
        <ActiveLink href="/finance">
          <i className={`${style.icon} i-mdi-account-balance-wallet`} />
        </ActiveLink>
      </nav>

      <Menu />
    </header>
  );
};

export default Header;
