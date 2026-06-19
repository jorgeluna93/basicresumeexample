const CLOUD_FUNCTION_URL = import.meta.env.DEV
  ? '/api/name'
  : import.meta.env.VITE_NAME_FUNCTION_URL;

export async function fetchData() {
  if (!CLOUD_FUNCTION_URL) {
    throw new Error("VITE_NAME_FUNCTION_URL is not set in .env");
  }
  const response = await fetch(CLOUD_FUNCTION_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch name: ${response.status}`);
  }
  const data = await response.json();
  
  return data;
}