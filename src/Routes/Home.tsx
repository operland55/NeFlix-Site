import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { getMovies, getPopularMovie, getRankMovie, IGetType } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { Logo } from "../Components/Header";
import { IoArrowForward } from "react-icons/io5";
const Wrapper = styled.div`
	background: black;
	padding-bottom: 200px;
`;

const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
		url(${(props) => props.bgPhoto});
	background-size: cover;
`;

const Title = styled.h2`
	font-size: 50px;
	margin-bottom: 20px;
`;

const Overview = styled.p`
	font-size: 18px;
	width: 50%;
`;

const Slider = styled.div`
	position: relative;
	top: -100px;
`;

const PopularSlider = styled.div`
	position: relative;
	margin-top: 200px;
`;

const RankSlider = styled.div`
	position: relative;
	margin-top: 500px;
`;
const Row = styled(motion.div)`
	display: grid;
	gap: 5px;
	grid-template-columns: repeat(6, 1fr);
	position: absolute;
	width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
	background-color: white;
	background-image: url(${(props) => props.bgPhoto});
	background-size: cover;
	background-position: center center;
	height: 200px;
	font-size: 66px;
	&:first-child {
		transform-origin: center left;
	}
	&:last-child {
		transform-origin: center right;
	}
`;

const Info = styled(motion.div)`
	padding: 10px;
	background-color: ${(props) => props.theme.black.lighter};
	opacity: 0;
	position: absolute;
	width: 100%;
	bottom: 0;
	h4 {
		text-align: center;
		font-size: 18px;
	}
`;
const ArrowBtn = styled.div`
	width: 50px;
	height: 200px;
	background-color: rgba(0, 0, 0, 0.4);
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	right: 0;
`;

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
`;
const BigMovie = styled(motion.div)`
	position: absolute;
	width: 40vw;
	height: 80vh;
	left: 0;
	right: 0;
	margin: 0 auto;
`;

const rowVariants = {
	hidden: {
		x: window.outerWidth + 5,
	},
	visible: {
		x: 0,
	},
	exit: {
		x: -window.outerWidth + 5,
	},
};

const boxVariants = {
	normal: {
		scale: 1,
	},
	hover: {
		scale: 1.3,
		y: -80,
		transition: {
			delay: 0.5,
			duaration: 0.1,
			type: "tween",
		},
	},
};

const infoVariants = {
	hover: {
		opacity: 1,
		transition: {
			delay: 0.5,
			duaration: 0.1,
			type: "tween",
		},
	},
};

const offset = 6;

