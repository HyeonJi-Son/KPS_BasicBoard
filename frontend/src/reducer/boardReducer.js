import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//TODO: slice
const boardSlice = createSlice({
    name: 'board',
    initialState: { //초기 값들.
        boards: [], //boards 배열이 들어옴.
        board: null,
        //그냥 객체가 들어올 때는 board: null이나 기본값.
    },
    reducers: { //state들의 값을 변경해주는 action. 
        setBoards: (state, action) => {
            state.boards = [...action.payload]
            //나중에 게시물들이 배열로 여러개 들어오기 때문에
            //객체가 아닌 배열 형태로 변경해줄 수 있다.
            //state.boards = [{...action.payload}] <-객체를 배열에 담은 형태
            //state.boards = [...action.payload] <- 배열로 들어오는 형태
        },
        setBoard: (state, action) => {
            state.board = {...action.payload}
        } 
    },
});

//export를 적는다는 것은 외부에서도 사용할 수 있도록 해준다는 뜻.
export default boardSlice.reducer;

//TODO: Actions
//다른 컴포넌트에서도 상태를 변경할 수 있도록 해주는 action 함수
export const findAllBoard = () => async (dispatch) => {
    const response = await axios.get('/basicBoard/list');

    //console.info("before", response.data);

    const data = response.data.map(item => {
        return {
            ...item,
            key: item.boardNo
        }
    });

    //console.info("after", data);

    dispatch(boardSlice.actions.setBoards(data));
}

                    // boardNo를 전달받음
export const readBoard = (boardNo) => async (dispatch) => { //list에서 boardReadPage로 이동한 다음 랜더 되기 전
    const response = await axios.get(`/basicBoard/${boardNo}`);
    dispatch(boardSlice.actions.setBoard(response.data))
}

export const registBoard = (data) => () => {
    axios
        .post('basicBoard', data) //PostMapping을 타고 감.
                                // ------- <-아까 호출해서 넣어준 data이다.
                                // + , 세번째는 옵션을 작성하게 됨.(지금은 생략)
        .then((result) => { //.then은 axios에서 통신이 끝나고 데이터를 받아오기까지 대기
            alert("게시글 등록 성공")
            const board = result.data;
            window.location = `/boardReadPage/${board.boardNo}`;
            // 1. '/boardReadPage/' + board.boardNo; 
            // 2. `/boardReadPage/${board.boardNo}`

        }, (error) => { //<-여기서 error는 함수 형태의 인자이다.
            console.error(error); //에러가 났을 때 사용하는 함수 형식
        })
}

export const boardPwCheck = (data) => () => {
    console.log(data);
    axios
        .post(`/basicBoard/pwCheck/${data.boardNo}`, {
            checkPw: data.checkPw
        })
        //post는 body를 담을 수 있으니까 data.checkPw로 보내보자
        .then(result => {
            if (!result.data) {
                alert("잘못된 비밀번호 입니다.");
                return;
            }

            alert("게시글 수정 페이지로 이동합니다.");
            window.location = `/boardModifyPage/${data.boardNo}`;
            sessionStorage.setItem('allowModify', true);
        }, error => {
            console.log(error.message);
        });
}

export const modifyBoard = (data) => () => {
    axios
        .put(`/basicBoard/${data.boardNo}`, data)
        .then(() => { //.then은 axios에서 통신이 끝나고 데이터를 받아오기까지 대기
            alert("게시글 수정 성공")
            window.location = `/boardReadPage/${data.boardNo}`;
            // 1. '/boardReadPage/' + board.boardNo; 
            // 2. `/boardReadPage/${board.boardNo}`

        }, (error) => { //<-여기서 error는 함수 형태의 인자이다.
            console.error(error); //에러가 났을 때 사용하는 함수 형식
        })
}

export const deleteBoard = (data) => () => {
    console.log(data);
    axios
        .delete(`/basicBoard/${data.boardNo}/${data.checkPw}`)
        .then(result => {
            if (!result.data) {
                alert("잘못된 비밀번호 입니다.");
                return;
            }
            
            alert("게시글이 삭제되었습니다.");
            window.location = "/boardListPage";
        }, error => {
            console.log(error.message);
        });
}