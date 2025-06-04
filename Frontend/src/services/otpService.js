const BASE_URL = import.meta.env.VITE_APP_BASE_URL + '/otp';

export const sendOTP = async (email) => {
    const response = await fetch(`${BASE_URL}/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        throw new Error('Failed to send OTP');
    }

    return response.json();
}

export const verifyOTP = async (email, otp) => {
    const response = await fetch(`${BASE_URL}/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
    });

    if (!response.ok) {
        return false;
    }

    return true;
}