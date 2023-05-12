import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export interface IInitialStateKiosk {
  kioskList: IKiosk[];
  loading: boolean;
  loadingCreate: boolean;
  selectedKiosk?: IKiosk | undefined;
}

interface IError {
  message: string;
  status: string;
}

interface IKiosk {
  description: string;
  serialKey: string;
  url: string;
  onSuccess?: () => void;
  onError?: (err: IError) => void;
  id?: string;
  isKioskClosed: boolean;
}

const kioskList: IKiosk[] = [];

export const initialState: IInitialStateKiosk = {
  kioskList: [...kioskList],
  loading: false,
  loadingCreate: false,
  selectedKiosk: undefined,
};

export const getKiosks = createAsyncThunk("get/kiosk", async () => {
  try {
    const res = await api.get("/kiosk");
    return res;
  } catch (err) {
    console.log(err);
  }
});

export const deleteKiosk = createAsyncThunk(
  "delete/kiosk",
  async (data: { id: string; onSuccess: () => void }) => {
    try {
      const res = await api.delete(`/kiosk/${data.id}`);

      if (data.onSuccess) data.onSuccess();

      return res;
    } catch (err) {
      console.log(err);
    }
  }
);

export const createKiosk = createAsyncThunk(
  "create/kiosk",
  async (data: IKiosk) => {
    try {
      const res = await api.post("/kiosk", data);
      if (data.onSuccess) data.onSuccess();
      return res;
    } catch (err: any) {
      if (data.onError) data.onError(err?.response?.data);
    }
  }
);

export const editKiosk = createAsyncThunk(
  "posts/kiosk",
  async (data: IKiosk) => {
    const res = await api.put(`/kiosk/${data.id}`, {
      ...data,
      id: undefined,
    });
    if (data.onSuccess) data.onSuccess();
    return res;
  }
);

const kioskSlice: any = createSlice({
  name: "kiosks",
  initialState: initialState,
  reducers: {
    selectKiosk: (state, action) => {
      state.selectedKiosk = action.payload;
    },
    setLoading: (state, action) => {
      state.loadingCreate = action.payload;
    },
    openOrClose: (state, action) => {
      for (let i = 0; i < state.kioskList.length; i++) {
        if (action.payload.open.includes(state.kioskList[i].id))
          state.kioskList[i].isKioskClosed = false;

        if (action.payload.closed.includes(state.kioskList[i].id))
          state.kioskList[i].isKioskClosed = true;
      }
    },
  },
  extraReducers: {
    [getKiosks.pending as any]: (state: IInitialStateKiosk) => {
      state.loading = true;
    },
    [getKiosks.fulfilled as any]: (state: IInitialStateKiosk, action: any) => {
      state.loading = false;
      state.kioskList = action.payload.data;
    },
    [getKiosks.rejected as any]: (state: IInitialStateKiosk, action: any) => {
      state.loading = false;
    },
    [createKiosk.pending as any]: (state: IInitialStateKiosk) => {
      state.loadingCreate = true;
    },
    [createKiosk.fulfilled as any]: (
      state: IInitialStateKiosk,
      action: any
    ) => {
      state.loadingCreate = false;
    },
    [createKiosk.rejected as any]: (state: IInitialStateKiosk, action: any) => {
      state.loadingCreate = false;
    },
    [editKiosk.pending as any]: (state: IInitialStateKiosk) => {
      state.loadingCreate = true;
    },
    [editKiosk.fulfilled as any]: (state: IInitialStateKiosk, action: any) => {
      state.loadingCreate = false;
    },
    [editKiosk.rejected as any]: (state: IInitialStateKiosk, action: any) => {
      state.loadingCreate = false;
    },
    [deleteKiosk.pending as any]: (state: IInitialStateKiosk) => {
      state.loading = true;
    },
    [deleteKiosk.fulfilled as any]: (
      state: IInitialStateKiosk,
      action: any
    ) => {
      state.loading = false;
    },
    [deleteKiosk.rejected as any]: (state: IInitialStateKiosk, action: any) => {
      state.loading = false;
    },
  },
});

export const {
  setLoginData,
  setRegisterData,
  selectKiosk,
  setLoading,
  openOrClose,
} = kioskSlice.actions;

export default kioskSlice.reducer;
