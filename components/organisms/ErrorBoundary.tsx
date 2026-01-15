
"use client";

import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ErrorBoundary({ children, fallback }: Props) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return fallback || (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-2">Oops!</h2>
          <p className="text-gray-600">
            Something went wrong. Please refresh the page.
          </p>
        </div>
      </div>
    );
  }

  try {
    return children;
  } catch (e) {
    console.error("Error caught in ErrorBoundary:", e);
    setHasError(true);
    return null;
  }
}
