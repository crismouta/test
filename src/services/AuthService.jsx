import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080/api/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
axios.defaults.body

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export const AuthService = () => {
    const urlLogin = '/login';
    const myimages = '/images'

    const postLogin = async (username, password) => {
        try {
            const response = await axios.post(urlLogin, {
                username,
                password,
            }, {
                responseType: 'json',
            });
            console.log(response.data)
            const { token } = response.data;
            localStorage.setItem('auth_token', token);
    
            return token;
        } catch (error) {
            console.error(error);

            throw error;
        }
    };

    // Solicitud GET
    const fetchImages = async () => {
        const res = await axios.get(myimages);
        return res;
    };

    const getCurrentUser = () => {
        const auth = localStorage.getItem('auth_token');
        return auth;
    };

    const logout = () => {
        localStorage.removeItem("user");
    };

    return {
        postLogin,
        fetchImages,
        getCurrentUser,
        logout
    }
}