"use client";
import { IoSearchSharp } from "react-icons/io5";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search by title or author",
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      {/* Magnifying glass icon */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <IoSearchSharp />
      </span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          pl-10        
          pr-4
          py-2
          rounded-lg
          border
          border-gray-300
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          placeholder-gray-400
          text-gray-800  /* dark text so you can see what you type */
          shadow-sm
          transition
        "
      />
    </div>
  );
}
