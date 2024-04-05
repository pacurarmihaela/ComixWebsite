import axios from "axios";

// Create an instance of axios with custom configurations
export default axios.create({
      // Base URL for API requests
    baseURL:"http://localhost:8096",
      // Skip browser warning for ngrok
    headers: {"ngrok-skip-browser-warning":"true"
},
});