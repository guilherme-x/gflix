import axios from 'axios';

const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});

tmdbApi.interceptors.request.use((config) => {
    const accessToken = process.env.TMDB_API_TOKEN;
    config.headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    }
    return config
})

export default tmdbApi;