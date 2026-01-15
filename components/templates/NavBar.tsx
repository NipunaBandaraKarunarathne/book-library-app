"use client";

import { useState } from "react";
import { IoGrid, IoList, IoMenu, IoClose } from "react-icons/io5";

interface HeaderProps {
  view: "grid" | "list";
  onToggleView: () => void;
  onSearch: (value: string) => void;
}

export default function Header({
  view,
  onToggleView,
  onSearch,
}: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <h1 className="text-lg font-semibold text-gray-800">
          📚 Book Library
        </h1>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setOpen(!open)}
        >
          {open ? <IoClose size={22} /> : <IoMenu size={22} />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={(e) => onSearch(e.target.value)}
            className="w-64 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={onToggleView}
            className="rounded-lg border p-2 text-gray-600 hover:bg-gray-100"
            title="Toggle view"
          >
            {view === "grid" ? <IoList /> : <IoGrid />}
          </button>
        </nav>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-3">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={(e) => onSearch(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => {
              onToggleView();
              setOpen(false);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-lg border py-2 text-sm text-gray-700"
          >
            {view === "grid" ? <IoList /> : <IoGrid />}
            Toggle View
          </button>
        </div>
      )}
    </header>
  );
}

