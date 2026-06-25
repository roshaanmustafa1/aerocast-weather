import React, { useMemo } from 'react';
import { Sun, Cloud } from 'lucide-react';

interface WeatherEffectsProps {
  condition: string;
}

export default function WeatherEffects({ condition }: WeatherEffectsProps) {
  const mainCondition = condition.toLowerCase();

  // useMemo ensures we don't recalculate random positions on every re-render (which would cause jittering)
  const effects = useMemo(() => {
    if (mainCondition.includes('clear') || mainCondition.includes('sun')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
           {/* Beautiful background glow */}
           <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-yellow-400/10 rounded-full blur-[60px] animate-pulse mix-blend-screen" />
           <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-orange-400/5 rounded-full blur-[70px] animate-pulse mix-blend-screen" style={{ animationDelay: '2s' }} />
           
           {/* Floating Sun Icons */}
           {Array.from({ length: 4 }).map((_, i) => (
             <Sun 
               key={i} 
               className="absolute text-yellow-400 opacity-10 animate-float" 
               style={{
                 width: Math.random() * 40 + 40 + 'px',
                 height: Math.random() * 40 + 40 + 'px',
                 left: Math.random() * 80 + 10 + '%',
                 top: Math.random() * 80 + 10 + '%',
                 animationDuration: Math.random() * 6 + 4 + 's',
                 animationDelay: Math.random() * 2 + 's'
               }} 
             />
           ))}
        </div>
      );
    }
    if (mainCondition.includes('rain') || mainCondition.includes('drizzle')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
           {Array.from({ length: 30 }).map((_, i) => (
             <div key={i} className="absolute bg-blue-300/40 animate-rain" style={{
               width: '2px',
               height: Math.random() * 15 + 10 + 'px',
               left: Math.random() * 100 + '%',
               top: '-20px',
               animationDuration: Math.random() * 0.5 + 0.5 + 's',
               animationDelay: Math.random() * 2 + 's'
             }} />
           ))}
        </div>
      );
    }
    if (mainCondition.includes('snow')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
           {Array.from({ length: 25 }).map((_, i) => (
             <div key={i} className="absolute bg-white/70 rounded-full animate-snow" style={{
               width: Math.random() * 4 + 3 + 'px',
               height: Math.random() * 4 + 3 + 'px',
               left: Math.random() * 100 + '%',
               top: '-10px',
               animationDuration: Math.random() * 3 + 2 + 's',
               animationDelay: Math.random() * 2 + 's'
             }} />
           ))}
        </div>
      );
    }
    if (mainCondition.includes('cloud')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
           {/* Soft background glow */}
           <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-white/5 rounded-full blur-[70px] animate-pulse mix-blend-screen" />
           <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-slate-300/5 rounded-full blur-[80px] animate-pulse mix-blend-screen" style={{ animationDelay: '3s' }} />
           
           {/* Floating Cloud Icons */}
           {Array.from({ length: 4 }).map((_, i) => (
             <Cloud 
               key={i} 
               className="absolute text-white opacity-10 animate-float" 
               style={{
                 width: Math.random() * 50 + 50 + 'px',
                 height: Math.random() * 50 + 50 + 'px',
                 left: Math.random() * 80 + 10 + '%',
                 top: Math.random() * 80 + 10 + '%',
                 animationDuration: Math.random() * 7 + 5 + 's',
                 animationDelay: Math.random() * 3 + 's'
               }} 
             />
           ))}
        </div>
      );
    }
    
    if (['mist', 'smoke', 'haze', 'dust', 'fog', 'sand', 'ash'].some(c => mainCondition.includes(c))) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60 z-0">
           <div className="absolute inset-0 bg-gray-400/20 blur-3xl animate-pulse" />
           {Array.from({ length: 4 }).map((_, i) => (
             <div key={i} className="absolute bg-gray-300/20 rounded-full blur-3xl animate-cloud" style={{
               width: '350px',
               height: '150px',
               left: '-350px',
               top: Math.random() * 100 + '%',
               animationDuration: Math.random() * 15 + 10 + 's',
               animationDelay: Math.random() * 2 + 's'
             }} />
           ))}
        </div>
      );
    }
    if (mainCondition.includes('thunderstorm')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
           <div className="absolute inset-0 bg-white/20 animate-lightning mix-blend-overlay" />
           {Array.from({ length: 25 }).map((_, i) => (
             <div key={i} className="absolute bg-blue-400/50 animate-rain" style={{
               width: '2px',
               height: '20px',
               left: Math.random() * 100 + '%',
               top: '-20px',
               animationDuration: Math.random() * 0.4 + 0.4 + 's',
               animationDelay: Math.random() * 2 + 's'
             }} />
           ))}
        </div>
      );
    }

    // Default Wind/Atmosphere
    return (
       <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
         {Array.from({ length: 8 }).map((_, i) => (
           <div key={i} className="absolute bg-gray-200/40 blur-sm animate-wind" style={{
             width: Math.random() * 60 + 20 + 'px',
             height: '2px',
             left: '-50px',
             top: Math.random() * 100 + '%',
             animationDuration: Math.random() * 2 + 1 + 's',
             animationDelay: Math.random() * 2 + 's'
           }} />
         ))}
      </div>
    );
  }, [mainCondition]);

  return effects;
}
