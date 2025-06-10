import { authFetch } from '../helpers/authFetch';

export const loadUserOptions = async (inputValue, callback) => {
    if (!inputValue) {
        callback([]);
        return;
    }

    try {
        const response = await authFetch(`/users?search=${inputValue}`, {
            method: 'GET',
        });
        const members = response;
        const formatted = members.map(member => ({
            value: member.id,
            label: member.name,
            email: member.email
        }));
        callback(formatted);
    } catch (error) {
        console.error("Error fetching members", error);
        callback([]);
    }
};
