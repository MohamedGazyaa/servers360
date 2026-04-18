import { getServer } from "@/lib/api";
import ServerDetail from "@/components/dashboard/ServerDetail";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const server = await getServer(id);
    return { title: `${server.name} — Servers360` };
  } catch {
    return { title: "Server — Servers360" };
  }
}

export default async function ServerDetailPage({ params }) {
  const { id } = await params;
  let server;
  try {
    server = await getServer(id);
  } catch {
    notFound();
  }

  return <ServerDetail server={server} />;
}
