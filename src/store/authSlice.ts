// src/store/authSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { username, password }: { username: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) return thunkAPI.rejectWithValue("Invalid credentials");

      const data = await res.json();

      // LocalStorage'a kaydet
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data));

      // Navbar güncellensin
      window.dispatchEvent(new Event("authChanged"));

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Login failed");
    }
  }
);

// User Fetch kısmı
export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
});


interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
}

// İlk açılışta localStorage varsa çeksin
const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");

const initialState: AuthState = {
  token: savedToken ?? null,
  user: savedUser ? JSON.parse(savedUser) : null,
  loading: false,
};


// Slice kısmı
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("authChanged"));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (s) => { s.loading = true })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload;
        s.token = a.payload.accessToken;   // 🔥 kritik fix burası
      })
      .addCase(loginUser.rejected, (s) => {
        s.loading = false;
      })
      .addCase(fetchUser.fulfilled, (s, a) => {
        s.user = a.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
