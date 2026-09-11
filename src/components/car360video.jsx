import React, { useEffect, useRef, useState } from "react";

const Car360Video = ({ image, video, alt = "Car" }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const videoRef = useRef(null);

	useEffect(() => {
		if (!isPlaying || !videoRef.current) return undefined;
		const player = videoRef.current;
		player.currentTime = 0;
		player.play().catch(() => setIsPlaying(false));
		return undefined;
	}, [isPlaying]);

	const startVideo = () => {
		if (!isPlaying) setIsPlaying(true);
	};

	const stopVideo = () => {
		setIsPlaying(false);
		if (videoRef.current) videoRef.current.currentTime = 0;
	};

	return (
		<button
			className="car-360-video"
			type="button"
			onMouseEnter={startVideo}
			onMouseLeave={stopVideo}
			aria-label={`${alt}. Move the mouse over the car to rotate it.`}
			aria-busy={isPlaying}
		>
			{isPlaying ? (
				<video
					ref={videoRef}
					src={video}
					className="car-360-video-player"
					muted
					playsInline
					loop
					autoPlay
					onError={() => setIsPlaying(false)}
					aria-label={`${alt} 360-degree rotation`}
				/>
			) : (
				<img className="hero-car" src={image} alt={alt} />
			)}
		</button>
	);
};

export default Car360Video;
