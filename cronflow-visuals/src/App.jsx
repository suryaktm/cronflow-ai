import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Scene1_TheProblem from './components/scenes/Scene1_TheProblem';
import Scene2_Intro from './components/scenes/Scene2_Intro';
import Scene3_Secure from './components/scenes/Scene3_Secure';
import Scene4_Scheduling from './components/scenes/Scene4_Scheduling';
import Scene5_AIAssist from './components/scenes/Scene5_AIAssist';
import Scene6_Observability from './components/scenes/Scene6_Observability';
import Scene7_Closing from './components/scenes/Scene7_Closing';


const SCENE_DURATION = {
  1: 5000,
  2: 6000,
  3: 7000,
  4: 7000,
  5: 7000,
  6: 6000,
  7: 5000
};

const TOTAL_SCENES = 7; // Update this as we add scenes

function App() {
  const [currentScene, setCurrentScene] = useState(1);

  useEffect(() => {
    if (currentScene > TOTAL_SCENES) return;

    const timer = setTimeout(() => {
      // Loop for development, or stop at end
      setCurrentScene(prev => prev === TOTAL_SCENES ? 1 : prev + 1);
    }, SCENE_DURATION[currentScene]);

    return () => clearTimeout(timer);
  }, [currentScene]);

  // For debugging, allow manual sequence control
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') setCurrentScene(s => Math.min(s + 1, TOTAL_SCENES));
      if (e.key === 'ArrowLeft') setCurrentScene(s => Math.max(s - 1, 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* 16:9 Container */}
      <div className="relative w-full max-w-[1280px] aspect-video bg-background overflow-hidden shadow-2xl border border-white/5">
        <AnimatePresence mode="wait">
          {currentScene === 1 && (
            <Scene1_TheProblem key="scene1" />
          )}
          {currentScene === 2 && (
            <Scene2_Intro key="scene2" />
          )}
          {currentScene === 3 && (
            <Scene3_Secure key="scene3" />
          )}
          {currentScene === 4 && (
            <Scene4_Scheduling key="scene4" />
          )}
          {currentScene === 5 && (
            <Scene5_AIAssist key="scene5" />
          )}
          {currentScene === 6 && (
            <Scene6_Observability key="scene6" />
          )}
          {currentScene === 7 && (
            <Scene7_Closing key="scene7" />
          )}
        </AnimatePresence>

        {/* Progress Bar / Debug Info */}
        <div className="absolute bottom-4 left-4 text-xs text-white/30 font-mono z-50">
          Scene: {currentScene} / {TOTAL_SCENES}
        </div>
      </div>
    </div>
  );
}

export default App;
