import axios from "axios";

export const fetchData = (page) => async (dispatch) => {
  try {
    const API_KEY = "86805d3f5cae4725244fe5e0f2c0bc28";
    console.log("Fetching data for page:", page);
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?&api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
    );
    console.log("Data fetched successfully:", response.data.results);
    dispatch({
      type: "FETCH_DATA_SUCCESS",
      payload: response.data.results,
      totalPages: response.data.total_pages,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    dispatch({
      type: "FETCH_DATA_ERROR",
      payload: error.message,
    });
  }
};
