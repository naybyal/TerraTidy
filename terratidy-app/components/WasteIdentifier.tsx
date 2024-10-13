import * as FileSystem from 'expo-file-system';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

/**
 * Function to classify waste based on an image URI using MobileNet.
 * @param uri - The URI of the image to classify.
 * @returns An array of predictions (class names).
 */
export async function identifyWasteFromImage(uri: string): Promise<string[]> {
  try {
    // Load the MobileNet model
    const model = await mobilenet.load();

    // Read the image file as base64
    const imgB64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
    const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer);
    const blob = new Blob([raw], { type: 'image/jpeg' });

    // Create an image element from the base64 string
    const img = new Image();
    img.src = `data:image/jpeg;base64,${imgB64}`;

    return new Promise((resolve, reject) => {
      img.onload = async () => {
        try {
          // Convert the image to a TensorFlow.js tensor
          const imgTensor = tf.browser.fromPixels(img);

          // Classify the image using the model
          const predictions = await model.classify(imgTensor);
          const predictionResults = predictions.map((pred) => pred.className);

          // Resolve the promise with predictions
          resolve(predictionResults);
        } catch (error) {
          reject(`Error during classification: ${error}`);
        }
      };

      img.onerror = () => {
        reject('Error loading image for classification');
      };
    });
  } catch (error) {
    throw new Error(`Failed to classify waste: ${error}`);
  }
}
