import Carousel, { CarouselItem } from "components/Carousel";
import NavBar from "components/NavBar";
import { useQuery } from "@tanstack/react-query";
import tmdbApi from "services/tmdbApi";
import { Button, Flex, Rate, Spin } from "antd";
const Home = () => {
    const getPopularMovies = async () => {
        const { data: { results: data } } = await tmdbApi.get('/movie/popular');
        console.log(data)
        return data
    }
    const { data: popularMovies, isFetching } = useQuery({ queryKey: ['popularMovies'], queryFn: getPopularMovies, refetchOnWindowFocus: false, initialData: [] });
    if (isFetching) {
        return <Spin fullscreen />
    }
    return (
        <div style={{ position: 'relative' }}>
            <NavBar />
            <Carousel>
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
                                    <Button shappe='round' size='large' ghost>Assistir</Button>
                                    <Button shappe='round' size='large' ghost>Mais informações</Button>
                                </div>
                            </div>
                        </CarouselItem>
                    )

                }
            </Carousel>
            <div style={{ maxWidth: "100%", paddingInline: 10 }}>
                <h1> Filmes populares</h1>
                <Flex justify="center" style={{ width: '100%', paddingInline: 40 }} wrap="wrap" gap="large">
                    {
                        popularMovies.map(movie => <div style={{ maxWidth: "28%", maxHeight: 1000, overflow: 'hidden' }}>
                            <img width={"100%"} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" />
                        </div>)
                    }
                </Flex>
            </div>
        </div>
    );
}
export default Home;