
import React, { useState, useRef, useCallback } from 'react';
import { AITask } from '../types';
import { aiTasks } from '../constants';
import { analyzeImage } from '../services/geminiService';
import { UploadIcon } from './icons/UploadIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { CameraIcon } from './icons/CameraIcon';
import CameraModal from './CameraModal';

const markdownToHtml = (text: string): string => {
    if (!text) return "";

    let formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    return formattedText.split('\n').map(line => {
        if (line.startsWith('### ')) return `<h3>${line.substring(4)}</h3>`;
        if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`;
        if (line.startsWith('# ')) return `<h1>${line.substring(2)}</h1>`;
        if (line.match(/^\s*[-*]\s/)) return `<li>${line.replace(/^\s*[-*]\s/, '')}</li>`;
        return `<p>${line}</p>`;
    }).join('').replace(/<\/li><li>/g, '</li><li>').replace(/<p><\/p>/g, '').replace(/<\/li>(?!<li>)/g, '</li></ul>').replace(/(?<!<\/ul>)<li>/g, '<ul><li>');
};


const AIFeatureSection = () => {
  const [activeTask, setActiveTask] = useState<AITask>(AITask.DISEASE_DETECTION);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTaskChange = (task: AITask) => {
    setActiveTask(task);
    resetState();
  };

  const resetState = () => {
    setImageFile(null);
    setImagePreview(null);
    setIsLoading(false);
    setResult(null);
    setError(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }
  
  const handleImageFile = (file: File) => {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null);
      setError(null);
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const handleAnalyzeClick = useCallback(async () => {
    if (!imageFile) {
      setError('Please upload or capture an image first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);

    const taskDetails = aiTasks[activeTask];
    try {
      const analysisResult = await analyzeImage(taskDetails.prompt, imageFile);
      setResult(analysisResult);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, activeTask]);

  const task = aiTasks[activeTask];

  return (
    <>
      <section id="ai-tools" className="py-16 sm:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Your AI Farming Assistant
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Harness the power of AI to gain instant insights from images.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-8">
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-2 sm:space-x-8 overflow-x-auto" aria-label="Tabs">
                {Object.values(AITask).map((taskKey) => (
                  <button
                    key={taskKey}
                    onClick={() => handleTaskChange(taskKey)}
                    className={`${
                      activeTask === taskKey
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300'
                    } flex-shrink-0 whitespace-nowrap py-4 px-2 border-b-2 font-medium text-sm sm:text-base transition-colors duration-200`}
                  >
                    {aiTasks[taskKey].title}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{task.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-4">{task.description}</p>
                
                <input
                  type="file"
                  id="ai-image-upload"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />

                <div className="w-full">
                    <label 
                        htmlFor="ai-image-upload"
                        className="w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-center cursor-pointer hover:border-primary dark:hover:border-primary hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200"
                    >
                        {imagePreview ? (
                        <img src={imagePreview} alt="Upload preview" className="max-h-full max-w-full object-contain rounded-md" />
                        ) : (
                        <div className="text-gray-500 dark:text-gray-400">
                            <UploadIcon className="mx-auto h-12 w-12" />
                            <p className="mt-2 font-semibold">Click to upload an image</p>
                            <p className="text-xs">Or use your camera</p>
                        </div>
                        )}
                    </label>
                    <div className="flex items-center justify-center mt-4 space-x-4">
                        <button onClick={() => setIsCameraOpen(true)} className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                            <CameraIcon className="w-5 h-5"/>
                            Use Camera
                        </button>
                    </div>
                </div>

                {error && <p className="text-red-500 mt-2">{error}</p>}
                
                <button
                  onClick={handleAnalyzeClick}
                  disabled={!imageFile || isLoading}
                  className="mt-6 w-full flex items-center justify-center bg-primary hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                      <>
                          <SparklesIcon className="w-5 h-5 mr-2" />
                          Analyze Image
                      </>
                  )}
                </button>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 h-[450px] overflow-y-auto ring-1 ring-inset ring-gray-200 dark:ring-gray-700">
                <h4 className="font-bold text-lg mb-4">Analysis Result</h4>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {isLoading && <p>Thinking... Please wait.</p>}
                  {result ? (
                    <div dangerouslySetInnerHTML={{ __html: markdownToHtml(result) }} />
                  ) : (
                    !isLoading && <p className="text-gray-500">Your analysis will appear here.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CameraModal 
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleImageFile}
      />
    </>
  );
};

export default AIFeatureSection;
