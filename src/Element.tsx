import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled.div`
	background-color: black;
`;

export const Logo = styled(motion.svg)`
	width: 195px;
	height: 325px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	fill: ${(props) => props.theme.red};
	path {
		stroke-width: 6px;
		stroke: white;
	}
`;
export const Banner = styled.div<{ bgPhoto: string }>`
	height: 100vh;
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding: 60px;
	background-image: url(${(props) => props.bgPhoto});
	background-size: cover;
`;

export const Title = styled.h2`
	font-size: 48px;
	margin-bottom: 20px;
`;
export const Overview = styled.p`
	font-size: 26px;
	width: 50%;
`;
export const TitleType = styled.div`
	position: absolute;
	top: -50px;
	left: 28px;
	h1 {
		font-size: 35px;
		color: ${(props) => props.theme.white.lighter};
		font-weight: 700;
	}
`;
export const Slider = styled(motion.div)`
	position: relative;
	width: 100%;
	&:first-child {
		top: -100px;
	}
	&:last-child {
		margin-top: 100px;
	}
`;


export const Row = styled(motion.div)`
	display: grid;
	gap: 5px;
	grid-template-columns: repeat(6, 1fr);
	position: absolute;
	width: 100%;
`;

export const Box = styled(motion.div)<{ bgPhoto?: string }>`
	height: 200px;
	background-image: url(${(props) => props.bgPhoto});
	background-size: cover;
	font-size: 66px;
	background-position: center center;
	cursor: pointer;
	@media screen and (max-width: 500px) {
	}

	&:first-child {
		margin-left: 30px;
		transform-origin: center left;
	}
	&:last-child {
		transform-origin: center right;
	}
`;
export const RankBox = styled(motion.div)<{ bgPhoto: string }>`
	/* position:  */
	background-color: transparent;
	height: 200px;
	background-image: url(${(props) => props.bgPhoto});
	background-size: contain;
	font-size: 66px;
	background-position: right;
	background-repeat: no-repeat;
	cursor: pointer;
	&:hover {
		background-position: center center;
		background-size: contain;
		h1 {
			opacity: 0;
		}
	}
	&:first-child {
		margin-left: 30px;
		transform-origin: center left;
	}
	&:last-child {
		transform-origin: center right;
	}
`;
export const RankNum = styled(motion.div)`
	width: 100%;
	position: relative;
	h1 {
		position: absolute;
		left: 80px;
		top: 20px;
		font-size: 100px;
		font-weight: 700;
	}
`;

export const Info = styled(motion.div)`
	opacity: 0;
	position: relative;
	width: 100%;

	h4 {
		color: ${(props) => props.theme.white.lighter};
		text-align: left;
		font-size: 18px;
		position: absolute;
		top: 90px;
	}
`;

export const IconInfo = styled(motion.div)`
	display: flex;
	gap: 10px;
	background-color: transparent;
	position: relative;
	width: 100%;
	height: 100%;
	svg {
		margin-right: 5px;
		background-color: #fff;
		border-radius: 50%;
	}
`;
export const IconList = styled(motion.div)`
	padding: 10px;
	width: 100%;
	position: absolute;
	bottom: 0;
	display: flex;
	align-items: flex-end;
	background-color: #181818;
	padding: 13px;
`;

export const Overlay = styled(motion.div)`
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
	position: fixed;
`;

export const BigMovie = styled(motion.div)`
	position: absolute;
	width: 40vw;
	height: 80vh;
	left: 0;
	right: 0;
	margin: 0 auto;
	background-color: ${(props) => props.theme.black.lighter};
	border-radius: 15px;
	overflow-y: auto;
`;
export const BigTv = styled(motion.div)`
	position: absolute;
	width: 40vw;
	height: 80vh;
	left: 0;
	right: 0;
	margin: 0 auto;
	background-color: ${(props) => props.theme.black.lighter};
	border-radius: 15px;
	overflow: auto;
`;
export const BigCover = styled.img`
	background-size: cover;
	background-position: center, center;
	width: 100%;
	height: 400px;
`;
export const BigTitle = styled.h3`
	color: ${(props) => props.theme.white.lighter};
`;

export const rowVariants = {
	hidden: {
		x: window.outerWidth + 10,
	},
	visible: {
		x: 0,
	},
	exit: {
		x: -window.outerWidth - 10,
	},
};
export const boxVariants = {
	normal: {
		scale: 1,
	},

	hover: {
		opacity: 1,
		scale: 1.3,
		y: -80,
		transition: {
			delay: 0.5,
			duration: 0.5,
			type: "tween",
		},
	},
};
export const infoVariants = {
	hover: {
		opacity: 1,
		transition: {
			delay: 0.5,
			duration: 0.5,
			type: "tween",
		},
	},
};
