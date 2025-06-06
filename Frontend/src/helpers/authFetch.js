export const authFetch = async (url, options = {}) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const headers = {
        ...options.headers,
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401 && refreshToken) {
        const refreshResponse = await fetch("/users/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: refreshToken }),
        });

        if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            localStorage.setItem("accessToken", data.accessToken);

            headers.Authorization = `Bearer ${data.accessToken}`;
            return fetch(url, { ...options, headers });
        } else {
            throw new Error("Session expired, please log in again.");
        }
    }

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
}