import React, { useState, useRef, useEffect } from "react";
import Controls from "./Controls";
import ProgressCircle from "./ProgressCircle";
import WaveAnimation from "./WaveAnimation";

export default function AudioPlayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  total,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const audioSrc = total[currentIndex]?.preview_url;

  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;
  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  const handlePlay = async () => {
    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setIsPlaying(true);
        startTimer();
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error playing/pausing audio:', error);
    }
  };

  const handleNext = () => {
    audioRef.current.pause();

    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 1 < 0) setCurrentIndex(total.length - 1);
    else setCurrentIndex(currentIndex - 1);
  };

  useEffect(() => {
    document.querySelector(".play-pause-btn").addEventListener('click', handlePlay);

    audioRef.current.addEventListener('ended', handleNext);

    return () => {
      if(document.querySelector(".play-pause-btn"))
        document.querySelector(".play-pause-btn").removeEventListener('click', handlePlay);
      audioRef.current.removeEventListener('ended', handleNext);
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    };
  }, [currentIndex, audioSrc]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);

    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      // audioRef.current.play();
      setIsPlaying(false);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [currentIndex, audioSrc]);

  return (
    <div className="player-body flex">
      <div className="player-left-body">
        <ProgressCircle
          percentage={currentPercentage}
          isPlaying={isPlaying}
          image={currentTrack?.album?.images[0]?.url}
          size={250}
          color="#C96850"
        />
      </div>
      <div className="player-right-body flex">
        <p className="song-title ">{currentTrack?currentTrack.name.split("(")[0]:"Select a song"}</p>
        <p className="song-artist">
          {currentTrack?.album?.artists.map((artist) => artist.name).join(" | ")}
        </p>
        <div className="player-right-bottom">
          <div className="song-duration flex">
            <p className="duration">
              0:{Math.round(trackProgress).toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
            </p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration">0:30</p>
          </div>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}
