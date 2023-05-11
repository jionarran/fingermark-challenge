import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export interface IInitialStateKiosk {
  kioskList: IKiosk[];
  loading: boolean;
  loadingCreate: false;
  selectedKiosk?: IKiosk | undefined;
}

interface CustomError {
  message: string;
  response?: {
    status: number;
    data: any;
  };
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
      console.log("action", action);

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
    [getKiosks.pending as any]: (state: any) => {
      state.loading = true;
    },
    [getKiosks.fulfilled as any]: (state: any, action: any) => {
      state.loading = false;
      state.kioskList = action.payload.data;
    },
    [getKiosks.rejected as any]: (state: any, action: any) => {
      state.loading = false;
      state.message_error = "Ocorreu um erro ao listar companias";
    },
    [createKiosk.pending as any]: (state: any) => {
      state.loadingCreate = true;
    },
    [createKiosk.fulfilled as any]: (state: any, action: any) => {
      state.loadingCreate = false;
    },
    [createKiosk.rejected as any]: (state: any, action: any) => {
      state.loadingCreate = false;
      state.message_error = "Ocorreu um erro ao listar companias";
    },
    [editKiosk.pending as any]: (state: any) => {
      state.loadingCreate = true;
    },
    [editKiosk.fulfilled as any]: (state: any, action: any) => {
      state.loadingCreate = false;
    },
    [editKiosk.rejected as any]: (state: any, action: any) => {
      state.loadingCreate = false;
      state.message_error = "Ocorreu um erro ao listar companias";
    },
    [deleteKiosk.pending as any]: (state: any) => {
      state.loading = true;
    },
    [deleteKiosk.fulfilled as any]: (state: any, action: any) => {
      state.loading = false;
    },
    [deleteKiosk.rejected as any]: (state: any, action: any) => {
      state.loading = false;
      state.message_error = "Ocorreu um erro ao listar companias";
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
