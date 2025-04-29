import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async () => {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=32.00426200&lon=-6.57833870&appid=036acb124944680e8aedda84f4dad91a"
    );
    const name = response.data.name;
    const temp = Math.round(response.data.main.temp - 273.15);
    const tempMax = Math.round(response.data.main.temp_max - 273.15);
    const tempMin = Math.round(response.data.main.temp_min - 273.15);
    const weatherDescription = response.data.weather[0].description;
    const icon = response.data.weather[0].icon;

    // console.log(name, temp, tempMax, tempMin, weatherDescription, icon);
    return { name, temp, tempMax, tempMin, weatherDescription, icon };
  }
);

const initialState = {
  loading: false,
  weatherState: {},
  error: null
};

export const weatherAppSlice = createSlice({
  name: "weatherApp",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherState = action.payload;
        // console.log(state.weatherState);
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { changeState } = weatherAppSlice.actions;

export default weatherAppSlice.reducer;
