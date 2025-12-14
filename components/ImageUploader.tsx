import React, { useState } from 'react';
import { Upload, Loader, Check, Film, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { uploadMedia, UploadResult } from '../services/mediaService';

interface ImageUploaderProps {
  onUploadComplete: (result: UploadResult) => void;
  label?: string;
  accept?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onUploadComplete, 
  label = "Upload Media",
  accept = "image/*,video/*"
}) => {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Determine type for UI feedback
    const isVideo = file.type.startsWith('video/');
    setFileType(isVideo ? 'video' : 'image');

    // Basic validation
    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      setError("File is too large. Max 100MB.");
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await uploadMedia(file);
      onUploadComplete(result);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to upload media. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4 w-full">
      {label && <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>}
      <div className="flex flex-col gap-2">
        <label className={`
          relative flex flex-col items-center justify-center gap-2 px-4 py-8
          bg-slate-50 text-slate-600 rounded-xl border-2 border-dashed border-slate-300 
          cursor-pointer hover:bg-slate-100 hover:border-teal-400 hover:text-teal-600 
          transition-all duration-200 group overflow-hidden
          ${uploading ? 'opacity-75 cursor-not-allowed bg-slate-100' : ''}
          ${success ? 'border-teal-500 bg-teal-50 text-teal-700' : ''}
          ${error ? 'border-red-300 bg-red-50 text-red-600' : ''}
        `}>
          {uploading ? (
            <>
              <Loader className="animate-spin text-teal-600 mb-2" size={28} />
              <span className="font-bold text-sm animate-pulse">Uploading {fileType === 'video' ? 'Video' : 'Image'}...</span>
            </>
          ) : success ? (
             <>
               <Check className="text-teal-600 mb-2" size={28} />
               <span className="font-bold text-sm">Upload Complete</span>
             </>
          ) : error ? (
            <>
              <AlertCircle className="text-red-500 mb-2" size={28} />
              <span className="font-bold text-sm">{error}</span>
            </>
          ) : (
            <>
              <div className="flex gap-3 mb-1">
                <ImageIcon size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
                <Film size={24} className="group-hover:-translate-y-1 transition-transform duration-300 delay-75" />
              </div>
              <div className="text-center">
                 <span className="font-bold text-sm block">Click to Upload</span>
                 <span className="text-xs text-slate-400 font-normal">Images or Videos (Max 100MB)</span>
              </div>
            </>
          )}
          
          <input 
            type="file" 
            className="hidden" 
            accept={accept} 
            onChange={handleFileChange} 
            disabled={uploading} 
          />
        </label>
      </div>
    </div>
  );
};