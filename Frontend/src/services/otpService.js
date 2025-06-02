const BASE_URL = 'http://localhost:3000/otp';

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