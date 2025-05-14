import getSessionId from "@/features/cookies/getSessionId";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionId = await getSessionId();

  if (sessionId) {
    redirect("/");
  }

  return <>{children}</>;
}
