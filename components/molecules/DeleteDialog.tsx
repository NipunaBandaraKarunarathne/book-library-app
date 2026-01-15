"use client";

interface Props {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteDialog({ title, onConfirm, onCancel }: Props) {
  return (
    <div className="modal">
      <div className="dialog">
        <h3>Delete Book</h3>
        <p>
          Are you sure you want to delete <strong>{title}</strong>?
        </p>

        <div className="actions">
          <button onClick={onCancel}>Cancel</button>
          <button className="danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
