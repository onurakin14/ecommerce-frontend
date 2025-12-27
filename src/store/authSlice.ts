import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


/* ================== LOGIN ================== */
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

      if (!res.ok) {
        return thunkAPI.rejectWithValue("Invalid credentials");
      }

      const data = await res.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Login failed");
    }
  }
);
export const ADMIN_USERS = [
  "michaelw",
  "admin",
];

/* ================== TYPES ================== */
interface AuthUser {
  id: number;
  username: string;
  email?: string;
  role: "admin" | "user";
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  loading: boolean;
}

/* ================== INITIAL STATE ================== */
const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");

const initialState: AuthState = {
  token: savedToken ?? null,
  user: savedUser ? JSON.parse(savedUser) : null,
  loading: false,
};

/* ================== SLICE ================== */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      /* -------- LOGIN -------- */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        const isAdmin = ADMIN_USERS.includes(action.payload.username);

        const user: AuthUser = {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          role: isAdmin ? "admin" : "user",
        };

        state.user = user;
        state.token = action.payload.accessToken;

        // 🔐 PERSIST
        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(user));
      })

      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
