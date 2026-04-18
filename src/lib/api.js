const BASE = process.env.MOCKAPI_BASE_URL;

export async function getServers({ status, sortBy, order } = {}) {
  const params = new URLSearchParams();
  if (status && status !== "all") params.set("status", status);
  if (sortBy) params.set("sortBy", sortBy);
  if (order) params.set("order", order);

  const query = params.size ? `?${params}` : "";
  const res = await fetch(`${BASE}/servers${query}`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error(`Failed to fetch servers: ${res.status}`);
  return res.json();
}

export async function getServer(id) {
  const res = await fetch(`${BASE}/servers/${id}`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error(`Server not found: ${id}`);
  return res.json();
}

export async function createServer(data) {
  const res = await fetch(`${BASE}/servers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to create server: ${res.status}`);
  return res.json();
}
