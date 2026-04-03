export default function Button({ children, onClick, variant = "primary" }) {
  const bg = variant === "primary" ? "bg-blue-600" : "bg-gray-200";
  const text = variant === "primary" ? "text-white" : "text-black";

  return (
    <button 
      onClick={onClick}
      className={`${bg} ${text} px-6 py-3 rounded-full font-bold active:scale-95 transition-all min-h-[44px] min-w-[44px] shadow-sm hover:opacity-90`}
    >
      {children}
    </button>
  );
}