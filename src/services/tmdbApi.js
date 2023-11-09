import axios from 'axios';

const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});

tmdbApi.interceptors.request.use((config) => {
    const accessToken = process.env.REACT_APP_TMDB_API_KEY;
    console.log(process.env)
    config.headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    }
    config.url = `${config.url}${config.url.includes("?") ? "&" : "?"}language=pt-BR`
    return config
})

export default tmdbApi;