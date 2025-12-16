import React from 'react';
import { EventType, GenerationConfig } from '../types';
import { Button } from './Button';
import { Wand2, RefreshCcw } from 'lucide-react';

interface ConfigFormProps {
    config: GenerationConfig;
    onChange: (key: keyof GenerationConfig, value: any) => void;
    onSubmit: () => void;
    onReset: () => void;
    imagePreview: string;
}

export const ConfigForm: React.FC<ConfigFormProps> = ({ config, onChange, onSubmit, onReset, imagePreview }) => {
    return (
        <div className="grid lg:grid-cols-2 gap-12 animate-fade-in-up">
            {/* Left: Image Preview */}
            <div className="space-y-6">
                <div className="relative group rounded-lg overflow-hidden border border-festo-accent shadow-2xl">
                    <img 
                        src={imagePreview} 
                        alt="Venue Preview" 
                        className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <button 
                            onClick={onReset}
                            className="bg-white/10 backdrop-blur text-white border border-white/50 px-6 py-3 rounded-full hover:bg-white hover:text-festo-dark transition flex items-center gap-2"
                        >
                            <RefreshCcw size={16} /> Change Photo
                        </button>
                    </div>
                </div>
                <div className="bg-festo-card p-6 rounded-lg border border-festo-accent">
                    <h4 className="text-festo-gold font-serif text-xl mb-2">Tips for Best Results</h4>
                    <ul className="text-sm text-gray-400 space-y-2 list-disc pl-5">
                        <li>Ensure the photo is well-lit and shows the entire space.</li>
                        <li>Avoid photos with people in the foreground if possible.</li>
                        <li>Be specific about colors (e.g., "Emerald Green and Gold").</li>
                    </ul>
                </div>
            </div>

            {/* Right: Form */}
            <div className="space-y-8 bg-festo-card p-8 md:p-10 rounded-lg shadow-2xl border-t-4 border-festo-gold">
                <div>
                    <h3 className="text-3xl font-serif text-white mb-2">Design Your Event</h3>
                    <p className="text-gray-400">Tell us how you want to transform this space.</p>
                </div>

                <div className="space-y-6">
                    {/* Event Type */}
                    <div>
                        <label className="block text-festo-gold text-sm font-bold uppercase tracking-wider mb-2">Event Type</label>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.values(EventType).map((type) => (
                                <button
                                    key={type}
                                    className={`
                                        p-3 text-sm text-left rounded border transition-all duration-300
                                        ${config.eventType === type 
                                            ? 'bg-festo-gold text-festo-dark border-festo-gold font-bold shadow-gold-glow' 
                                            : 'bg-festo-dark text-gray-400 border-festo-accent hover:border-festo-gold/50'}
                                    `}
                                    onClick={() => onChange('eventType', type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Theme */}
                    <div>
                        <label className="block text-festo-gold text-sm font-bold uppercase tracking-wider mb-2">Theme & Style</label>
                        <input 
                            type="text" 
                            className="w-full bg-festo-dark border border-festo-accent text-white p-4 focus:border-festo-gold focus:outline-none transition rounded-sm placeholder-gray-600"
                            placeholder="e.g. Minimalist Luxury, Rustic Bohemian, Cyberpunk..."
                            value={config.theme}
                            onChange={(e) => onChange('theme', e.target.value)}
                        />
                    </div>

                    {/* Colors */}
                    <div>
                        <label className="block text-festo-gold text-sm font-bold uppercase tracking-wider mb-2">Color Palette</label>
                        <input 
                            type="text" 
                            className="w-full bg-festo-dark border border-festo-accent text-white p-4 focus:border-festo-gold focus:outline-none transition rounded-sm placeholder-gray-600"
                            placeholder="e.g. Pastel Pink & White, Black & Gold..."
                            value={config.colorPalette}
                            onChange={(e) => onChange('colorPalette', e.target.value)}
                        />
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-festo-gold text-sm font-bold uppercase tracking-wider mb-2">Additional Requirements</label>
                        <textarea 
                            rows={3}
                            className="w-full bg-festo-dark border border-festo-accent text-white p-4 focus:border-festo-gold focus:outline-none transition rounded-sm placeholder-gray-600"
                            placeholder="Describe specific decor elements like chandeliers, round tables, stage position..."
                            value={config.additionalNotes}
                            onChange={(e) => onChange('additionalNotes', e.target.value)}
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <Button onClick={onSubmit} className="w-full group">
                        <Wand2 className="mr-2 group-hover:rotate-12 transition-transform" />
                        Generate Visualization
                    </Button>
                </div>
            </div>
        </div>
    );
};
