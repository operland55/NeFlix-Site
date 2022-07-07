const API_KEY = "bb50b072ab393b23b85d0c258de3c425";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
	id: number;
	backdrop_path: string;
	poster_path: string;
	title: string;
	overview: string;
	name: string;
	genre_ids: number[];
	release_date: string;
}

export interface IGetType {
	dates: { maximum: string; minimum: string };
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}

export function getMovies() {
	return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}
