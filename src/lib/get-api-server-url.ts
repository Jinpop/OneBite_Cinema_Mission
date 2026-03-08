export default function getApiServerUrl() {
  const serverUrl =
    process.env.NEXT_PUBLIC_API_SERVER_URL ??
    process.env.API_SERVER_URL ??
    "http://localhost:12345";

  return serverUrl.replace(/\/$/, "");
}
