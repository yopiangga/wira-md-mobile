const allCookies = document.cookie;

function parseCookies() {
  const cookies = {};
  document.cookie.split(";").forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    cookies[name] = value;
  });
  return cookies;
}

export const cookies = parseCookies();

export const headers = {
  Authorization: `Bearer ${cookies.token}`,
  "Content-Type": "application/json", // Optional, set the content type if needed
};

export const headersFormData = {
  Authorization: `Bearer ${cookies.token}`,
  "Content-Type": "multipart/form-data",
};

export const headersFormUrl = {
  Authorization: `Bearer ${cookies.token}`,
  "Content-Type": "application/x-www-form-urlencoded",
};

export const headersDownload = {
  Authorization: `Bearer ${cookies.token}`,
};
