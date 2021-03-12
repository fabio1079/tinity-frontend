import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export type HeaderRoute = {
  text: string;
  path: string;
};

export interface HeaderProps {
  routes: HeaderRoute[];
}

export default function Header({ routes }: HeaderProps) {
  const [isActive, setisActive] = useState(false);
  const location = useLocation();

  const routeToLink = ({ text, path }: HeaderRoute) => {
    let className = "navbar-item";

    if (location.pathname === path) {
      className += " is-active";
    }

    return (
      <Link key={path} to={path} className={className}>
        {text}
      </Link>
    );
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <strong>Tinity</strong>
        </Link>

        {/* eslint-disable-next-line */}
        <a
          onClick={() => {
            setisActive(!isActive);
          }}
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-start">{routes.map(routeToLink)}</div>
      </div>
    </nav>
  );
}
