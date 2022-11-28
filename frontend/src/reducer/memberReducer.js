import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
//import axios from 'axios';

const memberSlice = createSlice({
    name: 'member',
    initialState: {
        members: [], //배열로 들어옴
        member: null, //객체로 들어옴
    },
    reducers: {
        setMembers: (state, action) => {
            state.members = [...action.payload] //배열로 들어오는 형태   
        },
        setMember: (state, action) => {
            state.member = {...action.payload} //객체로 들어오는 형태
        }
    },
});

//memberSlice.reducer를 다른 곳에서도 사용할 수 있도록 export 달아주었음.
export default memberSlice.reducer;

//회원가입 reducer의 기본적인 형식은 게시글 등록과 같다.
export const signUp = (data) => () => {
    axios
        .post('member', data) //postMapping 타고 가게 될 것임.
        .then(() => {
            alert("회원 가입 성공!")
            window.location = '/'; //로그인 페이지로 이동
        }, (error) => {
            console.error(error);
        })
}