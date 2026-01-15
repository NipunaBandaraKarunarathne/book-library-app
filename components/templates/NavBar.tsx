"use client";

import { useState } from "react";
import { IoGrid } from "react-icons/io5";
import { IoList } from "react-icons/io5";

interface HeaderProps {
  view: "grid" | "list";
  onToggleView: () => void;
  onSearch: (value: string) => void;
   onAdd: () => void; 
}

export default function Header({ view, onToggleView, onSearch, onAdd }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">Book Library</div>

      <button className="menu-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <nav className={`nav ${open ? "open" : ""}`}>
        <input
          type="text"
          placeholder="Search by title or author"
          onChange={(e) => onSearch(e.target.value)}
        />

        <button onClick={onToggleView}>
          {view === "grid" ? <IoList /> : <IoGrid />
}
        </button>
           <button className="primary" onClick={onAdd}>
          ➕ Add Book
        </button>
      </nav>
    </header>
  );
}
