import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  playTrack,
  pauseTrack,
  updateProgress,
  updateVolume,
} from "@/redux/features/MusicPlayer/trackPlayerSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

const TrackPlayer = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(null); // Reference to audio element
  const { isPlaying, currentTrack, progress, volume } = useSelector(
    (state) => state.trackPlayer
  );

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = volume / 100;

      if (isPlaying) {
        audio.play().catch((error) => console.error("Playback error:", error));
      } else {
        audio.pause();
      }
    }

    // Cleanup function to pause audio on component unmount
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [isPlaying, volume, currentTrack]);

  const handleCanPlay = () => {
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((error) => console.error("Playback error:", error));
    }
  };

  // Update progress when the audio time updates
  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    dispatch(updateProgress(currentTime));
  };

  // Play/Pause toggle
  const handlePlayPause = () => {
    if (isPlaying) {
      dispatch(pauseTrack());
    } else {
      dispatch(playTrack());
    }
  };

  // Format time (mm:ss) for progress display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <section className="absolute z-50 bottom-0 left-0 w-full px-6 py-4 bg-gradient-to-r from-[#000000d6] via-[#000000bf] to-[#111827c7]">
      <audio
        ref={audioRef}
        onCanPlay={handleCanPlay}
        src={currentTrack?.src} // Track source URL
        onTimeUpdate={handleTimeUpdate} // Track progress update
        onError={(e) => console.error("Audio Error:", e)} // Catch audio errors
      ></audio>

      <div className="flex justify-between items-center">
        {/* Song Info */}
        <div className="flex items-center gap-4">
          <img
            src={currentTrack?.albumArt || "/path-to-default-album-art.jpg"}
            alt="Album Art"
            className="w-16 h-16 rounded-md"
          />
          <div className="track-info flex flex-col">
            <p className="text-white font-bold">{currentTrack?.title}</p>
            <p className="text-gray-300 text-sm">
              {currentTrack?.artist.length > 30
                ? `${currentTrack?.artist.slice(0, 30)}...`
                : currentTrack?.artist}
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center">
          <div className="flex gap-6 items-center">
            <FontAwesomeIcon
              className="cursor-pointer text-white"
              icon={faBackward}
              // Add previous track logic if needed
            />
            <FontAwesomeIcon
              className="cursor-pointer text-white text-3xl"
              icon={isPlaying ? faPause : faPlay}
              onClick={handlePlayPause}
            />
            <FontAwesomeIcon
              className="cursor-pointer text-white"
              icon={faForward}
              // Add next track logic if needed
            />
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2 text-xs text-white mt-2">
            <span>{formatTime(progress)}</span>
            <input
              type="range"
              className="w-64 h-1 bg-gray-400 rounded-lg appearance-none cursor-pointer"
              min="0"
              max={audioRef.current?.duration || 100}
              value={progress}
              onChange={(e) =>
                (audioRef.current.currentTime = Number(e.target.value))
              }
            />
            <span>
              {audioRef.current?.duration
                ? formatTime(audioRef.current.duration)
                : "0:00"}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-4 z-20">
          <FontAwesomeIcon className="text-white" icon={faVolumeUp} />
          <input
            type="range"
            className="w-20 h-1 bg-gray-400 rounded-lg appearance-none cursor-pointer"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => dispatch(updateVolume(Number(e.target.value)))}
          />
        </div>
      </div>
    </section>
  );
};

export default TrackPlayer;
