import React, { useState } from 'react';
import { Upload, Loader, Check, Film, Image as ImageIcon } from 'lucide-react';
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
      setError("Failed to upload media. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <div className="flex flex-col gap-2">
        <label className={`
          flex items-center justify-center gap-2 px-4 py-6 
          bg-slate-50 text-slate-600 rounded-xl border-2 border-dashed border-slate-300 
          cursor-pointer hover:bg-slate-100 hover:border-teal-400 hover:text-teal-600 
          transition-all duration-200 group
          ${uploading ? 'opacity-75 cursor-not-allowed' : ''}
        `}>
          {uploading ? (
            <Loader className="animate-spin text-teal-600" size={24} />
          ) : (
            <div className="flex flex-col items-center gap-1">
              <Upload size={24} className="group-hover:-translate-y-1 transition-transform" />
            </div>
          )}
          <span className="font-bold text-sm">{uploading ? "Uploading to Cloud..." : "Click to Select File"}</span>
          <input 
            type="file" 
            className="hidden" 
            accept={accept} 
            onChange={handleFileChange} 
            disabled={uploading} 
          />
        </label>
        
        <div className="flex justify-between items-start text-xs text-slate-400 px-1">
          <span>Supports JPG, PNG, MP4, WebM</span>
          {success && <span className="text-teal-600 font-bold flex items-center gap-1"><Check size={12}/> Upload Complete</span>}
        </div>
      </div>
      {error && <p className="text-red-500 text-xs mt-2 bg-red-50 p-2 rounded">{error}</p>}
    </div>
  );
};