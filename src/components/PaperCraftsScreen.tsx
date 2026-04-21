import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ChevronRight, CheckCircle, Star, Lock } from 'lucide-react';
import { Progress } from './ui/progress';
import { SkillCoin } from './CurrencyIcons';

// IMPORTANT: Import the video directly so the IPA knows where it is
// If your file is in /public, use this path:
import headerVideo from '/paper-crafts-header.mp4?url'; 

function ytEmbedUrl(id: string) {
  return `https://www.youtube.com/embed/${id}?playsinline=1&rel=0&modestbranding=1&enablejsapi=1`;
}

// ... [Keep all your interface and COURSES definitions exactly the same] ...

export function PaperCraftsScreen({ onBack }: { onBack: () => void }) {
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force play for Sideloaded IPA logic
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute('muted', '');
      
      const attemptPlay = () => {
        video.play().catch(() => {
          // If auto-play fails, iPad requires a touch
          const playOnTouch = () => {
            video.play();
            window.removeEventListener('touchstart', playOnTouch);
          };
          window.addEventListener('touchstart', playOnTouch);
        });
      };

      video.addEventListener('loadedmetadata', attemptPlay);
      attemptPlay();
    }
  }, []);

  if (selectedCourse) {
    // Return your CourseStepsView here (keep your existing logic)
    return <div />; 
  }

  return (
    <div className="h-full bg-background overflow-y-auto pb-6">
      {/* HEADER SECTION */}
      <div className="relative h-56 bg-gradient-to-br from-amber-200 to-orange-300 overflow-hidden">
        <video
          ref={videoRef}
          key="ipa-fixed-video"
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 1 }}
        >
          {/* We use the variable 'headerVideo' here instead of a string path */}
          <source src={headerVideo} type="video/mp4" />
        </video>
        
        <button
          onClick={onBack}
          className="absolute top-12 left-4 z-20 bg-black/40 text-white rounded-full p-2 backdrop-blur-sm active:opacity-70"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-end pb-6 px-6 pointer-events-none z-10">
          <div className="text-center">
            <p className="text-4xl mb-2">📜✂️</p>
            <h2 className="text-white font-bold text-2xl drop-shadow-lg text-white">Paper Crafts</h2>
            <p className="text-white/90 text-sm">Learn origami step-by-step</p>
          </div>
        </div>
      </div>

      {/* ... [Keep the rest of your renderSection and list logic below] ... */}
    </div>
  );
}
