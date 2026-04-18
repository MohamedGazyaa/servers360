import { Suspense } from "react";
import Link from "next/link";
import { getServers } from "@/lib/api";
import ServerList from "@/components/dashboard/ServerList";
import FilterBar from "@/components/dashboard/FilterBar";
import Spinner from "@/components/ui/Spinner";

export const metadata = {
  title: "Dashboard — Servers360",
};

async function Servers({ searchParams }) {
  const { status, sort } = await searchParams;
  const [sortBy, order] = sort ? sort.split("-") : [undefined, undefined];

  let servers = [];
  try {
    servers = await getServers({ status, sortBy, order });
  } catch {
    return (
      <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
        Failed to load servers. Check your MOCKAPI_BASE_URL environment variable.
      </div>
    );
  }

  return (
    <>
      <FilterBar total={servers.length} />
      <ServerList servers={servers} />
    </>
  );
}

export default function DashboardPage({ searchParams }) {
  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Server Status</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time overview of all monitored servers</p>
        </div>
        <Link
          href="/servers/add"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Server
        </Link>
      </div>
      <Suspense
        fallback={
          <div className="flex items-center gap-2 text-gray-400 py-12 justify-center">
            <Spinner />
            <span className="text-sm">Loading servers…</span>
          </div>
        }
      >
        <Servers searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
