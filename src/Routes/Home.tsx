import React, { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetType } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
	background-color: black;
`;
const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Banner = styled.div<{ bgPhoto: string }>`
	height: 100vh;
	background-color: red;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-left: 60px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
		url(${(props) => props.bgPhoto});
	background-size: cover;
`;
const Title = styled.h2`
	font-size: 68px;
	margin-bottom: 10px;
`;
const OverView = styled.p`
	font-size: 30px;
	width: 50%;
`;
function Home() {
	const { data, isLoading } = useQuery<IGetType>(
		["movies", "nowPlaying"],
		getMovies
	);
	useEffect(() => {
		console.log(data);
	}, []);
	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loding...</Loader>
			) : (
				<>
					<Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
						<Title>{data?.results[0].title}</Title>
						<OverView>{data?.results[0].overview}</OverView>
					</Banner>
				</>
			)}
		</Wrapper>
	);
}

export default Home;
