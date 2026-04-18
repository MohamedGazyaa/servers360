import clsx from "clsx";

export default function Button({ children, variant = "primary", className, disabled, ...props }) {
  return (
    <button
      disabled={disabled}
      aria-disabled={disabled}
      className={clsx(
        "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === "primary" &&
          "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
        variant === "outline" &&
          "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
