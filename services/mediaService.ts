import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '../constants';

export interface UploadResult {
  url: string;
  publicId: string;
  type: 'image' | 'video';
}

export const uploadMedia = async (file: File): Promise<UploadResult> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  
  // 'auto' allows Cloudinary to detect if it is an image or a video
  const resourceType = 'auto'; 

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Upload failed');
    }

    const data = await response.json();
    return {
      url: data.secure_url,
      publicId: data.public_id,
      type: data.resource_type === 'video' ? 'video' : 'image'
    };
  } catch (error) {
    console.error('Error uploading media:', error);
    throw error;
  }
};

// Note: Deleting from Cloudinary requires a signed request from a backend server 
// or an Admin API call, which cannot be securely done from a client-side app 
// without exposing the API Secret.
// For this architecture, we will simply remove the reference from Firestore.
