import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface UploadSectionProps {
    onFileSelected: (file: File) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onFileSelected }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSelect(e.dataTransfer.files[0]);
        }
    }, [onFileSelected]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSelect(e.target.files[0]);
        }
    };

    const validateAndSelect = (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }
        onFileSelected(file);
    };

    return (
        <div 
            className={`
                relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 cursor-pointer group
                ${isDragging 
                    ? 'border-festo-gold bg-festo-accent/50' 
                    : 'border-festo-accent hover:border-festo-gold/50 bg-festo-card'
                }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
        >
            <input 
                id="file-upload" 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleChange} 
            />
            
            <div className="flex flex-col items-center gap-4">
                <div className={`
                    w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500
                    ${isDragging ? 'bg-festo-gold text-festo-dark scale-110' : 'bg-festo-dark text-festo-gold group-hover:scale-110'}
                `}>
                    {isDragging ? <Upload size={32} /> : <ImageIcon size={32} />}
                </div>
                
                <h3 className="text-2xl font-serif text-white mt-4">
                    {isDragging ? 'Drop Image Here' : 'Upload Venue Photo'}
                </h3>
                
                <p className="text-gray-400 max-w-sm mx-auto">
                    Drag and drop your empty venue photo here, or click to browse. 
                    <br/><span className="text-xs text-gray-500 mt-2 block">Supported: JPG, PNG, WEBP</span>
                </p>
                
                <div className="mt-6 px-6 py-2 border border-festo-gold/30 rounded-full text-festo-gold text-sm uppercase tracking-wider group-hover:bg-festo-gold group-hover:text-festo-dark transition-colors">
                    Select File
                </div>
            </div>
        </div>
    );
};
