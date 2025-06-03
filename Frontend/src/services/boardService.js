const BASE_URL = 'http://localhost:3000/boards'

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
