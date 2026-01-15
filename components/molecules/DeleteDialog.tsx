"use client";

interface Props {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteDialog({ title, onConfirm, onCancel }: Props) {
  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-20">
      {/* Dialog box */}
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Delete Book
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <span className="font-medium">{title}</span>?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
