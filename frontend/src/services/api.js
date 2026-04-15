import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const logout = () => {
    console.log("LOGOUT CALLED");
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
};

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refresh = localStorage.getItem(REFRESH_TOKEN);

                if (!refresh) {
                    logout();
                    return Promise.reject(error);
                }

                const res = await axios.post(
                    `${API_BASE_URL}/token/refresh/`,
                    { refresh }
                );

                const newAccess = res.data.access;

                localStorage.setItem(ACCESS_TOKEN, newAccess);

                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                return api(originalRequest);

            } catch (err) {
                logout();
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export const login = async (email, password) => {
    const res = await api.post("/login/", { email, password });

    localStorage.setItem(ACCESS_TOKEN, res.data.access);
    localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

    return res.data;
};

export const signup = async (email, password) => {
    await api.post("/signup/", { email, password });
    return login(email, password);
};

export const isLoggedIn = () => {
    return !!localStorage.getItem(ACCESS_TOKEN);
};

export const getSamples = async () => {
    const res = await api.get("/get_samples/");
    return res.data;
};

export const saveGraph = async (data) => {
    const res = await api.post("/save_graph/", data);
    return res.data;
};

export const getSavedGraphs = async () => {
    const res = await api.get("/save_graph/");
    return res.data;
};

export const getSavedGraphById = async (graphId) => {
    const res = await api.get(`/get_graph/${graphId}/`);
    return res.data;
};

export const editGraph = async (graphId, data) => {
    const res = await api.put(`/edit_graph/${graphId}/`, data);
    return res.data;
};

export const deleteGraph = async (graphId) => {
    const res = await api.delete(`/delete_graph/${graphId}/`);
    return res.data;
};