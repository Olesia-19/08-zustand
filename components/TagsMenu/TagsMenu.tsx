"use client";

import { useState } from "react";
import css from "./TagsMenu.module.css";
import Link from "next/link";

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const categories = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggle}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {categories.map((category) => (
            <li key={category}>
              <Link
                href={`/notes/filter/${category}`}
                className={css.menuLink}
                onClick={toggle}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
