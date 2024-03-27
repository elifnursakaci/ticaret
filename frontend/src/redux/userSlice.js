import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: {},
  loading: false,
};

export const register = createAsyncThunk("register", async (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `http://localhost:4004/register`,
    requestOptions
  );
  return await response.json();
});
export const login = createAsyncThunk("login", async (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: data.email, password: data.password }),
  };

  const response = await fetch(`http://localhost:4004/login`, requestOptions);
  let res = await response.json();
  localStorage.setItem("token", res?.token);
  return res;
});

export const forgotPassword = createAsyncThunk("forgot", async (email) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  };
  const response = await fetch(
    "http://localhost:4000/forgotPassword",
    requestOptions
  );
  const res = await response.json();
  return res;
});

export const resetPassword = createAsyncThunk("reset", async (params) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: params.password }),
  };
  const response = await fetch(
    `http://localhost:4000/reset/${params.token}`,
    requestOptions
  );
  const res = await response.json();
  return res;
});

export const Profile = createAsyncThunk("Profile", async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:4004/me`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return await response.json();
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    });

    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    });

    builder.addCase(Profile.pending, (state, action) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(Profile.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(Profile.rejected, (state, action) => {
      state.loading = false;
      state.isAuth = false;
      state.user = action.payload;
    });

    builder.addCase(forgotPassword.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(resetPassword.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
