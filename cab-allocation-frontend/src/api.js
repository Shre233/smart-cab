import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Your backend URL

export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = async (credentials) => {
    return await axios.post(`${API_URL}/auth/login`, credentials);
};

export const registerCab = async (cabData) => {
    return await axios.post(`${API_URL}/admin/register-cab`, cabData);
};

export const getCabs = async () => {
    return await axios.get(`${API_URL}/admin/cabs`);
};

export const searchCabs = async (location) => {
    return await axios.get(`${API_URL}/employee/search-cabs`, { params: location });
};

export const createTrip = async (tripData) => {
    return await axios.post(`${API_URL}/admin/allocate-cab`, tripData);
};
