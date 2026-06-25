import React, { useState } from 'react';
import { getWeather, getForecast } from '../services/api';
import SearchForm from '../components/SearchForm';
import ForecastList from '../components/ForecastList';
import WeatherEffects from '../components/WeatherEffects';
import ChaiIndexCard from '../components/ChaiIndexCard';
import CarWashAdvisor from '../components/CarWashAdvisor';
import { useTheme } from '../components/theme-provider';
import { Sun, Moon, Loader2, CloudLightning, Info, Cloud, CloudRain, CloudDrizzle, Snowflake, Wind, Droplets } from 'lucide-react';

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

export default function Home() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecastInfo, setForecastInfo] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { theme, setTheme } = useTheme();

    function handleCitySearch(cityName: string) {
        setLoading(true);
        setError(null);
        setWeather(null);
        setForecastInfo(null);

        Promise.all([
            getWeather(cityName),
            getForecast(cityName)
        ])
        .then(([weatherRes, forecastRes]) => {
            if (weatherRes.success && weatherRes.data) {
                setWeather(weatherRes.data);
            } else {
                setError('Weather data not found');
            }
            if (forecastRes.success && forecastRes.data) {
                setForecastInfo(forecastRes.data);
            }
            setLoading(false);
        })
        .catch((err) => {
            setError(err.response?.data?.message || 'Something went wrong while fetching weather data');
            setLoading(false);
        });
    }

    const getWeatherIcon = (mainStr: string = '') => {
        const condition = mainStr.toLowerCase();
        if (condition.includes('clear')) {
          return <Sun className="w-16 h-16 text-primary filter drop-shadow-md" />;
        }
        if (condition.includes('cloud')) {
          return <Cloud className="w-16 h-16 text-primary filter drop-shadow-md" />;
        }
        if (condition.includes('rain')) {
          return <CloudRain className="w-16 h-16 text-primary filter drop-shadow-md" />;
        }
        if (condition.includes('drizzle')) {
          return <CloudDrizzle className="w-16 h-16 text-primary filter drop-shadow-md" />;
        }
        if (condition.includes('thunderstorm')) {
          return <CloudLightning className="w-16 h-16 text-primary filter drop-shadow-md" />;
        }
        if (condition.includes('snow')) {
          return <Snowflake className="w-16 h-16 text-primary filter drop-shadow-md" />;
        }
        return <Wind className="w-16 h-16 text-primary filter drop-shadow-md" />;
    };

    const getBgGradient = () => 'from-gradient-start via-gradient-mid to-gradient-end';

    const currentTemp = weather ? (weather.temp !== undefined ? weather.temp : (weather.temperature !== undefined ? weather.temperature : 0)) : 0;

    return (
        <div className={`min-h-screen w-full bg-gradient-to-br ${getBgGradient()} transition-all duration-1000 flex flex-col items-center justify-start p-4 md:p-12 text-foreground overflow-x-hidden`}>
            
            {/* Initial Welcome State */}
            {!weather && !loading && !error && (
                <div className="w-full max-w-4xl mt-20 flex flex-col items-center justify-center animate-fade-in text-center">
                    <div className="p-4 bg-card border border-border shadow-2xl rounded-3xl mb-8">
                        <CloudLightning className="w-16 h-16 text-primary animate-pulse" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent mb-6">
                        AeroCast
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-light text-muted-foreground mb-12">
                        Enter a city to get started.
                    </h2>
                    <div className="w-full max-w-lg bg-card/60 backdrop-blur-2xl p-2 rounded-2xl shadow-xl border border-border/50">
                        <SearchForm onSearch={handleCitySearch} />
                    </div>
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="mt-12 p-4 bg-card/50 hover:bg-accent border border-border/50 text-foreground hover:text-accent-foreground rounded-2xl shadow-lg transition-all active:scale-95 cursor-pointer backdrop-blur-md"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun className="w-6 h-6 text-primary" /> : <Moon className="w-6 h-6 text-primary" />}
                    </button>
                </div>
            )}

            {/* Loading & Error States */}
            {loading && (
                <div className="flex flex-col items-center justify-center py-20 gap-4 mt-20 animate-fade-in">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <p className="text-lg font-medium text-muted-foreground animate-pulse">Analyzing atmospheric data...</p>
                </div>
            )}

            {error && (
                <div className="w-full max-w-md mx-auto p-4 bg-destructive/10 backdrop-blur-xl border border-destructive/20 rounded-2xl flex items-start gap-3 shadow-lg mt-20 animate-shake">
                    <Info className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-semibold text-destructive">Unable to Fetch Weather</h4>
                        <p className="text-xs text-destructive/80 mt-1">{error}</p>
                    </div>
                </div>
            )}

            {/* Unified Glassmorphic Dashboard */}
            {!loading && weather && forecastInfo && (
                <div className="w-full h-screen relative overflow-hidden rounded-[2.5rem] bg-white/5 backdrop-blur-[40px] border border-white/20 shadow-[0_16px_64px_0_rgba(0,0,0,0.4)] animate-fade-in flex flex-col min-h-[600px]">
                    <WeatherEffects condition={weather.main || ''} />
                    
                    <div className="relative z-10 flex flex-col w-full h-full">
                        
                        {/* Top Navbar */}
                        <div className="w-full flex flex-col md:flex-row justify-between items-center px-8 pt-6 pb-4 border-b border-white/10">
                            <div className="w-full md:w-1/3 mb-4 md:mb-0">
                                <SearchForm onSearch={handleCitySearch} />
                            </div>
                            <div className="flex items-center gap-6 text-sm font-semibold text-foreground/70">
                                <span className="hover:text-foreground cursor-pointer transition-colors">Dashboard</span>
                                <span className="hover:text-foreground cursor-pointer transition-colors">Map</span>
                                <span className="hover:text-foreground cursor-pointer transition-colors">News</span>
                                <span className="hover:text-foreground cursor-pointer transition-colors">Settings</span>
                                <button
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="ml-4 p-2 bg-secondary/50 hover:bg-secondary rounded-full transition-colors cursor-pointer text-foreground/70 hover:text-foreground"
                                >
                                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="px-8 pt-8 pb-4 flex-1 flex flex-col">
                            <h2 className="text-3xl font-medium mb-8 text-foreground tracking-wide">Weather Overview.</h2>
                            
                            {/* Middle Section: Overview + Metric Grid */}
                            <div className="flex flex-col lg:flex-row w-full gap-6 mb-10">
                                
                                {/* Left: Large Current Weather Panel */}
                                <div className="flex-1 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10 flex flex-col md:flex-row items-center justify-between shadow-sm">
                                    <div className="flex items-start">
                                        <h1 className="text-[7rem] leading-[0.8] font-light text-foreground tracking-tighter">
                                            {Math.round(currentTemp)}°
                                        </h1>
                                        <span className="text-5xl font-light text-muted-foreground mt-2">C</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center md:items-end md:pr-4 mt-6 md:mt-0">
                                        {getWeatherIcon(weather.main)}
                                        <span className="mt-4 text-2xl font-bold text-foreground">{weather.city}</span>
                                        <span className="text-base font-medium text-foreground/70 capitalize mt-1">{weather.description}</span>
                                    </div>
                                </div>

                                {/* Right: 2x2 Metrics Grid */}
                                <div className="w-full lg:w-5/12 grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 backdrop-blur-xl rounded-[1.5rem] border border-white/10 p-5 flex flex-col justify-center">
                                        <span className="text-sm font-medium text-muted-foreground mb-1">Humidity:</span>
                                        <span className="text-2xl font-semibold text-foreground">{weather.humidity}%</span>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-xl rounded-[1.5rem] border border-white/10 p-5 flex flex-col justify-center">
                                        <span className="text-sm font-medium text-muted-foreground mb-1">Wind:</span>
                                        <span className="text-2xl font-semibold text-foreground">{weather.wind_speed} m/s</span>
                                    </div>
                                    <div className="h-full">
                                        <ChaiIndexCard temperature={currentTemp} humidity={weather.humidity} isCompact={true} />
                                    </div>
                                    <div className="h-full">
                                        <CarWashAdvisor forecastData={forecastInfo.forecast} isCompact={true} />
                                    </div>
                                </div>

                            </div>
                            
                            {/* Bottom Section: Forecast Row */}
                            <div className="w-full z-10">
                                <ForecastList forecastData={forecastInfo.forecast} />
                            </div>
                        </div>

                        {/* Bottom Wave Decorator (Mock Chart area) */}
                        <div className="w-full h-32 opacity-10 pointer-events-none mt-auto absolute bottom-0 left-0">
                            <svg viewBox="0 0 1440 320" className="w-full h-full object-cover object-bottom" preserveAspectRatio="none">
                                <path fill="currentColor" className="text-foreground" fillOpacity="1" d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,149.3C672,139,768,149,864,176C960,203,1056,245,1152,240C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Footer */}
            <footer className="w-full mt-16 pt-8 text-center pb-8">
                <p className="text-xs text-muted-foreground/65">
                    Designed with modern glassmorphism & dynamic telemetry.
                </p>
            </footer>
        </div>
    );
}
