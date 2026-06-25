import React from 'react';
import { Droplets, CloudSun, Sparkles } from 'lucide-react';

interface ForecastDay {
  date: string;
  temperature: number;
  description: string;
  icon: string;
  main: string;
}

interface CarWashAdvisorProps {
  forecastData: ForecastDay[];
  isCompact?: boolean;
}

export default function CarWashAdvisor({ forecastData, isCompact = false }: CarWashAdvisorProps) {
  if (!forecastData || forecastData.length === 0) return null;

  const analyzeWashConditions = (forecasts: ForecastDay[]) => {
    // Slice into immediate (next 48h) and future (days 3-5)
    const next48Hours = forecasts.slice(0, 2);
    const futureDays = forecasts.slice(2, 5);

    const rainConditions = ['Rain', 'Thunderstorm', 'Drizzle', 'Snow'];
    
    const hasImmediateRain = next48Hours.some(day => rainConditions.includes(day.main));
    const hasImmediateClouds = next48Hours.some(day => day.main === 'Clouds');
    const hasFutureRain = futureDays.some(day => rainConditions.includes(day.main));

    if (hasImmediateRain) {
      return { 
        level: 'Do Not Wash', 
        desc: 'Rain expected within 48 hours. Save your money and wait it out!',
        color: 'text-destructive',
        bg: 'bg-destructive/10',
        Icon: Droplets
      };
    }

    if (hasImmediateClouds || hasFutureRain) {
      return { 
        level: 'Risky (Overcast/Mild)', 
        desc: 'Unsettled weather ahead. Wash at your own risk.',
        color: 'text-yellow-500',
        bg: 'bg-yellow-500/10',
        Icon: CloudSun
      };
    }

    return { 
      level: 'Perfect to Wash!', 
      desc: 'Safe window detected! Clear skies ahead for the next few days.',
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      Icon: Sparkles
    };
  };

  const advice = analyzeWashConditions(forecastData);
  const { Icon } = advice;

  if (isCompact) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-[1.5rem] border border-white/10 p-5 flex flex-col justify-center h-full w-full">
        <span className="text-sm font-medium text-muted-foreground mb-1">Car Wash:</span>
        <span className="text-2xl font-semibold text-foreground truncate" title={advice.level}>{advice.level}</span>
      </div>
    );
  }

  return (
    <div className="bg-secondary/80 backdrop-blur-lg text-card-foreground border border-border rounded-xl p-5 flex flex-col gap-3 transition-colors w-full shadow-[0_4px_12px_0_rgba(0,0,0,0.05)] mt-4">
      <div className="flex justify-between items-center">
        <h3 className="m-0 text-lg font-bold text-foreground tracking-wide">Wash Advisor</h3>
        <div className={`p-2 rounded-2xl ${advice.bg} border border-border/50`}>
          <Icon className={`w-5 h-5 ${advice.color}`} />
        </div>
      </div>
      
      <div className="flex flex-col gap-1 mt-1">
        <h4 className={`m-0 text-xl font-extrabold ${advice.color} tracking-tight`}>
          {advice.level}
        </h4>
        <p className="m-0 text-xs leading-relaxed text-muted-foreground mt-1 font-medium">
          {advice.desc}
        </p>
      </div>
    </div>
  );
}
