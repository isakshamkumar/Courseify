// courseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// Define the initial state
const initialState = {
  courses: [],
  course: null,
  loading: false,
  error: null,
};

// Define the asynchronous thunk to fetch all courses
export const fetchAllCourses = createAsyncThunk('courses/fetchAllCourses', async () => {
  try {
    const response = await axios.get('/api/courses'); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Define the asynchronous thunk to fetch a particular course
export const fetchCourseById = createAsyncThunk('courses/fetchCourseById', async (courseId) => {
  try {
    const response = await axios.get(`/api/courses/${courseId}`); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Define the course slice
const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    // You can define additional synchronous actions here if needed
  },
  extraReducers: (builder) => {
    // Handle fetchAllCourses fulfilled action
    builder.addCase(fetchAllCourses.fulfilled, (state, action) => {
      state.courses = action.payload;
      state.loading = false;
      state.error = null;
    });

    // Handle fetchAllCourses pending and rejected actions
    builder.addCase(fetchAllCourses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Handle fetchCourseById fulfilled action
    builder.addCase(fetchCourseById.fulfilled, (state, action) => {
      state.course = action.payload;
      state.loading = false;
      state.error = null;
    });

    // Handle fetchCourseById pending and rejected actions
    builder.addCase(fetchCourseById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCourseById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Export the asynchronous thunk functions
export { fetchAllCourses, fetchCourseById };

// Export the course slice reducer
export default courseSlice.reducer;
