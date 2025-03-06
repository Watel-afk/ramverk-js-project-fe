import getSessionId from "@/features/cookies/getSessionId";

export default async function isLoggedIn() {
  const sessionId = await getSessionId();
  const loggedIn = !!sessionId;
  return loggedIn;
}
