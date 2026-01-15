"use client";
import { useState } from "react";
import SearchBar from "@/components/molecules/SearchBar";
import { GiHamburgerMenu } from "react-icons/gi";

interface HeaderProps {
  view: "grid" | "list";
  onToggleView: () => void;
  onSearch: (value: string) => void;
}

export default function Header({ view, onToggleView, onSearch }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

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
      </nav>
    </header>
  );
}
