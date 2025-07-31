import type { APIEvent } from "@solidjs/start/server";

export async function GET({ request }: APIEvent) {
  const res = await fetch("https://zenquotes.io/api/random");

  if (!res.ok) {
    return new Response("Failed to fetch quote", { status: 500 });
  }

  const [data] = await res.json();

  const mapped = {
    content: data.q,
    author: data.a,
  };

  return new Response(JSON.stringify(mapped), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
