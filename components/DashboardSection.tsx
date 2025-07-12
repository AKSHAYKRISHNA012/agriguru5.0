import React, { useState, useEffect } from 'react';
import { getMarketPrice } from '../services/geminiService';
import { MarketPriceResult } from '../types';
import { getWeatherIcon, ThermometerIcon, WindIcon, HumidityIcon, SunriseIcon, SunsetIcon } from './icons/WeatherIcons';
import { SearchIcon } from './icons/SearchIcon';
import { LinkIcon } from './icons/LinkIcon';

// WMO Weather interpretation
const weatherCodeToString: Record<number, string> = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Depositing rime fog',
    51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
    56: 'Light freezing drizzle', 57: 'Dense freezing drizzle',
    61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
    66: 'Light freezing rain', 67: 'Heavy freezing rain',
    71: 'Slight snow fall', 73: 'Moderate snow fall', 75: 'Heavy snow fall', 77: 'Snow grains',
    80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
    85: 'Slight snow showers', 86: 'Heavy snow showers',
    95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail'
};

const markdownToHtml = (text: string): string => {
    if (!text) return "";

    const lines = text.split('\n');
    let html = '';
    let inList = false;

    for (const line of lines) {
        let processedLine = line
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');

        if (processedLine.startsWith('### ')) {
            html += `<h3>${processedLine.substring(4)}</h3>`;
            continue;
        }
        if (processedLine.startsWith('## ')) {
            html += `<h2>${processedLine.substring(3)}</h2>`;
            continue;
        }
        if (processedLine.startsWith('# ')) {
            html += `<h1>${processedLine.substring(2)}</h1>`;
            continue;
        }
        
        const isListItem = processedLine.startsWith('* ') || processedLine.startsWith('- ');
        if (isListItem) {
            if (!inList) {
                html += '<ul>';
                inList = true;
            }
            html += `<li>${processedLine.substring(2)}</li>`;
        } else {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            if (processedLine.trim() !== '') {
                html += `<p>${processedLine}</p>`;
            }
        }
    }

    if (inList) {
        html += '</ul>';
    }

    return html;
};

const DashboardSection = () => {
    const [location, setLocation] = useState<{ lat: number, lon: number } | null>(null);
    const [weather, setWeather] = useState<any>(null);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [marketQuery, setMarketQuery] = useState('Tomatoes');
    const [marketResult, setMarketResult] = useState<MarketPriceResult | null>(null);
    const [isMarketLoading, setIsMarketLoading] = useState(false);

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
                setLocationError(null);
            },
            (error: GeolocationPositionError) => {
                console.error(`Geolocation error (${error.code}): ${error.message}`);
                
                let userMessage = 'Could not get your location. ';
                switch (error.code) {
                    case 1: // PERMISSION_DENIED
                        userMessage += 'Please allow location access in your browser settings and refresh the page.';
                        break;
                    case 2: // POSITION_UNAVAILABLE
                        userMessage += 'Location information is currently unavailable. Please try again later.';
                        break;
                    case 3: // TIMEOUT
                        userMessage += 'The request to get your location timed out. Please try again.';
                        break;
                    default:
                        userMessage += 'An unknown error occurred.';
                        break;
                }
                setLocationError(userMessage);
            }
        );
    }, []);

    useEffect(() => {
        if (location) {
            const fetchWeather = async () => {
                try {
                    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`);
                    if (!res.ok) {
                        throw new Error(`Weather API request failed with status ${res.status}`);
                    }
                    const data = await res.json();
                    setWeather(data);
                } catch (error) {
                    console.error("Failed to fetch weather", error);
                }
            };
            fetchWeather();
        }
    }, [location]);
    
    const handleSearchMarket = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!marketQuery) return;
        setIsMarketLoading(true);
        setMarketResult(null);
        const result = await getMarketPrice(marketQuery);
        setMarketResult(result);
        setIsMarketLoading(false);
    }
    
    // Initial search on load
    useEffect(() => {
        handleSearchMarket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const TodayWeatherIcon = getWeatherIcon(weather?.current?.weather_code);

    return (
        <section id="dashboard" className="py-16 sm:py-24 bg-gray-50/50 dark:bg-gray-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                        Your Smart Farming Dashboard
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        Live data to help you make informed decisions.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Weather Card */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col min-h-[350px]">
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Live Weather</h3>
                        {locationError && <div className="text-red-500 bg-red-100 dark:bg-red-900/30 p-3 rounded-lg text-sm">{locationError}</div>}
                        {!weather && !locationError && (
                             <div className="flex-grow flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                                <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <p className="mt-3">Fetching weather data...</p>
                            </div>
                        )}
                        {weather && (
                            <div>
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-primary-50 dark:bg-gray-700/50 rounded-lg">
                                    <div>
                                        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Today's Forecast</p>
                                        <p className="text-5xl font-bold text-gray-900 dark:text-white">{Math.round(weather.current.temperature_2m)}°{weather.current_units.temperature_2m}</p>
                                        <p className="text-gray-600 dark:text-gray-400">{weatherCodeToString[weather.current.weather_code] || 'Unknown conditions'}</p>
                                    </div>
                                    <TodayWeatherIcon className="w-24 h-24 text-primary" />
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-sm">
                                    <div className="flex items-center gap-2"><ThermometerIcon className="w-5 h-5 text-primary"/> Feels like: {Math.round(weather.current.apparent_temperature)}°</div>
                                    <div className="flex items-center gap-2"><HumidityIcon className="w-5 h-5 text-primary"/> Humidity: {weather.current.relative_humidity_2m}%</div>
                                    <div className="flex items-center gap-2"><WindIcon className="w-5 h-5 text-primary"/> Wind: {weather.current.wind_speed_10m} km/h</div>
                                    <div className="flex items-center gap-2"><SunriseIcon className="w-5 h-5 text-primary"/> Sunrise: {new Date(weather.daily.sunrise[0]).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                                    <div className="flex items-center gap-2"><SunsetIcon className="w-5 h-5 text-primary"/> Sunset: {new Date(weather.daily.sunset[0]).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Market Price Card */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col min-h-[350px]">
                         <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Market Price Intel</h3>
                         <form onSubmit={handleSearchMarket}>
                             <div className="relative">
                                 <input type="text" value={marketQuery} onChange={e => setMarketQuery(e.target.value)} placeholder="Enter crop name (e.g., Wheat)" className="w-full pl-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"/>
                                 <button type="submit" disabled={isMarketLoading} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary text-white disabled:bg-gray-400 transition-colors">
                                     <SearchIcon className="w-6 h-6"/>
                                 </button>
                             </div>
                         </form>
                         <div className="mt-4 flex-grow overflow-y-auto pr-2">
                            {isMarketLoading && (
                                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                                    <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <p className="ml-2">Fetching prices with AI...</p>
                                </div>
                            )}
                            {marketResult && (
                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                    <div dangerouslySetInnerHTML={{ __html: markdownToHtml(marketResult.priceInfo) }} />
                                    {marketResult.sources.length > 0 && (
                                        <>
                                            <h4 className="font-semibold !mt-6 !mb-2">Sources:</h4>
                                            <ul className="text-xs list-none p-0">
                                                {marketResult.sources.map((source, i) => (
                                                    <li key={source.uri + i} className="mt-1">
                                                        <a href={source.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary hover:underline">
                                                            <LinkIcon className="w-3.5 h-3.5 flex-shrink-0"/> <span className="truncate">{source.title || source.uri}</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            )}
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardSection;