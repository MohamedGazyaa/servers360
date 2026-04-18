import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({ children }) {
  const session = await auth();
  if (!session) redirect("/login");

  const user = session.user;

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      <Sidebar user={user} />

      {/* Main */}
      <main className="flex-1 overflow-auto pt-14 md:pt-0">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
