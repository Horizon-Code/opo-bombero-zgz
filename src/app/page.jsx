"use client";
import dynamic from "next/dynamic";

// La app usa recharts y supabase en el cliente: la cargamos sin SSR
const App = dynamic(() => import("../components/App"), { ssr: false });

export default function Page() {
  return <App />;
}
