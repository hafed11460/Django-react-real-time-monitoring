import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import plcService from "./plcService";

export const getPlcs = createAsyncThunk(
    'plcs/',
    async () => {
        const res = await plcService.getPlcs()
        return res.data;
    })

export const createPlc = createAsyncThunk(
    'plcs/create',
    async (data) => {
        const res = await plcService.createPlc(data)
        return res.data;
    })

export const deletePlc = createAsyncThunk(
    'plcs/delete',
    async (plcId) => {
        await plcService.deletePlc(plcId)
        return plcId;
    })

export const updatePlc = createAsyncThunk(
    'plcs/update',
    async (plc) => {
        const res = await plcService.updatePlc(plc)
        return res.data;
    })



const initialState = {
    plcs: [],
    errors: null,
    postID: null,
    commentID: null,
    isLoading: false,
    isSuccess: false,
}

export const plcsSlice = createSlice({
    name: 'plcs',
    initialState,
    reducers: {
        setInitialiseState(state) {
            state.plcs = []
        },
    },
    extraReducers: {
        [getPlcs.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getPlcs.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.plcs = action.payload
        },
        [getPlcs.rejected]: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload;
        },

        /****** Create Post ******/
        [createPlc.pending]: (state, action) => {
            state.isLoading = true;
        },
        [createPlc.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true
            // state.posts.unshift(action.payload)
            state.plcs.push(action.payload)
        },
        [createPlc.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false
            state.errors = action.payload;
        },

        //*****  Delete Post */
        [deletePlc.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deletePlc.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true
            // state.posts = state.posts.filter(post => post.id !== action.payload)
            state.plcs = state.plcs.filter(plc => plc.id !== action.payload)
        },
        [deletePlc.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false
        },

        /****** Update  Post ******/
        [updatePlc.pending]: (state, action) => {
            state.isLoading = true;
        },
        [updatePlc.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true
            state.plcs.map(plc => {
                if (plc.id === action.payload.id) {
                   return  action.payload
                }
                return plc;
            });
        },
        [updatePlc.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false
            state.errors = action.payload;
        },
    }
})

export const {
    setcommentId,
    setInitialiseState,
} = plcsSlice.actions

export default plcsSlice.reducer