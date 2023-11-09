import Carousel, { CarouselItem } from "components/Carousel";
import NavBar from "components/NavBar";
import { useQuery, useMutation } from "@tanstack/react-query";
import tmdbApi from "services/tmdbApi";
import { Button, Card, Modal, Rate, Spin, message } from "antd";
import { useState } from "react";
import ReactPlayer from "react-player";
import { InfoCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import HorizontalList from "components/HorizontalList";

const fetchTrailer = async (movieId) => {
    const { data: { results: data } } = await tmdbApi.get(`/movie/${movieId}/videos`);
    return data[0].key;
}

const fetchMovieInfo = async (movieId) => {
    const { data } = await tmdbApi.get(`/movie/${movieId}?append_to_response=watch/providers`);
    return data;
}
const fetchTvShowInfo = async (serieId) => {
    const { data } = await tmdbApi.get(`/tv/${serieId}?append_to_response=watch/providers`);
    return data;
}

const fetchPopularMovies = async () => {
    const { data: { results: data } } = await tmdbApi.get('/movie/popular');
    return data;
}

const fetchPopularTvShows = async () => {
    const { data: { results: data } } = await tmdbApi.get('/tv/popular');
    return data;
}

const Home = () => {
    const [movieModal, setMovieModal] = useState({ isOpen: false, movieId: null, type: 'trailer', info: null });
    const poster_path = 'https://image.tmdb.org/t/p/original';

    const { data: popularMovies, isFetchingMovies } = useQuery({ queryKey: 'popularMovies', queryFn: fetchPopularMovies, refetchOnWindowFocus: false, initialData: [] });
    const { data: popularTvShows, isFetchingTvShows } = useQuery({ queryKey: 'popularTvShows', queryFn: fetchPopularTvShows, refetchOnWindowFocus: false, initialData: [] });

    const { mutate: fetchTrailerMutation } = useMutation({
        mutationFn: fetchTrailer,
        onSuccess: (data) => {
            setMovieModal(prevState => ({ ...prevState, isOpen: true, movieId: data, type: 'trailer' }));
        },
        onError: () => {
            message.error('Não foi possível carregar o trailer');
        }
    });

    const { mutate: fetchMovieInfoMutation } = useMutation({
        mutationFn: fetchMovieInfo,
        onSuccess: (data) => {
            setMovieModal(prevState => ({ ...prevState, isOpen: true, movieId: null, type: 'info', info: data }));
        },
        onError: () => {
            message.error('Não foi possível carregar o trailer');
        }
    });
    const { mutate: fetchTvShowInfoMutation } = useMutation({
        mutationFn: fetchTvShowInfo,
        onSuccess: (data) => {
            setMovieModal(prevState => ({ ...prevState, isOpen: true, movieId: null, type: 'info', info: data }));
        },
        onError: () => {
            message.error('Não foi possível carregar o trailer');
        }
    });

    const showTrailerModal = (movieId) => {
        fetchTrailerMutation(movieId);
    }

    const showInfoModal = (movieId, type = 'movie') => {
        return {
            movie: () => fetchMovieInfoMutation(movieId),
            tv: () => fetchTvShowInfoMutation(movieId),
        }[type]();
    }

    if (isFetchingMovies || isFetchingTvShows) {
        return <Spin fullscreen />
    }

    const MovieCard = styled.div`
    flex: 0 0 auto;
    margin: 10px;
    cursor: pointer;
`;

    const MoviePoster = styled.img`
    width: 400px;
    height: auto;
    @media (max-width: 768px) {
        width: 200px;
    }
`;

    return (
        <div style={{ position: 'relative' }}>
            <NavBar />
            <Carousel autoplay={!movieModal.isOpen}>
                {
                    popularMovies.slice(0, 10).map(movie =>
                        <CarouselItem key={movie.id} imageUrl={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}>
                            <div className="cover-content">
                                <div className="details">
                                    <h1>{movie.title}</h1>
                                    <Rate defaultValue={movie.vote_average / 2} disabled />
                                    <p>{movie.overview}</p>
                                </div>
                                <div className="buttons">
                                    <Button onClick={() => showTrailerModal(movie.id)} shappe='round' size='large' icon={<PlayCircleOutlined />} ghost>Trailer</Button>
                                    <Button onClick={() => showInfoModal(movie.id)} shappe='round' size='large' ghost icon={<InfoCircleOutlined />}>Mais informações</Button>
                                </div>
                            </div>
                        </CarouselItem>
                    )

                }
            </Carousel>
            <HorizontalList title={"Filmes populares"} dataSource={popularMovies} renderItem={movie => (
                <MovieCard onClick={() => showInfoModal(movie.id)} key={movie.id}>
                    <MoviePoster src={`${poster_path}${movie.backdrop_path}`} alt={movie.title} />
                    <p className="m-overview">{movie.title}</p>
                </MovieCard>
            )} />
            <HorizontalList title={"Séries populares"} dataSource={popularTvShows} renderItem={movie => (
                <MovieCard onClick={() => showInfoModal(movie.id, 'tv')} key={movie.id}>
                    <MoviePoster src={`${poster_path}${movie.backdrop_path}`} alt={movie.title} />
                    <p className="m-overview">{movie.name}</p>
                </MovieCard>
            )} />

            <Modal open={movieModal.isOpen} width={"80%"} footer={false} destroyOnClose onCancel={() => setMovieModal({ isOpen: false })}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {
                        {
                            trailer: <ReactPlayer width={"95%"} height="60vh" playing={movieModal.isOpen && movieModal.movieId} url={`https://www.youtube.com/watch?v=${movieModal.movieId}`} />,
                            info: <Card style={{ width: '95%', textAlign: 'center' }} title={movieModal.info?.title  || movieModal.info?.name}>

                            </Card>
                        }[movieModal.type]
                    }
                </div>
            </Modal>
        </div>
    );
}
export default Home;