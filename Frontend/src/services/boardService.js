const BASE_URL = import.meta.env.VITE_APP_BASE_URL + '/boards';

export const getBoardById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch board");
  }
  return response.json();
};
