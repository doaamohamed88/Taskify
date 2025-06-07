import { api } from './api';

export const loadUserOptions = async (inputValue, callback) => {
    if (!inputValue) {
        callback([]);
        return;
    }

    try {
        const response = await api.get(`users/?search=${inputValue}`);
        const members = response.data;
        const formatted = members.map(member => ({
            value: member.id,
            label: member.name,
        }));
        callback(formatted);
    } catch (error) {
        console.error("Error fetching members", error);
        callback([]);
    }
};
