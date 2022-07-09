import { useState, useEffect } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

function Home() {

    // currentArray를 받아오는 함수
    //   setToDos(currentArray => [toDo, ...currentArray])
    //   setToDo("");

    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovies = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
            )
        ).json();
        setMovies(json.data.movies);
        setLoading(false);
    };
    useEffect(() => {
        getMovies();
    }, []);
    console.log(movies);

    // map은 원하는 요소를 원하는 값으로 바꿀 수 있음
    return (

        <div className={styles.container}>
            {loading ? (
                <div className={styles.loader}>
                    <h1>Loading...</h1>
                </div>
            ) : (
                <div className={styles.movies}>
                    {movies.map((movie) => (
                        <Movie
                            key={movie.id}
                            id={movie.id}
                            year={movie.year}
                            coverImg={movie.medium_cover_image}
                            title={movie.title}
                            summary={movie.summary}
                            genres={movie.genres} />
                    ))}
                </div>
            )}
        </div>

    );
}


export default Home;