import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);
  
  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <nav className="nav-container">
        <div className="nav-brand">Luis Mercado</div>

        <button
          className={`nav-toggle ${open ? "open" : ""}`}
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          {[
            { to: "/", label: "Home" },
            { to: "/drum-and-bass", label: "Drum & Bass" },
            { to: "/software-engineering", label: "Software" },
            { to: "/wrestling", label: "Wrestling" },
            { to: "/physics", label: "Physics" },
          ].map(({ to, label }) => (
            <li key={label}>
              <NavLink to={to} onClick={closeMenu}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
