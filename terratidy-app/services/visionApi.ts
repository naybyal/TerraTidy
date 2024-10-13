import axios from 'axios';

const VISION_API_URL = 'https://vision.googleapis.com/v1/images:annotate';
const API_KEY = 'YOUR_GOOGLE_CLOUD_VISION_API_KEY'; // Replace with your actual API Key

// Type for the API response
export interface VisionApiResponse {
  responses: {
    labelAnnotations: {
      description: string;
      score: number;
    }[];
  }[];
}

export async function identifyWaste(base64Image: string): Promise<string[]> {
  try {
    const response = await axios.post<VisionApiResponse>(
      `${VISION_API_URL}?key=${API_KEY}`,
      {
        requests: [
          {
            image: {
              content: base64Image, // Base64-encoded image
            },
            features: [
              {
                type: 'LABEL_DETECTION',
                maxResults: 5, // Adjust this based on how many labels you want
              },
            ],
          },
        ],
      }
    );

    const labels = response.data.responses[0].labelAnnotations.map(
      (annotation) => annotation.description
    );

    return labels; // Array of identified waste types
  } catch (error) {
    console.error('Error identifying waste:', error);
    throw new Error('Waste identification failed.');
  }
}
