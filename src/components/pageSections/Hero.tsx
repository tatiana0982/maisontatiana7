import React, { useEffect, useRef, useState } from 'react';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'; // Make sure react-icons is installed

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  // State to hold the correct video source based on screen size
  const [videoSrc, setVideoSrc] = useState('/videos/video.mp4');

  // Effect to set the video source based on screen width
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)'); // Corresponds to Tailwind's `md` breakpoint

    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setVideoSrc('/videos/video2.mp4'); // Small screen video
      } else {
        setVideoSrc('/videos/video.mp4'); // Large screen video
      }
    };

    // Set the initial video source
    handleResize(mediaQuery);

    // Listen for changes in screen size
    mediaQuery.addEventListener('change', handleResize);

    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);


  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      // Always start muted for autoplay to work
      video.muted = true;
      video.play().catch((err) =>
        console.warn('Autoplay might be blocked:', err)
      );
    }
  }, [videoSrc]); // Rerun this effect when the video source changes

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      const newMuted = !isMuted;
      video.muted = newMuted;
      setIsMuted(newMuted);

      // Replay to ensure sound starts on unmute (if paused or blocked)
      video.play().catch((err) =>
        console.warn('Playback failed after unmute:', err)
      );
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-white">
      <video
        key={videoSrc} // Add key to force re-render when src changes
        ref={videoRef}
        src={videoSrc} // Use state for the video source
        className="w-full h-full object-cover"
        autoPlay
        loop
        playsInline
        muted
        poster="/images/bg_poster.png"
      />

      {/* Sound Toggle Button */}
      <button
        onClick={toggleMute}
        className={`
          absolute bottom-4 right-4 z-10
          p-2 rounded-full bg-black/50 text-white transition
          hover:bg-black/70
          md:p-3 md:bottom-6 md:right-6
        `}
      >
        {isMuted ? (
          <HiSpeakerXMark className="w-6 h-6 md:w-8 md:h-8" />
        ) : (
          <HiSpeakerWave className="w-6 h-6 md:w-8 md:h-8" />
        )}
      </button>
    </section>
  );
};

export default Hero;