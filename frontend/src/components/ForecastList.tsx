import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudDrizzle, 
  CloudLightning, 
  Snowflake, 
  Wind,
  Droplets,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface ForecastDay {
  date: string;
  temperature: number;
  feels_like?: number;
  temp_min?: number;
  temp_max?: number;
  humidity?: number;
  wind_speed?: number;
  description: string;
  icon: string;
  main: string;
}

interface ForecastListProps {
  forecastData: ForecastDay[];
}

export default function ForecastList({ forecastData }: ForecastListProps) {
    if (!forecastData || forecastData.length === 0) {
        return null;
    }

    const getWeatherIcon = (mainStr: string = '') => {
        const condition = mainStr.toLowerCase();
        if (condition.includes('clear')) {
          return <Sun className="w-8 h-8 text-primary filter drop-shadow-md" />;
        }
        if (condition.includes('cloud')) {
          return <Cloud className="w-8 h-8 text-primary filter drop-shadow-md" />;
        }
        if (condition.includes('rain')) {
          return <CloudRain className="w-8 h-8 text-primary filter drop-shadow-md" />;
        }
        if (condition.includes('drizzle')) {
          return <CloudDrizzle className="w-8 h-8 text-primary filter drop-shadow-md" />;
        }
        if (condition.includes('thunderstorm')) {
          return <CloudLightning className="w-8 h-8 text-primary filter drop-shadow-md" />;
        }
        if (condition.includes('snow')) {
          return <Snowflake className="w-8 h-8 text-primary filter drop-shadow-md" />;
        }
        return <Wind className="w-8 h-8 text-primary filter drop-shadow-md" />;
    };

    return (
        <div className="w-full h-full flex flex-row items-center justify-between pt-6 border-t border-border/30">
            {forecastData.slice(0, 6).map((day, index) => {
                const d = new Date(day.date);
                const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
                const isLast = index === Math.min(forecastData.length, 6) - 1;
                
                return (
                    <div 
                        key={index} 
                        className={`flex flex-col items-center flex-1 ${!isLast ? 'border-r border-border/20' : ''}`}
                    >
                        <div className="flex items-center gap-1 mb-3">
                            <span className="font-medium text-foreground text-sm">{dayName}</span>
                            <span className="text-muted-foreground/60 text-xs">|</span>
                            <span className="font-semibold text-foreground text-sm">{Math.round(day.temperature)}°C</span>
                        </div>
                        
                        <div className="mb-3 transition-transform duration-500 hover:scale-110">
                            {getWeatherIcon(day.main)}
                        </div>

                        <span className="text-xs text-muted-foreground capitalize text-center font-medium tracking-wide">
                            {day.main}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
