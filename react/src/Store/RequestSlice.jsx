import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../services/axiosInstance'; 

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
  'newRequest/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/categories');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'שגיאה בטעינת קטגוריות');
    }
  }
);

export const submitNewRequest = createAsyncThunk(
  'newRequest/submitNewRequest',
  async (requestData, { rejectWithValue }) => {
    try {
      const {
        title,
        category,
        priority,
        description,
        createdBy,
        assignedTo,
        categoryFields,
      } = requestData;

      const categoriesResponse = await axios.get('/categories');
      const categories = categoriesResponse.data;
      const selectedCategory = categories.find(cat => cat.name === category);
      if (!selectedCategory) throw new Error('קטגוריה לא נמצאה');

      let ticketTypeResponse;
      try {
        ticketTypeResponse = await axios.post('/TicketType/addTicketType', {
          name: category,
          category: selectedCategory._id,
        });
      } catch {
        console.log('Ticket type might already exist');
      }

      const ticketData = {
        title,
        description,
        priority,
        type: ticketTypeResponse?.data?._id || selectedCategory._id,
        createdBy,
        assignedTo: assignedTo || createdBy,
        fieldValues: Object.entries(categoryFields).map(([fieldName, value]) => ({
          fieldName,
          value,
        })),
      };

      const response = await axios.post('/Ticket', ticketData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'שגיאה בשליחת הבקשה'
      );
    }
  }
);

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
        ...action.payload,
      };
    },
    setSelectedCategory: (state, action) => {
      const categoryName = action.payload;
      state.selectedCategory =
        state.categories.find(cat => cat.name === categoryName) || null;
      state.formData.category = categoryName;
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
      baseFields.forEach(field => {
        if (state.formData[field]) filledFields++;
      });
      categoryFieldNames.forEach(fieldName => {
        if (state.formData.categoryFields[fieldName]) filledFields++;
      });

      const progress = (filledFields / allRequiredFields.length) * 100;
      state.currentStep = progress === 100 ? 2 : progress >= 50 ? 1 : 0;
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
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(submitNewRequest.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
        state.submitSuccess = false;
      })
      .addCase(submitNewRequest.fulfilled, (state) => {
        state.submitLoading = false;
        state.submitSuccess = true;
        state.formData = initialState.formData;
        state.selectedCategory = null;
        state.currentStep = 0;
      })
      .addCase(submitNewRequest.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setFormField,
  setCategoryFields,
  setSelectedCategory,
  setCurrentStep,
  calculateStep,
  resetForm,
  clearError,
  clearSubmitSuccess,
} = RequestSlice.actions;

export default RequestSlice.reducer;
