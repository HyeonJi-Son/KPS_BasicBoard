import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css'; //styles 라는 이름으로 Counter.module.css의 요소들을 불러온다는 뜻 같다.
//그래서 아래 보면 스타일 들어가는 부분에 전부 styles.버튼 텍스트박스 등등 들어갈 수 있는 듯.

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  // reducer 함수는
    //state 데이터의 수정방법을 미리 정의하는 함수
    //function reducer(state = 초기값, 액션)
  
  // dispatch 함수는
    //HTML안에서 reducer 함수를 동작시킬 수 있음.
    //dispatch({type:데이터수정방법})

  return ( //div안은 HTML안으로 생각해야 하는구나.
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value" //+ 버튼
          onClick={() => dispatch(increment())} //클릭하면 counterSlice의 increment가 동작하여 중간의 숫자가 +1된다.
        >
          +
        </button>
        <span classname={styles.value}>{count} </span> 
        <button
          className={styles.button}
          aria-label="Decrement value" //-버튼
          onClick={() => dispatch(decrement())} //클릭하면 counterSlice의 decrement가 동작하여 중간의 숫자가 -1된다.
        >
          -
        </button>
      </div>

{/* 위는 + 0 - 형태로 되어있음. 아래는  네모박스 안에 숫자, Add Amount, Add Async 있음. */}


      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        /> {/* 기본 값으로 2가 들어있는 textbox. 왜 2가 들어있냐면 16번째 줄의 useState('숫자값') <-의 숫자값이다.
                수에 변동은 없고 add amount, add async를 클릭했을 때 '숫자값'만큼의 값이
                계산에 적용되도록 되어있음.*/}
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
            //클릭하면 counterSlice의 incrementByAmount가 작동된다. 
            //Number(incrementAmount) || 0 부분의 의미는 뭘까? 입력되어있는 '숫자값'이 없다면 0이 적용되도록?
                                  // ---- <- 이거 OR 이니까.
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
    </div>
  );
}