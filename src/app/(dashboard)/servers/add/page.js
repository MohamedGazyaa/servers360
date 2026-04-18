import { redirect } from "next/navigation";
import Link from "next/link";
import { createServer } from "@/lib/api";
import AddServerForm from "@/components/dashboard/AddServerForm";

export const metadata = { title: "Add Server — Servers360" };

async function validateLocation(location) {
  "use server";
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1&addressdetails=1`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Servers360/1.0" },
  });
  if (!res.ok) return false;
  const data = await res.json();
  if (!data.length) return false;
  const { address } = data[0];
  return !!(address?.city || address?.town || address?.village || address?.municipality);
}

async function addServer(_prevState, formData) {
  "use server";
  const city = formData.get("city")?.trim() || null;
  const country = formData.get("country")?.trim() || null;
  const location = city && country ? `${city}, ${country}` : city || country || null;

  if (location) {
    const valid = await validateLocation(location);
    if (!valid) {
      return {
        errors: {
          location: "Please enter a valid city and country",
        },
      };
    }
  }

  try {
    await createServer({
      name: formData.get("name"),
      ipAddress: formData.get("ipAddress"),
      status: formData.get("status"),
      location,
      responseTime: Number(formData.get("responseTime")),
      upTime: Number(formData.get("upTime")),
    });
  } catch {
    return { errors: { general: "Failed to add server. Please try again." } };
  }

  redirect("/dashboard");
}

export default function AddServerPage() {
  return (
    <div className="max-w-lg">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Add Server</h1>
        <p className="text-sm text-gray-500 mb-6">Register a new server to monitor</p>
        <AddServerForm action={addServer} />
      </div>
    </div>
  );
}
