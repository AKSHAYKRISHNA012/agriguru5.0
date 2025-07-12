
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CloseIcon } from './icons/ChatIcons';
import { CameraIcon } from './icons/CameraIcon';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
}

const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startStream = useCallback(async () => {
    stopStream();
    setError(null);
    setIsLoading(true);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = mediaStream;
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error("Error accessing camera:", err);
      let errorMessage = "Could not access camera. Please ensure permission is granted.";
      if (err.name === 'NotAllowedError') {
        errorMessage = 'Camera access denied. Please allow it in your browser settings and try again.';
      } else if (err.name === 'NotFoundError') {
        errorMessage = 'No camera found. Please connect a camera and try again.';
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [stopStream]);

  useEffect(() => {
    if (isOpen) {
      startStream();
    } else {
      stopStream();
    }
    return () => {
      stopStream();
    };
  }, [isOpen, startStream, stopStream]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current && streamRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
            onCapture(file);
            onClose();
          }
        }, 'image/jpeg', 0.95);
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl relative">
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-bold">Use Camera</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <CloseIcon className="w-6 h-6"/>
          </button>
        </div>
        <div className="p-4">
            <div className="w-full aspect-[4/3] rounded-md bg-gray-900 flex items-center justify-center overflow-hidden relative">
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                        <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-2">Starting camera...</p>
                    </div>
                )}
                {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
                    <CameraIcon className="w-12 h-12 text-gray-500 mb-4" />
                    <p className="font-semibold text-red-500 dark:text-red-400">Camera Error</p>
                    <p className="text-sm text-white dark:text-gray-300 mt-1 max-w-xs">{error}</p>
                    <button 
                        onClick={startStream} 
                        className="mt-4 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
                )}
                <video 
                    ref={videoRef}
                    autoPlay 
                    playsInline 
                    muted 
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading || error ? 'opacity-0' : 'opacity-100'}`}
                >
                </video>
            </div>
            <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
        <div className="p-4 border-t dark:border-gray-700 flex justify-center">
            <button
                onClick={handleCapture}
                disabled={isLoading || !!error || !streamRef.current}
                className="bg-primary text-white rounded-full p-4 shadow-lg transform hover:scale-110 transition-transform duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                aria-label="Capture photo"
            >
                <CameraIcon className="w-8 h-8" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default CameraModal;