function Home() {
	const { data: movie, isLoading: movieLoading } = useQuery<IGetType>(
		["movies", "nowPlaying"],
		getMovies
	);
	const { data: popularMovie, isLoading: popularLoading } = useQuery<IGetType>(
		["popularMovies", "popular"],
		getPopularMovie
	);
	const { data: RankMovie, isLoading: RankLoading } = useQuery<IGetType>(
		["getRankMovie", "Rank"],
		getRankMovie
	);

	const [leaving, setLeaving] = useState(false);
	const [movieIndex, setMovieIndex] = useState(0);
	const [rankIndex, setRankIndex] = useState(0);
	const [popularIndex, setPopularIndex] = useState(0);
	const navigate = useNavigate();
	const { scrollY } = useViewportScroll();
	const HomeMatch = useMatch(`/Home/:id`);

	const incraseIndex = () => {
		if (movie) {
			if (leaving) return;
			toggleLeaving();
			const totalMovies = movie.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setMovieIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};

	const increasePopular = () => {
		if (popularMovie) {
			if (leaving) return;
			toggleLeaving();
			const totalMovies = popularMovie.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setPopularIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};

	const incraseRank = () => {
		if (RankMovie) {
			if (leaving) return;
			toggleLeaving();
			const totalMovies = RankMovie.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setRankIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};

	const toggleLeaving = () => setLeaving((prev) => !prev);
	const onBoxClicked = (moviId: number) => {
		navigate(`/Home/${moviId}`);
	};
	const backHome = () => {
		navigate(-1);
	};
	return (
		<Wrapper>
			{movieLoading ? (
				<Logo
					xmlns="http://www.w3.org/2000/svg"
					width="1024"
					height="276.742"
					viewBox="0 0 1024 276.742"
				>
					<motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
				</Logo>
			) : (
				<>
					<Banner
						bgPhoto={makeImagePath(movie?.results[0].backdrop_path || "")}
					>
						<Title>{movie?.results[0].title}</Title>
						<Overview>{movie?.results[0].overview}</Overview>
					</Banner>
					<Slider>
						<AnimatePresence initial={false} onExitComplete={toggleLeaving}>
							<Row
								variants={rowVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								transition={{ type: "tween", duration: 1 }}
								key={movieIndex}
							>
								{movie?.results
									.slice(1)
									.slice(offset * movieIndex, offset * movieIndex + offset)
									.map((movie) => (
										<Box
											layoutId={movie.id + ""}
											key={movie.id}
											whileHover="hover"
											initial="normal"
											onClick={() => onBoxClicked(movie.id)}
											variants={boxVariants}
											transition={{ type: "tween" }}
											bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
										>
											<Info variants={infoVariants}>
												<h4>{movie.title}</h4>
											</Info>
										</Box>
									))}
							</Row>
						</AnimatePresence>
						<ArrowBtn onClick={incraseIndex}>
							<IoArrowForward style={{ fontSize: 30 }} />
						</ArrowBtn>
					</Slider>

					<PopularSlider>
						<AnimatePresence onExitComplete={toggleLeaving}>
							<Row
								variants={rowVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								transition={{ type: "tween", duration: 1 }}
								key={popularIndex}
							>
								{popularMovie?.results
									.slice(1)
									.slice(offset * popularIndex, offset * popularIndex + offset)
									.map((movie) => {
										return (
											<Box
												layoutId={movie.id + ""}
												variants={boxVariants}
												whileHover="hover"
												bgPhoto={makeImagePath(movie.backdrop_path)}
												key={movie.id}
												transition={{ type: "tween" }}
												initial="normal"
												onClick={() => onBoxClicked(movie.id)}
											>
												<Info variants={infoVariants}>
													<h4>{movie.title}</h4>
												</Info>
											</Box>
										);
									})}
							</Row>
						</AnimatePresence>
						<ArrowBtn onClick={increasePopular}>
							<IoArrowForward style={{ fontSize: 30 }} />
						</ArrowBtn>
					</PopularSlider>

					<RankSlider>
						<AnimatePresence onExitComplete={toggleLeaving}>
							<Row
								variants={rowVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								transition={{ type: "tween", duration: 1 }}
								key={rankIndex}
							>
								{RankMovie?.results
									.slice(1)
									.slice(offset * rankIndex, offset * rankIndex + offset)
									.map((movie) => {
										return (
											<Box
												layoutId={movie.id + ""}
												variants={boxVariants}
												whileHover="hover"
												bgPhoto={makeImagePath(movie.backdrop_path)}
												key={movie.id}
												transition={{ type: "tween" }}
												initial="normal"
												onClick={() => onBoxClicked(movie.id)}
											>
												<Info variants={infoVariants}>
													<h4>{movie.title}</h4>
												</Info>
											</Box>
										);
									})}
							</Row>
						</AnimatePresence>
						<ArrowBtn onClick={incraseRank}>
							<IoArrowForward style={{ fontSize: 30 }} />
						</ArrowBtn>
					</RankSlider>

					<AnimatePresence>
						{HomeMatch ? (
							<>
								<Overlay
									onClick={backHome}
									exit={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								/>
								<BigMovie
									style={{ top: scrollY.get() + 100 }}
									layoutId={HomeMatch.params.id}
								>
									hello
								</BigMovie>
							</>
						) : null}
					</AnimatePresence>
				</>
			)}
		</Wrapper>
	);
}
export default Home;
