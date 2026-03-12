import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const getAccessToken = () => localStorage.getItem("access_token");
export const getRefreshToken = () => localStorage.getItem("refresh_token");

const API_BASE_URL = "http://127.0.0.1:8001";
const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export const isTokenExpired = (token) => {
    if (!token) return true;
    try{
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    }
    catch (err) {
      console.error("Invalid token:", err);
      return true;
    }
};

export const refreshToken = async () => {
    const refresh = getRefreshToken();
    if (!refresh || isTokenExpired(refresh)) {
        logoutUser();
        return null;
    }

    const response = await axios.post(`${API_BASE_URL}/token/refresh/`, { refresh });
    localStorage.setItem("access_token", response.data.access);
    if (response.data.refresh) localStorage.setItem("refresh_token", response.data.refresh);

    return response.data.access;
};

export const getAuthenticatedRequest = async (url, method = "GET", data = null) => {
    let token = getAccessToken();

    if (!token || isTokenExpired(token)) {
        token = await refreshToken();
        if (!token) throw new Error("Authentication failed, please log in again.");
    }

    const headers = { Authorization: `Bearer ${token}` };
    const config = { method, url: `${API_BASE_URL}${url}`, headers, data };

    const response = await axios(config);
    return response.data;
};

export const login = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/login/`, {
        email,
        password,
    });

    localStorage.setItem(ACCESS_TOKEN, response.data.access);
    localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

    return response.data;
};

export const signup = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/signup/`, {
        email,
        password,
    });

    return login(email,password)
};

export const logout = () => {
    console.log("LOGOUT CALLED");
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
};

export const isLoggedIn = () => {
    return localStorage.getItem(ACCESS_TOKEN) !== null;
};

export const getSamples = () => {
    return axios.get(`${API_BASE_URL}/get_samples/`)
        .then(res => res.data);
};


export const saveGraph = async (name, description, nodes, edges) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    const response = await axios.post(
        `${API_BASE_URL}/save_graph/`,
        { name, description, nodes, edges },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const getSavedGraphs = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    return axios.get(`${API_BASE_URL}/save_graph/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data);
};