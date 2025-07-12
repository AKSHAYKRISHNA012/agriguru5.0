import React from 'react';

// WMO Weather interpretation codes: https://open-meteo.com/en/docs
const SunIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>;
const CloudSunIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a4.5 4.5 0 004.5-4.5F22.5 12.375 20.625 9 18 9h-1.125c-.251-.75-.615-1.428-1.065-2.029" /></svg>;
const CloudIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a4.5 4.5 0 004.5-4.5F22.5 12.375 20.625 9 18 9h-1.125c-.251-.75-.615-1.428-1.065-2.029" /></svg>;
const FogIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a4.5 4.5 0 004.5-4.5F22.5 12.375 20.625 9 18 9h-1.125c-.251-.75-.615-1.428-1.065-2.029M3 10.5h18M3 13.5h18" /></svg>;
const DrizzleIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a4.5 4.5 0 004.5-4.5F22.5 12.375 20.625 9 18 9h-1.125c-.251-.75-.615-1.428-1.065-2.029M12 15.75v3M12 9.75v3m0-6v.001" /></svg>;
const RainIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a4.5 4.5 0 004.5-4.5F22.5 12.375 20.625 9 18 9h-1.125c-.251-.75-.615-1.428-1.065-2.029M12 15.75v3M12 9.75v3m-3 3v3m-3-6v3m6-6v3m6 0v3" /></svg>;
const SnowIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a4.5 4.5 0 004.5-4.5F22.5 12.375 20.625 9 18 9h-1.125c-.251-.75-.615-1.428-1.065-2.029M12 15.75v3m-3 1.5l-1.5-1.5m6 0l-1.5 1.5m-1.5-1.5l1.5-1.5m-3 0l1.5 1.5" /></svg>;
const ThunderstormIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a4.5 4.5 0 004.5-4.5F22.5 12.375 20.625 9 18 9h-1.125c-.251-.75-.615-1.428-1.065-2.029m-1.751 6.375a.75.75 0 001.5 0v-1.5a.75.75 0 00-1.5 0v1.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 12.75l-2.25 2.25 4.5 4.5-2.25 2.25" /></svg>;

const codeToIconMap: Record<number, React.FC<React.SVGProps<SVGSVGElement>>> = {
    0: SunIcon,
    1: CloudSunIcon,
    2: CloudIcon,
    3: CloudIcon,
    45: FogIcon,
    48: FogIcon,
    51: DrizzleIcon,
    53: DrizzleIcon,
    55: DrizzleIcon,
    56: DrizzleIcon,
    57: DrizzleIcon,
    61: RainIcon,
    63: RainIcon,
    65: RainIcon,
    66: RainIcon,
    67: RainIcon,
    71: SnowIcon,
    73: SnowIcon,
    75: SnowIcon,
    77: SnowIcon,
    80: RainIcon,
    81: RainIcon,
    82: RainIcon,
    85: SnowIcon,
    86: SnowIcon,
    95: ThunderstormIcon,
    96: ThunderstormIcon,
    99: ThunderstormIcon,
};

export const ThermometerIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75v8.25a2.25 2.25 0 002.25 2.25h3a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25h-3a2.25 2.25 0 00-2.25 2.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);

export const WindIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a2.25 2.25 0 010 4.5H5.625a2.25 2.25 0 010-4.5z" />
    </svg>
);

export const HumidityIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s9.75 9.75 9.75 9.75 5.136-2.064 6.93-5.042" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
    </svg>
);

export const SunriseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 18.75h18" />
    </svg>
);

export const SunsetIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v.01M12 21v-2.992M3 12h1M20 12h1m-6.364-6.364l.707-.707M6.343 17.657l-.707.707m12.728 0l.707-.707M6.343 6.343l.707-.707M3 18.75h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
);

export const getWeatherIcon = (code: number | null): React.FC<React.SVGProps<SVGSVGElement>> => {
    if (code === null || !codeToIconMap[code]) return CloudIcon;
    return codeToIconMap[code];
};