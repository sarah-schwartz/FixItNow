
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
import { useSelector } from 'react-redux';

// Async func for fetching categories from MongoDB
export const fetchCategories = createAsyncThunk(
  'newRequest/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/categories`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'שגיאה בטעינת קטגוריות');
    }
  }
);

// Async func for submitting new request
export const submitNewRequest = createAsyncThunk(
  'newRequest/submitNewRequest',
  async (requestData, { rejectWithValue }) => {
    try {
      const {
        token,
        title,
        category,
        priority,
        description,
        createdBy,
        assignedTo,
        categoryFields
      } = requestData;

      const categoriesResponse = await axios.get(`${baseUrl}/Categories`);
      const categories = categoriesResponse.data;
      const selectedCategory = categories.find(cat => cat.name === category);

      if (!selectedCategory) throw new Error('קטגוריה לא נמצאה');

      let ticketTypeResponse;
      try {
        ticketTypeResponse = await axios.post(
          `${baseUrl}/TicketType/addTicketType`,
          { name: category, category: selectedCategory._id },
          { headers: { Authorization: token } }
        );
      } catch {
        console.log('Ticket type might already exist');
      }

      const ticketData = {
        description: `${title}\n\n${description}\n\nפרטים נוספים:\n${JSON.stringify(categoryFields, null, 2)}`,
        priority,
        type: ticketTypeResponse?.data?._id || selectedCategory._id,
        createdBy,
        assignedTo: assignedTo || createdBy
      };

      const response = await axios.post(`${baseUrl}/Ticket`, ticketData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'שגיאה בשליחת הבקשה');
    }
  }
);
const initialState = {
  categories: [],
  selectedCategory: null,
  formData: {
    title: '',
    category: '',
    priority: '',
    description: '',
    categoryFields: {}
  },
  currentStep: 0,
  loading: false,
  error: null,
  submitLoading: false,
  submitSuccess: false
};

const RequestSlice = createSlice({
  name: 'newRequest',
  initialState,
  reducers: {
    setFormField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    setCategoryFields: (state, action) => {
      state.formData.categoryFields = {
        ...state.formData.categoryFields,
        ...action.payload
      };
    },
    setSelectedCategory: (state, action) => {
      const categoryName = action.payload;
      state.selectedCategory = state.categories.find(cat => cat.name === categoryName) || null;
      state.formData.category = categoryName;
      // Clear previous category fields when changing category
      state.formData.categoryFields = {};
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    calculateStep: (state) => {
      const baseFields = ['title', 'category', 'priority', 'description'];
      const categoryFieldNames = state.selectedCategory?.fields?.map(f => f.fieldName) || [];
      const allRequiredFields = [...baseFields, ...categoryFieldNames];

      let filledFields = 0;

      // Check base fields
      baseFields.forEach(field => {
        if (state.formData[field]) filledFields++;
      });

      // Check category fields
      categoryFieldNames.forEach(fieldName => {
        if (state.formData.categoryFields[fieldName]) filledFields++;
      });

      const progress = (filledFields / allRequiredFields.length) * 100;

      if (progress === 100) state.currentStep = 2;
      else if (progress >= 50) state.currentStep = 1;
      else state.currentStep = 0;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.selectedCategory = null;
      state.currentStep = 0;
      state.submitSuccess = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSubmitSuccess: (state) => {
      state.submitSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories cases
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit request cases
      .addCase(submitNewRequest.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
        state.submitSuccess = false;
      })
      .addCase(submitNewRequest.fulfilled, (state) => {
        state.submitLoading = false;
        state.submitSuccess = true;
        // Reset form after successful submission
        state.formData = initialState.formData;
        state.selectedCategory = null;
        state.currentStep = 0;
      })
      .addCase(submitNewRequest.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload;
      });
  }
});

export const {
  setFormField,
  setCategoryFields,
  setSelectedCategory,
  setCurrentStep,
  calculateStep,
  resetForm,
  clearError,
  clearSubmitSuccess
} = RequestSlice.actions;

export default RequestSlice.reducer;