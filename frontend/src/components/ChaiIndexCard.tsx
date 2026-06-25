import React from 'react';

interface ChaiIndexCardProps {
  temperature: number;
  humidity: number;
  isCompact?: boolean;
}

export default function ChaiIndexCard({ temperature, humidity, isCompact = false }: ChaiIndexCardProps) {
  const getChaiScore = (temp: number, hum: number) => {
    let score = 50;
    
    if (temp < 20) {
      score += (20 - temp) * 2;
    } else if (temp > 25) {
      score -= (temp - 25) * 3;
    }

    if (temp < 25) {
      score += (hum - 50) * 0.4;
    } else {
      score -= (hum - 50) * 0.5;
    }

    return Math.round(Math.max(0, Math.min(100, score)));
  };

  const score = getChaiScore(temperature, humidity);

  const getStatus = (score: number) => {
    if (score >= 85) return { label: 'Perfect Chai Weather!', desc: 'Grab a blanket and a steaming cup of chai.' };
    if (score >= 60) return { label: 'Great for Coffee/Chai', desc: 'A pleasant chill makes it an ideal time.' };
    if (score >= 35) return { label: 'Iced Coffee Weather', desc: 'A bit warm for hot chai, maybe go for an iced coffee.' };
    return { label: 'Too Hot for Hot Drinks', desc: "It's boiling out there. Stick to cold water and AC!" };
  };

  const status = getStatus(score);

  if (isCompact) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-[1.5rem] border border-white/10 p-5 flex flex-col justify-center h-full w-full">
        <span className="text-sm font-medium text-muted-foreground mb-1">Coffee & Drinks:</span>
        <span className="text-2xl font-semibold text-foreground truncate" title={status.label}>{status.label}</span>
      </div>
    );
  }

  return (
    <div className="bg-secondary/80 backdrop-blur-lg text-card-foreground border border-border rounded-xl p-5 flex flex-col gap-3 transition-colors w-full shadow-[0_4px_12px_0_rgba(0,0,0,0.05)] mt-4">
      <div className="flex justify-between items-center">
        <h3 className="m-0 text-lg font-bold text-foreground tracking-wide">Coffee & Drink Advice</h3>
        <span className="text-2xl font-extrabold text-primary drop-shadow-sm">
          {score}<small className="text-sm font-semibold text-muted-foreground">/100</small>
        </span>
      </div>
      
      <div className="flex flex-col gap-1">
        <h4 className="m-0 text-base font-semibold text-foreground">
          {status.label}
        </h4>
        <p className="m-0 text-xs leading-relaxed text-muted-foreground">
          {status.desc}
        </p>
      </div>

      <div className="h-2 bg-background rounded-full overflow-hidden mt-1 border border-border/50">
        <div 
          className="h-full bg-primary rounded-full transition-[width] duration-1000 ease-out"
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
}
