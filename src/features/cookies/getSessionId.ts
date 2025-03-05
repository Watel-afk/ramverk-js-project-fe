import { cookies } from "next/headers";
import { SESSION_ID } from "./constants";

export default async function getSessionId() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_ID);
  return sessionId;
}
