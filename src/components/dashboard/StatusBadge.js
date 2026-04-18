import clsx from "clsx";

const STATUS_STYLES = {
  up: "bg-green-100 text-green-800 border border-green-200",
  down: "bg-red-100 text-red-800 border border-red-200",
  degraded: "bg-yellow-100 text-yellow-800 border border-yellow-200",
};

const STATUS_DOT = {
  up: "bg-green-500",
  down: "bg-red-500",
  degraded: "bg-yellow-500",
};

const STATUS_LABEL = {
  up: "Up",
  down: "Down",
  degraded: "Degraded",
};

export default function StatusBadge({ status }) {
  const normalized = status?.toLowerCase() ?? "unknown";
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        STATUS_STYLES[normalized] ?? "bg-gray-100 text-gray-600 border border-gray-200"
      )}
    >
      <span
        aria-hidden="true"
        className={clsx(
          "w-1.5 h-1.5 rounded-full",
          STATUS_DOT[normalized] ?? "bg-gray-400"
        )}
      />
      {STATUS_LABEL[normalized] ?? status}
    </span>
  );
}
