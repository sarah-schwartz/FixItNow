import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from '../services/axiosInstance';

const initialState = {
  formData: {
    title: '',
    category: '',
    priority: '',
    description: '',
    categoryFields: {},
    createdBy: null,
    assignedTo: null,
  },
  categories: [],
  selectedCategory: null,
  currentStep: 0,
  loading: false,
  submitLoading: false,
  error: null,
  submitSuccess: false,
};

export const fetchCategories = createAsyncThunk(
  'requests/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpClient.get('/categories');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load categories');
    }
  }
);

export const submitNewRequest = createAsyncThunk(
  'requests/submitNewRequest',
  async (requestData, { rejectWithValue, getState }) => {
    try {
      const {
        title,
        type,
        priority,
        description,
        createdBy,
        assignedTo,
        fieldValues,
      } = requestData;

      const state = getState();
      const selectedCategory = state.requests.selectedCategory;

      if (!selectedCategory || !selectedCategory.name || !selectedCategory._id) {
        throw new Error('Category not found');
      }

      const ticketData = {
        title,
        description,
        priority,
        type,
        createdBy,
        assignedTo: assignedTo || createdBy,
        fieldValues,
      };

      const response = await httpClient.post('/Ticket', ticketData);
      return response.data;
    } catch (error) {
      console.error('Submit request error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to submit request'
      );
    }
  }
);

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setFormField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    setCategoryFields: (state, action) => {
      state.formData.categoryFields = {
        ...state.formData.categoryFields,
        ...action.payload,
      };
    },
    setSelectedCategory: (state, action) => {
      const categoryObj = action.payload;
      state.selectedCategory = categoryObj;
      state.formData.category = categoryObj?._id || '';
      state.formData.categoryFields = {};
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    calculateStep: (state) => {
      const baseFields = ['title', 'category', 'priority', 'description'];
      const filledBaseFields = baseFields.filter(field => 
        state.formData[field] && state.formData[field].toString().trim() !== ''
      );

      if (filledBaseFields.length === 0) {
        state.currentStep = 0;
      } else if (filledBaseFields.length < baseFields.length) {
        state.currentStep = 1;
      } else {
        const categoryFields = state.selectedCategory?.fields || [];
        const filledCategoryFields = categoryFields.filter(field =>
          state.formData.categoryFields[field.fieldName] && 
          state.formData.categoryFields[field.fieldName].toString().trim() !== ''
        );

        if (filledCategoryFields.length === categoryFields.length) {
          state.currentStep = 2;
        } else {
          state.currentStep = 1;
        }
      }
    },
    nextStep: (state) => {
      if (state.currentStep < 2) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.selectedCategory = null;
      state.currentStep = 0;
      state.error = null;
      state.submitSuccess = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSubmitSuccess: (state) => {
      state.submitSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit request
      .addCase(submitNewRequest.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
        state.submitSuccess = false;
      })
      .addCase(submitNewRequest.fulfilled, (state, action) => {
        state.submitLoading = false;
        state.error = null;
        state.submitSuccess = true;
        // Reset form on successful submission
        state.formData = initialState.formData;
        state.selectedCategory = null;
        state.currentStep = 0;
      })
      .addCase(submitNewRequest.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload;
        state.submitSuccess = false;
      });
  },
});

export const {
  setFormField,
  setCategoryFields,
  setSelectedCategory,
  setCurrentStep,
  calculateStep,
  nextStep,
  prevStep,
  resetForm,
  clearError,
  clearSubmitSuccess,
} = requestsSlice.actions;

export default requestsSlice.reducer;
