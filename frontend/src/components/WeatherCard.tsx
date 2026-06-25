import React, { useState } from 'react';
import ChaiIndexCard from './ChaiIndexCard';
import CarWashAdvisor from './CarWashAdvisor';
import WeatherEffects from './WeatherEffects';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudDrizzle, 
  CloudLightning, 
  Snowflake, 
  Wind, 
  Thermometer, 
  Droplets, 
  ArrowUp, 
  ArrowDown,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface WeatherData {
  city: string;
  temp?: number;
  temperature?: number;
  feels_like?: number;
  temp_min?: number;
  temp_max?: number;
  description: string;
  main?: string;
  icon?: string;
  humidity: number;
  wind_speed: number;
}

interface WeatherCardProps {
  weatherData: WeatherData | null;
  forecastData?: any[];
}

export default function WeatherCard({ weatherData, forecastData }: WeatherCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!weatherData) return null;

  const {
    city,
    temp,
    temperature,
    feels_like,
    temp_min,
    temp_max,
    description,
    main,
    humidity,
    wind_speed,
  } = weatherData;

  const currentTemp = temp !== undefined ? temp : (temperature !== undefined ? temperature : 0);

  const getWeatherIcon = (mainStr: string = '') => {
    const condition = mainStr.toLowerCase();
    if (condition.includes('clear')) {
      return <Sun className="w-20 h-20 text-primary animate-spin-slow filter drop-shadow-md" />;
    }
    if (condition.includes('cloud')) {
      return <Cloud className="w-20 h-20 text-primary animate-pulse filter drop-shadow-md" />;
    }
    if (condition.includes('rain')) {
      return <CloudRain className="w-20 h-20 text-primary animate-bounce filter drop-shadow-md" />;
    }
    if (condition.includes('drizzle')) {
      return <CloudDrizzle className="w-20 h-20 text-primary filter drop-shadow-md" />;
    }
    if (condition.includes('thunderstorm')) {
      return <CloudLightning className="w-20 h-20 text-primary filter drop-shadow-md" />;
    }
    if (condition.includes('snow')) {
      return <Snowflake className="w-20 h-20 text-primary animate-pulse filter drop-shadow-md" />;
    }
    return <Wind className="w-20 h-20 text-primary filter drop-shadow-md" />;
  };

  const getWeatherBg = (mainStr: string = '') => {
    const condition = mainStr.toLowerCase();
    if (condition.includes('clear')) return 'bg-weather-clear/80';
    if (condition.includes('cloud')) return 'bg-weather-cloud/80';
    if (condition.includes('rain') || condition.includes('drizzle')) return 'bg-weather-rain/80';
    if (condition.includes('thunderstorm')) return 'bg-weather-thunder/80';
    if (condition.includes('snow')) return 'bg-weather-snow/80';
    return 'bg-card/80';
  };

  return (
    <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`relative overflow-hidden w-full max-w-2xl mx-auto ${getWeatherBg(main)} backdrop-blur-3xl border border-border rounded-xl p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-[1.02] hover:shadow-primary/20 text-foreground cursor-pointer ${isExpanded ? 'pb-10' : ''}`}
    >
      <WeatherEffects condition={main || ''} />
      
      <div className="relative z-10 w-full h-full">
        {/* City & Description */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold tracking-wide text-foreground drop-shadow-sm">{city}</h2>
          <span className="inline-block mt-2 px-3 py-1 bg-accent/70 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-foreground">
            {description}
          </span>
        </div>

        {/* Main Temp & Icon */}
        <div className="flex flex-col items-center justify-center mt-8 mb-4">
          <div className="mb-4 transition-transform duration-700 hover:rotate-6">
            {getWeatherIcon(main)}
          </div>
          <div className="flex items-start">
            <h1 className="text-7xl font-extrabold tracking-tighter text-foreground filter drop-shadow-sm">
              {Math.round(currentTemp)}
            </h1>
            <span className="text-3xl font-semibold text-muted-foreground mt-1">°C</span>
          </div>
        </div>

        <div className="w-full max-w-sm mx-auto mb-6 flex flex-col gap-2">
          <ChaiIndexCard temperature={currentTemp} humidity={humidity} isCompact={!isExpanded} />
          {forecastData && (
            <CarWashAdvisor forecastData={forecastData} isCompact={!isExpanded} />
          )}
        </div>

        {/* Expand Toggle Icon */}
        <div className="flex justify-center mt-2 mb-2">
          {isExpanded ? (
              <ChevronUp className="w-6 h-6 text-muted-foreground animate-bounce" />
          ) : (
              <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
          )}
        </div>

        {/* Expandable Extra Details */}
        <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
            {feels_like !== undefined && (
              <p className="text-muted-foreground text-sm flex justify-center items-center gap-1 mb-6">
                  <Thermometer className="w-4 h-4 text-muted-foreground/75" />
                  Feels like <span className="font-semibold text-foreground">{Math.round(feels_like)}°C</span>
              </p>
            )}

            {/* Temp Min/Max Banner */}
            {(temp_min !== undefined || temp_max !== undefined) && (
              <div className="flex justify-around items-center py-4 px-4 bg-secondary/80 backdrop-blur-lg rounded-3xl mb-6 border border-border text-sm">
                {temp_min !== undefined && (
                  <div className="flex items-center gap-1.5 text-primary font-medium">
                    <ArrowDown className="w-4 h-4" />
                    <span>Min: <span className="font-bold text-foreground">{Math.round(temp_min)}°C</span></span>
                  </div>
                )}
                <div className="h-6 w-px bg-border" />
                {temp_max !== undefined && (
                  <div className="flex items-center gap-1.5 text-primary font-medium">
                    <ArrowUp className="w-4 h-4" />
                    <span>Max: <span className="font-bold text-foreground">{Math.round(temp_max)}°C</span></span>
                  </div>
                )}
              </div>
            )}

            {/* Extra Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-secondary/80 backdrop-blur-lg rounded-3xl border border-border transition-colors">
                <div className="p-2.5 bg-primary/20 rounded-xl text-primary">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Humidity</p>
                  <p className="text-lg font-bold text-foreground mt-0.5">{humidity}%</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-secondary/80 backdrop-blur-lg rounded-3xl border border-border transition-colors">
                <div className="p-2.5 bg-primary/20 rounded-xl text-primary">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Wind</p>
                  <p className="text-lg font-bold text-foreground mt-0.5">{wind_speed} m/s</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
