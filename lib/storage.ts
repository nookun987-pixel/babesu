/**
 * Google Cloud Storage configuration for Mikage Zenith
 * Used for storing generated images and assets
 */

import { Storage } from '@google-cloud/storage';

// Cache storage instance to avoid repeated initialization
let storageInstance: { storage: Storage; bucket: any } | null = null;

// Initialize GCP Storage (only if credentials are provided)
export const initStorage = () => {
  // Return cached instance if available
  if (storageInstance) {
    return storageInstance;
  }

  try {
    if (process.env.GCP_PROJECT_ID && process.env.GCP_CREDENTIALS) {
      const storage = new Storage({
        projectId: process.env.GCP_PROJECT_ID,
        credentials: JSON.parse(process.env.GCP_CREDENTIALS)
      });
      
      const bucketName = process.env.GCP_BUCKET_NAME || 'mikage-zenith-assets';
      const bucket = storage.bucket(bucketName);
      
      // Cache the instance
      storageInstance = { storage, bucket };
      return storageInstance;
    }
    
    console.log('GCP Storage not configured - using local storage fallback');
    return null;
  } catch (error) {
    console.error('Error initializing GCP Storage:', error);
    return null;
  }
};

export const uploadImage = async (file: Buffer, filename: string) => {
  const storageConfig = initStorage();
  
  if (!storageConfig) {
    throw new Error('Storage not configured');
  }
  
  const { bucket } = storageConfig;
  const blob = bucket.file(filename);
  
  await blob.save(file, {
    metadata: {
      contentType: 'image/png',
    },
  });
  
  return `https://storage.googleapis.com/${bucket.name}/${filename}`;
};
