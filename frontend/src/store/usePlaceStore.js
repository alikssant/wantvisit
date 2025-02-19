import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";

export const usePlaceStore = create((set, get) => ({
  //product state
  places: [],
  loading: false,
  error: null,

  //form state
  formData: {
    name: "",
    country: "",
    image: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", country: "", image: "" } }),

  addPlace: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchPlaces();
      get().resetForm();
      toast.success("Place added successfully");
      document.getElementById("add_place_modal").closest();
    } catch (error) {
      console.log("Error in addPlace function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

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

  deletePlace: async (id) => {
    console.log("deleteProduct function called", id);
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((prev) => ({
        places: prev.places.filter((place) => place.id !== id),
      }));
      toast.success("Place deleted successfully");
    } catch (error) {
      console.log("Error in deletePlace function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
