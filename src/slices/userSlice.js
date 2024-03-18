import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const userLogin=createAsyncThunk('loginuser',async(userCredentials,thunkApi)=>{
    let response=await axios.post('http://localhost:3000/users/login',userCredentials);
    let data=response.data;
    if(data.message==="Success"){
        localStorage.setItem('details',{token:data.payload,username:userCredentials.username,password:userCredentials.password});
        return data.userObject;
    }
    else if(data.message==="Invalid User" || data.message==="Incorrect Password"){
        return thunkApi.rejectWithValue(data);
    }
})

export const userReload=createAsyncThunk('pagereload',async(thunkApi)=>{
    let details=localStorage.getItem('details');
    console.log(details);
    if(details.token!==undefined){
    let response=await axios.post('http://localhost:3000/users/relogin',{username:details.username,password:details.password});
    let data=response.data;
    if(data.message==="Success"){
        localStorage.setItem('details',{token:details.token,username:details.username,password:details.password});
        return data.userObject;
    }
    else if(data.message==="Session Expired"){
        return thunkApi.rejectWithValue(data);
    }
}
})

export const userSlice=createSlice({
    name:'users',
    initialState:{
        userObject:{},
        userSuccess:false,
        userPending:false,
        userError:false,
        userErrorMsg:""
    },
    reducers:{
        clearLoginStatus:(state,action)=>{
            state.userObject={};
            state.userSuccess=false;
            state.userPending=false;
            state.userError=false;
            state.userErrorMsg="";
            return state;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(userLogin.pending,(state,action)=>{
            state.userObject=null;
            state.userSuccess=false;
            state.userPending=true;
            state.userError=false;
            state.userErrorMsg="";
        })
        .addCase(userLogin.fulfilled,(state,action)=>{
            state.userObject=action.payload;
            state.userSuccess=true;
            state.userPending=false;
            state.userError=false;
            state.userErrorMsg="";
        })
        .addCase(userLogin.rejected,(state,action)=>{
            state.userObject=null;
            state.userSuccess=false;
            state.userPending=false;
            state.userError=true;
            state.userErrorMsg=action.payload;
        })
        .addCase(userReload.pending,(state,action)=>{
            state.userObject=null;
            state.userSuccess=false;
            state.userPending=true;
            state.userError=false;
            state.userErrorMsg="";
        })
        .addCase(userReload.fulfilled,(state,action)=>{
            state.userObject=action.payload;
            state.userSuccess=true;
            state.userPending=false;
            state.userError=false;
            state.userErrorMsg="";
        })
        .addCase(userReload.rejected,(state,action)=>{
            state.userObject=null;
            state.userSuccess=false;
            state.userPending=false;
            state.userError=false;
            state.userErrorMsg="";
        })
    }
})

export const {clearLoginStatus}=userSlice.actions;
export default userSlice.reducer;