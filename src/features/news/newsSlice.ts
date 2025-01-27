import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


type Category = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

type News = {
  newsItems: newsObject[]
  sources: sourcesObject[]
}
type newsObject = {
  id: number
  api_source: string
  news_source: string
  section: string
  author: string
  title: string
  content: string
  url: string
  image_url: string
  published_at: string
  created_at: string
  updated_at: string
}
type sourcesObject = {
  id: number
  identification: string
  name: string
  description: string
  url: string
  category: string
  language: string
  country: string
  created_at: string
  updated_at: string
}

type newsReturned = {
  status: string
  message: string
  data: News
}

type InitialState = {
  loading: boolean;
  news: newsReturned | null;
  categories: Category[] | null;
  error: string;
};

const initialState: InitialState = {
  loading: false,
  news: null,
  categories: null,
  error: ''
};

// Helper function to get the current token
const getAuthToken = (): string | null => {
  try {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsedInfo = JSON.parse(userInfo);
      return parsedInfo?.data?.auth_token || null;
    }
    return null;
  } catch (error) {
    return null;
  }
};

// Create axios instance with dynamic auth header
const createApiInstance = () => {
  const token = getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }


  return axios.create({
    baseURL: 'http://localhost:9900/api/v1/admin',
    headers
  });
};

// Helper to handle API errors
const handleApiError = (error: any) => {
  if (error.response?.status === 401) {
    // Handle unauthorized access (invalid/expired token)
    localStorage.removeItem('userInfo');
  }
  throw error;
};

export const fetchNews = createAsyncThunk(
  'user/fetchNews',
  async ({ categoryName, author }: { categoryName?: string; author?: string }, { rejectWithValue }) => {
    try {
      const api = createApiInstance();
      const params = new URLSearchParams();
      if (categoryName) params.append('category', categoryName);
      if (author) params.append('author', author);      

      const response = await api.get(`/user-news?${params.toString()}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
      return rejectWithValue('Failed to fetch news');
    }
  }
);



export const addSources = createAsyncThunk(
  'user/addSources',
  async (name: string, { rejectWithValue }) => {
    try {
      const api = createApiInstance();
      const response = await api.get(`/add-sources/${name}`);
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      return rejectWithValue('Failed to add source');
    }
  }
);

export const fetchUserSources = createAsyncThunk(
  'user/fetchUserSources',
  async (_, { rejectWithValue }) => {
    try {
      const api = createApiInstance();
      const response = await api.get(`/sources`);
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      return rejectWithValue('Failed to get user sources');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'news/categories',
  async (_, { rejectWithValue }) => {
    try {
      const api = createApiInstance();
      const response = await api.get(`/categories`);
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      return rejectWithValue('Failed to get categories');
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearNews: (state) => {
      state.news = null;
      state.error = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, state => {
        state.loading = true;
        state.news = null;
        state.error = '';
      })
      .addCase(
        fetchNews.fulfilled,
        (state, action: PayloadAction<newsReturned>) => {
          state.loading = false;
          state.news = action.payload;
          state.error = '';
        }
      )
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.news = null;
        state.error = action.payload as string || 'Something went wrong';
      })
      .addCase(addSources.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(addSources.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(addSources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to add source';
      })
      .addCase(fetchUserSources.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchUserSources.fulfilled, (state, action: PayloadAction<newsReturned>) => {
          state.loading = false;
          state.news = action.payload;
          state.error = '';
        })
      .addCase(fetchUserSources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to add source';
      })
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
        state.error = '';
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.categories = null;
        state.error = action.payload as string || 'Failed to fetch categories';
      });
  }
});

export const { clearNews } = newsSlice.actions;
export default newsSlice.reducer;

