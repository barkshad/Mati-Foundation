import React, { useState } from 'react';
import { Upload, Loader, Check } from 'lucide-react';
import { uploadToCloudinary } from '../services/mediaService';

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
  label?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadComplete, label = "Upload Image" }) => {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const url = await uploadToCloudinary(file);
      onUploadComplete(url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded border border-slate-300 cursor-pointer hover:bg-slate-200 transition-colors">
          {uploading ? <Loader className="animate-spin" size={18} /> : <Upload size={18} />}
          <span className="text-sm font-medium">{uploading ? "Uploading..." : "Select File"}</span>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
        </label>
        
        {success && <div className="text-teal-600 flex items-center text-sm gap-1"><Check size={16}/> Uploaded</div>}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};