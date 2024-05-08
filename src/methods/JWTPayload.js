export function JWTPayload(token) {
  const parts = token.split(".");

  if (parts.length === 3) {
    const payload = base64UrlDecode(parts[1]);
    return payload;
  } else {
    return false;
  }
}

function base64UrlDecode(base64Url) {
  // Pad the base64 URL-encoded string to make it a valid base64 string
  while (base64Url.length % 4 !== 0) {
    base64Url += "=";
  }

  // Convert base64 URL-encoded string to base64
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  // Decode the base64 string
  const decoded = atob(base64);

  // Parse the decoded JSON payload
  return JSON.parse(decoded);
}
