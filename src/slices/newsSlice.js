import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

export const getNews=createAsyncThunk('getnews',async(query,thunkApi)=>{
    let id=query.id;
    console.log(id);
    let response=await axios.get(`http://localhost:3000/news/getnews/${id}`);
    let data=response.data;
    if(data.message==="Success"){
        return data.payload;
    }
    else 
    return thunkApi.rejectWithValue(data);
})

export const newsSlice=createSlice({
    name:'news',
    initialState:{
        newsArray:[],
        newsSuccess:false,
        newsPending:false,
        newsError:false,
        newsErrorMsg:""
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getNews.pending,(state,action)=>{
            state.newsArray=[];
            state.newsSuccess=false;
            state.newsPending=true;
            state.newsError=false;
            state.newsErrorMsg="";
        })
        .addCase(getNews.fulfilled,(state,action)=>{
           state.newsArray=action.payload;
            state.newsSuccess=true;
            state.newsPending=false;
            state.newsError=false;
            state.newsErrorMsg="";
        })
        .addCase(getNews.rejected,(state,action)=>{
            state.newsArray=[];
            state.newsSuccess=false;
            state.newsPending=false;
            state.newsError=true;
            state.newsErrorMsg=action.payload;
        })
    }
})

export const {}=newsSlice.actions;
export default newsSlice.reducer;