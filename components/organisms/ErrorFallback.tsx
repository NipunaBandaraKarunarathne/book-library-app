"use client";

export default function ErrorFallback() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-2"> Something went wrong!</h1>
        <p className="text-gray-700">
          Don’t worry, our team has been notified. Try refreshing the page.
        </p>
      </div>
    </div>
  );
}