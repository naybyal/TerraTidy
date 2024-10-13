import * as FileSystem from 'expo-file-system';
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';

// You'll need to import your model.json and weights files
import modelJSON from './model/model.json';
// import modelWeights from './model/weights.bin';

const IMAGE_SIZE = 224;
const IMAGENET_CLASSES = ['recyclable', 'organic', 'non-recyclable']; // Replace with your actual classes

let model: tf.LayersModel | null = null;

async function loadModel() {
  await tf.ready();
  if (model) return model;

  // Load the model
  model = await tf.loadLayersModel(bundleResourceIO(modelJSON, 'model/weights.bin'));
  return model;
}

/**
 * Function to classify waste based on an image URI.
 * @param uri - The URI of the image to classify.
 * @returns An array of predictions (class names).
 */
export async function identifyWasteFromImage(uri: string): Promise<string[]> {
  try {
    const model = await loadModel();

    // Read the image file
    const imgB64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
    const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer);

    // Decode and preprocess the image
    let imageTensor = decodeJpeg(raw);
    imageTensor = tf.image.resizeBilinear(imageTensor, [IMAGE_SIZE, IMAGE_SIZE]);
    imageTensor = imageTensor.expandDims(0).toFloat().div(tf.scalar(255));

    // Run inference
    const predictions = model.predict(imageTensor) as tf.Tensor;
    const scores = await predictions.data();

    // Get top 3 predictions
    const topPredictions = Array.from(scores)
      .map((score, i) => ({ score, class: IMAGENET_CLASSES[i] }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // Clean up tensors
    tf.dispose([imageTensor, predictions]);

    return topPredictions.map(pred => pred.class);
  } catch (error) {
    console.error('Error in identifyWasteFromImage:', error);
    throw new Error(`Failed to classify waste: ${error}`);
  }
}