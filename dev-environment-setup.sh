# Install Node.js and npm (if not already installed)
# Visit https://nodejs.org and download the appropriate version

# Install React Native CLI
npm install -g react-native-cli

# Install MongoDB (for local development)
# Visit https://www.mongodb.com/try/download/community and follow the instructions

# Install required global packages
npm install -g nodemon

# Create a new directory for your project
mkdir TerraTidy
cd TerraTidy

# Initialize the React Native project
npx react-native init TerraTidyApp

# Create a directory for the backend
mkdir TerraTidyBackend
cd TerraTidyBackend

# Initialize the backend project
npm init -y
npm install express mongoose dotenv cors

# Create a .env file for environment variables
touch .env

# Add the following to the .env file:
# MONGODB_URI=your_mongodb_atlas_connection_string
# CLOUD_VISION_API_KEY=your_google_cloud_vision_api_key
