"use client";

import { useState } from "react";
import { IoGrid, IoList } from "react-icons/io5";
import SearchBar from "@/components/molecules/SearchBar";
import { GiHamburgerMenu } from "react-icons/gi";

interface HeaderProps {
  view: "grid" | "list";
  onToggleView: () => void;
  onSearch: (value: string) => void;
}

export default function Header({ view, onToggleView, onSearch }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(""); // <- store input value

  return (
    <header className="bg-white shadow-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Book Library</h1>

        {/* Mobile menu button */}
        <button
          className="sm:hidden text-gray-600 text-2xl"
          onClick={() => setOpen(!open)}
        >
         <GiHamburgerMenu />

        </button>
      </div>

      <nav
        className={`flex flex-col sm:flex-row sm:items-center gap-2 mt-2 sm:mt-0 ${
          open ? "block" : "hidden sm:flex"
        }`}
      >
        <SearchBar
          value={searchValue}               
          onChange={(val) => {
            setSearchValue(val);            
            onSearch(val);                  
          }}
          placeholder="Search by title or author"
        />

        <button
  onClick={onToggleView}
  className={`
    flex items-center justify-center
    w-10 h-10
    rounded-md
    border border-gray-300
    bg-white dark:bg-gray-800
    text-gray-700 dark:text-gray-200
    hover:bg-gray-100 dark:hover:bg-gray-700
    transition
    focus:outline-none focus:ring-2 focus:ring-blue-500
  `}
  aria-label="Toggle view"
>
  {view === "grid" ? <IoList size={20} /> : <IoGrid size={20} />}
</button>
      </nav>
    </header>
  );
}

