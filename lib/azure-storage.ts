import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';

// Azure Storage configuration
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const CONTAINER_NAME = 'form-attachments';

// Initialize blob service client
function getBlobServiceClient(): BlobServiceClient {
  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw new Error('AZURE_STORAGE_CONNECTION_STRING environment variable is not set');
  }
  return BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
}

// Generate unique filename with timestamp
function generateFileName(originalName: string, formType: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const extension = originalName.split('.').pop();
  const baseName = originalName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '_');
  return `${formType}/${timestamp}_${baseName}.${extension}`;
}

// Upload file to Azure Blob Storage
export async function uploadFileToBlob(
  file: File,
  formType: 'contact' | 'referral'
): Promise<{ url: string; fileName: string }> {
  try {
    const blobServiceClient = getBlobServiceClient();
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
    
    // Create container if it doesn't exist
    await containerClient.createIfNotExists({
      access: 'blob' // Allow public read access
    });

    // Generate unique filename
    const fileName = generateFileName(file.name, formType);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload file
    await blockBlobClient.upload(buffer, buffer.length, {
      blobHTTPHeaders: {
        blobContentType: file.type || 'application/octet-stream'
      }
    });

    // Generate public URL
    const url = blockBlobClient.url;

    return {
      url,
      fileName: file.name
    };
  } catch (error) {
    console.error('Error uploading file to blob storage:', error);
    throw new Error('Failed to upload file');
  }
}

// Upload multiple files
export async function uploadFilesToBlob(
  files: File[],
  formType: 'contact' | 'referral'
): Promise<Array<{ url: string; fileName: string }>> {
  const uploadPromises = files.map(file => uploadFileToBlob(file, formType));
  return Promise.all(uploadPromises);
}
