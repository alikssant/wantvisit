import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const usePlaceStore = create((set) => ({
  //product state
  places: [],
  loading: false,
  error: null,

  fetchPlaces: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ places: response.data.data, error: null });
    } catch (err) {
      if (err.response && err.response.status === 429)
        set({ error: "Rate limit exceed", places: [] });
      else set({ error: "Something went wrong", places: [] });
    } finally {
      set({ loading: false });
    }
  },
}));
