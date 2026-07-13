'use client';

import { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun, Moon, Wind, Loader2, MapPin } from 'lucide-react';

type WeatherData = {
  temperature: number;
  windSpeed: number;
  weatherCode: number;
  isDay: boolean;
};

export default function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [locationName, setLocationName] = useState("Local");

  useEffect(() => {
    async function fetchWeather(lat: number, lon: number) {
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,weather_code,wind_speed_10m&timezone=auto`);
        if (!res.ok) throw new Error('Failed to fetch');
        
        const json = await res.json();
        setData({
          temperature: json.current.temperature_2m,
          windSpeed: json.current.wind_speed_10m,
          weatherCode: json.current.weather_code,
          isDay: json.current.is_day === 1
        });
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setLocationName("New Delhi (Default)");
          fetchWeather(28.6139, 77.2090);
        }
      );
    } else {
      setLocationName("New Delhi (Default)");
      fetchWeather(28.6139, 77.2090);
    }
  }, []);

  if (loading) {
    return (
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-6 flex flex-col items-center justify-center h-full min-h-[160px]">
        <Loader2 className="animate-spin text-orange-500 mb-2" />
        <span className="text-neutral-500 font-mono text-xs">Connecting to satellite...</span>
      </div>
    );
  }

  if (error || !data) {
    return null;
  }

  const getWeatherIcon = (code: number) => {
    if (code <= 3) return data.isDay ? <Sun size={32} className="text-yellow-400" /> : <Moon size={32} className="text-neutral-300" />;
    if (code <= 48) return <Cloud size={32} className="text-neutral-400" />;
    if (code <= 67) return <CloudRain size={32} className="text-blue-400" />;
    return <Cloud size={32} className="text-neutral-400" />;
  };

  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-6 relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        {getWeatherIcon(data.weatherCode)}
      </div>
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-neutral-400 font-mono text-xs uppercase tracking-wider mb-1">Local Env</h4>
        </div>
        <div className="bg-neutral-950 border border-neutral-800 p-2 rounded-sm">
           {getWeatherIcon(data.weatherCode)}
        </div>
      </div>
      
      <div className="flex items-end gap-2 mb-4">
        <span className="text-4xl font-bold text-white tracking-tight">{Math.round(data.temperature)}°</span>
        <span className="text-orange-500 font-mono text-xs mb-1 tracking-wider uppercase">C</span>
      </div>

      <div className="flex gap-4 border-t border-neutral-800 pt-4 mt-auto">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-neutral-950/50 rounded-sm border border-neutral-800">
          <MapPin size={10} className="text-orange-500" />
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">{locationName}</span>
        </div>
        <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[10px] uppercase">
          <Wind size={12} className="text-orange-500" />
          <span>{data.windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
}
