// frontend/src/services/api.js

const API_URL = "http://127.0.0.1:8000/api/graph/";

export async function fetchGraph() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching graph:", err);
    throw err;
  }
}
