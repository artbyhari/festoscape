import React, { useState } from 'react';
import { AppState, EventType, GenerationConfig, GeneratedResult } from './types';
import { generateEventVisualization, fileToBase64 } from './services/geminiService';
import { UploadSection } from './components/UploadSection';
import { ConfigForm } from './components/ConfigForm';
import { ResultDisplay } from './components/ResultDisplay';
import { Sparkles, ArrowRight, X } from 'lucide-react';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>(AppState.IDLE);
    const [error, setError] = useState<string | null>(null);
    const [config, setConfig] = useState<GenerationConfig>({
        image: null,
        eventType: EventType.WEDDING,
        theme: '',
        colorPalette: '',
        additionalNotes: ''
    });
    const [result, setResult] = useState<GeneratedResult | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    const handleFileSelect = async (file: File) => {
        setConfig(prev => ({ ...prev, image: file }));
        try {
            const preview = await fileToBase64(file);
            setImagePreview(`data:${file.type};base64,${preview}`);
            setAppState(AppState.CONFIGURING);
        } catch (err) {
            setError("Failed to process image");
        }
    };

    const handleConfigChange = (key: keyof GenerationConfig, value: any) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    const handleGenerate = async () => {
        setAppState(AppState.GENERATING);
        setError(null);
        
        try {
            const generatedImage = await generateEventVisualization(config);
            setResult({
                originalImage: imagePreview,
                generatedImage,
                promptUsed: `${config.eventType} - ${config.theme} - ${config.colorPalette}`
            });
            setAppState(AppState.SUCCESS);
        } catch (err: any) {
            console.error(err);
            setError("Failed to generate visualization. Please try again. Ensure your image is clear.");
            setAppState(AppState.CONFIGURING);
        }
    };

    const handleReset = () => {
        setAppState(AppState.IDLE);
        setConfig(prev => ({ ...prev, image: null }));
        setResult(null);
        setImagePreview('');
        setError(null);
    };

    return (
        <div className="flex flex-col min-h-screen font-sans bg-festo-dark text-gray-100">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#1a120e]/95 backdrop-blur-md border-b border-[#3E2D23] shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div onClick={() => window.location.reload()} className="flex items-center gap-3 cursor-pointer group">
                             {/* Placeholder Logo Icon */}
                            <div className="w-10 h-10 bg-gradient-to-br from-festo-gold to-festo-gold-dark rounded-sm flex items-center justify-center text-festo-dark font-bold text-xl font-serif">
                                F
                            </div>
                            <span className="text-2xl font-bold tracking-widest text-white group-hover:text-festo-gold transition duration-300 font-serif">
                                FESTOSCAPE
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                {/* Hero / Intro */}
                {appState === AppState.IDLE && (
                    <section id="home" className="relative py-20 lg:py-32 overflow-hidden">
                        {/* Background Elements */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-festo-accent/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-festo-gold/5 blur-[120px] rounded-full"></div>
                        </div>

                        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-festo-gold/30 bg-festo-gold/10 text-festo-gold text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
                                <Sparkles size={14} /> AI-Powered Event Design
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl font-serif">
                                Visualize Your <br/>
                                <span className="text-gold-gradient italic">Dream Event</span> Instantly.
                            </h1>
                            
                            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                                Upload a photo of any venue—banquet hall, lawn, or conference room—and watch FestoScape transform it into a fully decorated masterpiece in seconds.
                            </p>

                            <div id="create" className="max-w-4xl mx-auto bg-festo-card/50 backdrop-blur-sm p-8 rounded-2xl border border-festo-accent shadow-2xl">
                                <UploadSection onFileSelected={handleFileSelect} />
                            </div>
                        </div>
                    </section>
                )}

                {/* Configuration State */}
                {appState === AppState.CONFIGURING && (
                    <section className="py-20 min-h-[80vh] flex flex-col justify-center">
                        <div className="max-w-7xl mx-auto px-4 w-full">
                            <div className="mb-8 flex items-center gap-2 text-gray-400 text-sm uppercase tracking-widest">
                                <span className="text-festo-gold cursor-pointer hover:underline" onClick={handleReset}>Upload</span>
                                <ArrowRight size={14} />
                                <span className="text-white">Configure</span>
                            </div>
                            
                            {error && (
                                <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded mb-6 flex items-center gap-3">
                                    <X size={20} /> {error}
                                </div>
                            )}
                            
                            <ConfigForm 
                                config={config} 
                                onChange={handleConfigChange} 
                                onSubmit={handleGenerate}
                                onReset={handleReset}
                                imagePreview={imagePreview}
                            />
                        </div>
                    </section>
                )}

                {/* Loading State */}
                {appState === AppState.GENERATING && (
                    <section className="h-[80vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                        
                        <div className="relative z-10">
                            <div className="w-24 h-24 border-4 border-festo-accent border-t-festo-gold rounded-full animate-spin mx-auto mb-8 shadow-[0_0_30px_rgba(212,175,55,0.3)]"></div>
                            <h2 className="text-3xl font-serif text-white mb-4">Designing Your Event...</h2>
                            <p className="text-gray-400 max-w-md mx-auto animate-pulse">
                                Analyzing venue architecture, placing furniture, arranging florals, and setting the lighting.
                            </p>
                        </div>
                    </section>
                )}

                {/* Success State */}
                {appState === AppState.SUCCESS && result && (
                    <section className="py-20 min-h-[80vh]">
                         <div className="max-w-7xl mx-auto px-4 w-full">
                            <div className="mb-8 flex items-center gap-2 text-gray-400 text-sm uppercase tracking-widest">
                                <span className="text-festo-gold cursor-pointer hover:underline" onClick={handleReset}>Start Over</span>
                                <ArrowRight size={14} />
                                <span className="text-white">Result</span>
                            </div>
                            
                            <ResultDisplay result={result} onReset={handleReset} />
                        </div>
                    </section>
                )}
            </main>

            <footer className="bg-[#0f0a08] border-t border-[#3E2D23] pt-16 pb-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
                     <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                             <div className="w-8 h-8 bg-festo-gold/20 rounded flex items-center justify-center text-festo-gold font-bold font-serif">F</div>
                            <span className="text-xl font-bold tracking-widest text-white font-serif">FESTOSCAPE</span>
                        </div>
                        <p className="text-gray-500 text-sm">
                            © 2025 Festonova Events LLC. Powered by Google Gemini.
                        </p>
                     </div>
                </div>
            </footer>
        </div>
    );
};

export default App;