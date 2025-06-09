const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const generateRefreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
        const response = await fetch(`${BASE_URL}/users/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: refreshToken }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("accessToken", data.accessToken);
            return data.accessToken;
        } else {
            throw new Error("Failed to refresh token");
        }
    };
    throw new Error("No refresh token found");
}

export const authFetch = async (url, options = {}) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
        ...options.headers,
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
    };

    const response = await fetch(`${BASE_URL}${url}`, { ...options, headers });

    if (response.status === 403 || response.status === 401) {
        try {
            const newAccessToken = await generateRefreshToken();
            headers.Authorization = `Bearer ${newAccessToken}`;

            const retryResponse = await fetch(`${BASE_URL}${url}`, { ...options, headers });
            if (!retryResponse.ok) {
                throw new Error("Retry request failed");
            }
            return retryResponse.json();
        } catch (error) {
            console.error("Error refreshing token:", error);
            throw error;
        }
    }

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
}