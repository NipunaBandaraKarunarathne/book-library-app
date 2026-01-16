"use client";

interface RatingStarsProps {
  value: number;                     
  editable?: boolean;                
  onChange?: (value: number) => void; 
  size?: number;
}

export default function RatingStars({
  value,
  editable = false,
  onChange,
  size = 20,
}: RatingStarsProps) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= value;

        return (
          <span
            key={star}
            onClick={() => editable && onChange?.(star)}
            style={{
              fontSize: size,
              cursor: editable ? "pointer" : "default",
              color: filled ? "#facc15" : "#d1d5db",
              userSelect: "none",
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
