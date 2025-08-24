import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ticketsAPI } from '../../services/api';

const initialState = {
  tickets: [],
  currentTicket: null,
  loading: false,
  error: null,
  filters: {
    status: null,
    priority: null,
    category: null,
    search: '',
  },
};

// Async thunks
export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ticketsAPI.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch tickets');
    }
  }
);

export const fetchTicketById = createAsyncThunk(
  'tickets/fetchTicketById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await ticketsAPI.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch ticket');
    }
  }
);

export const createTicket = createAsyncThunk(
  'tickets/createTicket',
  async (ticketData, { rejectWithValue }) => {
    try {
      const response = await ticketsAPI.create(ticketData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create ticket');
    }
  }
);

export const updateTicket = createAsyncThunk(
  'tickets/updateTicket',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await ticketsAPI.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update ticket');
    }
  }
);

export const updateTicketStatus = createAsyncThunk(
  'tickets/updateTicketStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await ticketsAPI.setStatus(id, status);
      return { id, status, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update status');
    }
  }
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearCurrentTicket: (state) => {
      state.currentTicket = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tickets
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
        state.error = null;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch ticket by ID
      .addCase(fetchTicketById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicketById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTicket = action.payload;
        state.error = null;
      })
      .addCase(fetchTicketById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create ticket
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets.unshift(action.payload);
        state.error = null;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update ticket
      .addCase(updateTicket.fulfilled, (state, action) => {
        const index = state.tickets.findIndex(ticket => ticket._id === action.payload._id);
        if (index !== -1) {
          state.tickets[index] = action.payload;
        }
        if (state.currentTicket?._id === action.payload._id) {
          state.currentTicket = action.payload;
        }
      })
      // Update ticket status
      .addCase(updateTicketStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const ticket = state.tickets.find(ticket => ticket._id === id);
        if (ticket) {
          ticket.status = status;
        }
        if (state.currentTicket?._id === id) {
          state.currentTicket.status = status;
        }
      });
  },
});

export const { clearError, setFilters, clearFilters, clearCurrentTicket } = ticketsSlice.actions;
export default ticketsSlice.reducer;
