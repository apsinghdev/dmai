import { createBackendClient } from "@pipedream/sdk/server";

export async function getPipedreamClient() {
  const pd = createBackendClient({
    environment: "development" as const,
    credentials: {
      clientId: process.env.PIPEDREAM_CLIENT_ID as string,
      clientSecret: process.env.PIPEDREAM_CLIENT_SECRET as string,
    },
    projectId: process.env.PIPEDREAM_PROJECT_ID as string,
  });

  // Create a token for a specific user
  const { token, expires_at, connect_link_url } = await pd.createConnectToken({
    external_user_id: "a134827d-8ef8-4b2b-aba1-4aab0b602f3e",
  });

  return { pd, token, expires_at, connect_link_url };
}
