import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize";
const clientID = '299a2d2ce86849dda9ba9ec06e5d07c5'; 
const redirectUri = "http://localhost:3000/dashboard";
const scopes = ["user-library-read"];

export const loginEndpoint = `${authEndpoint}?response_type=code&client_id=${clientID}&redirect_uri=${redirectUri}`;
export const getToken = async (code) => {
  const tokenEndpoint = 'https://accounts.spotify.com/api/token';
  
  const response = await axios.post(
    tokenEndpoint,
    new URLSearchParams({
      code: code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  console.log(response)

  return response.data;
};


const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    console.log("accesstoken set")
    return config;
  });
};

export default apiClient;

