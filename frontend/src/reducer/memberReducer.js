import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//import axios from 'axios';

const memberSlice = createSlice({
    name: 'member',
    initialState: {
        members: [], //배열로 들어옴
        member: null, //객체로 들어옴
        checkedMail: false,
        checkedLogIn: false, //기본값 false
    },
    reducers: {
        setMembers: (state = this.initialState, action) => {
            state.members = [...action.payload] //배열로 들어오는 형태   
        },
        setMember: (state, action) => {
            state.member = {...action.payload} //객체로 들어오는 형태
        },
        setEmailChecked: (state, action) => {
            state.checkedMail = action.payload;
        },
        setLoginChecked: (state, action) => {
            state.checkedLogIn = action.payload;
        },
        logout: (state, action) => {
            state.checkedLogIn = action.payload;
        }
    },
});

export const {setEmailChecked, setLoginChecked, logout} = memberSlice.actions;
//memberSlice.reducer를 다른 곳에서도 사용할 수 있도록 export 달아주었음.
export default memberSlice.reducer;

//회원가입 reducer의 기본적인 형식은 게시글 등록과 같다.
export const signUp = (data) => () => {
    const send = {...data, role: 2}
    //role 1은 관리자, 2는 일반회원으로 설정하려고 한다.
    //가입은 일반 회원만 하는 거니까 무조건 role:2로 값을 넣어주면 될 듯.
    console.info("회원가입시도", send);

    axios
        .post('member', send) //postMapping 타고 가게 될 것임.
        .then((result) => {
            alert("회원 가입 성공!")
            window.location = '/'; //로그인 페이지로 이동
        }, (error) => {
            console.error(error);
        })
}

export const emailCheck = (data) => (dispatch) => {
    axios
        .post('member/emailCheck', data)
        .then(result => {
            if(!result.data) {
                alert("이메일 중복");
                dispatch(setEmailChecked(false))
                return;
            }
            dispatch(setEmailChecked(true))
            alert("이메일 사용 가능!")
            return;
        }, error => {
            console.log(error.message);
        })
}

export const logIn = (data) => (dispatch) => {
    axios
        .post('member/login', data)
        .then(result => {
            console.info("TOKEN", result.data)
            console.log("LoginChecked 로그인 전: ", memberSlice.checkedLogIn )
            if(!result.data) { //null이 들어온 경우
                dispatch(setLoginChecked(false))
                alert("잘못된 Email 주소 혹은 비밀번호 입니다.");
                return;
            }
            //발급받은 token을 어떻게 저장할까 <- backend단 쿠키에 저장했다.
            dispatch(setLoginChecked(true))
            alert("로그인 성공!");
            // window.location = //로그인 성공하면 list페이지로 진입
            console.log("LoginChecked 로그인 후: ", memberSlice.checkedLogIn )
        }, error => {
            console.log(error.message);
        })
}

// export const logOut = () => (dispatch) => {
//     dispatch(setLoginChecked(false));
// }