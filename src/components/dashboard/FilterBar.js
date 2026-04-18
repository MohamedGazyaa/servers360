"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import clsx from "clsx";

const STATUS_FILTERS = [
  { label: "All", value: "all" },
  { label: "Up", value: "up" },
  { label: "Down", value: "down" },
  { label: "Degraded", value: "degraded" },
];

const SORT_OPTIONS = [
  { label: "Name (A–Z)", value: "name-asc" },
  { label: "Name (Z–A)", value: "name-desc" },
  { label: "Response Time", value: "responseTime-asc" },
  { label: "Uptime (High–Low)", value: "upTime-desc" },
];

export default function FilterBar({ total }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") || "all";
  const currentSort = searchParams.get("sort") || "";

  function update(key, value) {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "all" && value !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params}`);
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
      <div role="group" aria-label="Filter by status" className="flex items-center gap-2 flex-wrap">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => update("status", f.value)}
            aria-pressed={currentStatus === f.value}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              currentStatus === f.value
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            )}
          >
            {f.label}
          </button>
        ))}
        {total !== undefined && (
          <span className="text-sm text-gray-400 ml-1" aria-live="polite">
            {total} servers
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="sort-select" className="sr-only">
          Sort servers by
        </label>
        <select
          id="sort-select"
          value={currentSort}
          onChange={(e) => update("sort", e.target.value)}
          className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Sort by…</option>
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
