import axios from "axios";

export const fetchYelpRestaurant = (filters) => {
  return axios.post('/api/fetchYelpRestaurant', filters)
    .then(res => res.data);
};

/**
 * @returns {Promise<{alias: string, title}[]>}
 */
export const fetchYelpAutoCompletion = (text) => {
  return axios.post('/api/fetchYelpAutoCompletion', text)
};

export const fetchRestaurantHistory = () => {
  return axios.get(`/api/history`).then((res) => res.data);
};

export const acceptRestaurant = () => {
  return axios.post('/api/acceptRestaurant');
};


