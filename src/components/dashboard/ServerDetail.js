import Link from "next/link";
import StatusBadge from "./StatusBadge";

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <dt className="flex items-center gap-2 text-gray-500 text-sm mb-2">
        {icon}
        {label}
      </dt>
      <dd className="text-xl font-semibold text-gray-900">{value}</dd>
    </div>
  );
}

export default function ServerDetail({ server }) {
  return (
    <div className="max-w-3xl">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
      >
        <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-gray-900">{server.name}</h1>
          <StatusBadge status={server.status} />
        </div>

        <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
          <span className="font-mono">{server.ipAddress}</span>
          {server.location && (
            <>
              <span aria-hidden="true" className="text-gray-300">|</span>
              <span className="flex items-center gap-1.5">
                <svg aria-hidden="true" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {server.location}
              </span>
            </>
          )}
        </div>
      </div>

      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="IP Address"
          value={<span className="font-mono text-base">{server.ipAddress}</span>}
          icon={
            <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
            </svg>
          }
        />
        <StatCard
          label="Response Time"
          value={`${server.responseTime}ms`}
          icon={
            <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
        <StatCard
          label="Uptime"
          value={`${server.upTime}%`}
          icon={
            <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </dl>
    </div>
  );
}
