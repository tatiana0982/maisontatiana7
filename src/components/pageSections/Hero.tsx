import React, { useEffect, useRef, useState } from 'react';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'; // Make sure react-icons is installed

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      // Always start muted for autoplay to work
      video.muted = true;
      video.play().catch((err) =>
        console.warn('Autoplay might be blocked:', err)
      );
    }
  }, []);

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
        ref={videoRef}
        src="/videos/video.mp4"
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
