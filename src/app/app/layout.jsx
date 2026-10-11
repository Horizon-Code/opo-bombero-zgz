// La zona privada (tests, progreso) no se indexa en Google
export const metadata = {
  title: "Mi panel",
  robots: { index: false, follow: false },
  alternates: { canonical: "/app" },
};

export default function AppLayout({ children }) {
  return children;
}
