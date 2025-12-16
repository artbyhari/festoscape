import React, { useState } from 'react';
import { GeneratedResult } from '../types';
import { Button } from './Button';
import { Download, RefreshCcw, Share2, Maximize2 } from 'lucide-react';

interface ResultDisplayProps {
    result: GeneratedResult;
    onReset: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
    const [activeTab, setActiveTab] = useState<'compare' | 'generated'>('compare');

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-serif text-white mb-4">Your <span className="text-gold-gradient">Vision</span> Realized</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    We've transformed your venue based on your requirements.
                </p>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mb-8">
                <button 
                    onClick={() => setActiveTab('compare')}
                    className={`px-6 py-2 rounded-full text-sm font-bold tracking-wide transition ${activeTab === 'compare' ? 'bg-festo-gold text-festo-dark' : 'bg-festo-card text-gray-400 hover:text-white'}`}
                >
                    Before / After
                </button>
                <button 
                    onClick={() => setActiveTab('generated')}
                    className={`px-6 py-2 rounded-full text-sm font-bold tracking-wide transition ${activeTab === 'generated' ? 'bg-festo-gold text-festo-dark' : 'bg-festo-card text-gray-400 hover:text-white'}`}
                >
                    Full View
                </button>
            </div>

            {/* Image Container */}
            <div className="bg-festo-card p-4 rounded-xl border border-festo-accent shadow-2xl overflow-hidden relative min-h-[500px]">
                {activeTab === 'compare' ? (
                     <div className="grid md:grid-cols-2 gap-4 h-full">
                        <div className="relative group overflow-hidden rounded-lg">
                            <span className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded uppercase">Original Venue</span>
                            <img src={result.originalImage} alt="Original" className="w-full h-full object-cover transition transform group-hover:scale-105 duration-700" />
                        </div>
                        <div className="relative group overflow-hidden rounded-lg">
                            <span className="absolute top-4 left-4 z-10 bg-festo-gold text-festo-dark text-xs font-bold px-3 py-1 rounded uppercase shadow-lg">FestoScape Design</span>
                            <img src={result.generatedImage} alt="Generated" className="w-full h-full object-cover transition transform group-hover:scale-105 duration-700" />
                        </div>
                     </div>
                ) : (
                    <div className="relative w-full h-full rounded-lg overflow-hidden group">
                        <img src={result.generatedImage} alt="Generated Full" className="w-full h-auto object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-8">
                            <h4 className="text-white font-serif text-2xl">Generated Concept</h4>
                            <p className="text-gray-300 text-sm mt-2 line-clamp-2 max-w-2xl">{result.promptUsed}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row justify-center gap-6 mt-12">
                <Button onClick={() => {
                    const link = document.createElement('a');
                    link.href = result.generatedImage;
                    link.download = 'festoscape-design.png';
                    link.click();
                }} variant="primary">
                    <Download size={20} /> Download Design
                </Button>
                
                <Button onClick={onReset} variant="outline">
                    <RefreshCcw size={20} /> Create Another
                </Button>
            </div>
        </div>
    );
};
