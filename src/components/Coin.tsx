export default function Coin({ size }: { size: "sm" | "md" | "lg" }) {
  return (
    <div
      className={`border-2 rounded-full bg-yellow-400 border-yellow-500 padding-2 flex flex-col justify-center shadow-md text-center text-yellow-600 ${
        size === "sm" ? "w-6 h-6" : size === "md" ? "w-8 h-8" : "w-10 h-10"
      }`}
    >
      $
    </div>
  );
}
