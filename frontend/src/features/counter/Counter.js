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

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value" //+ 버튼
          onClick={() => dispatch(increment())} //클릭하면 increment가 동작하여 중간의 숫자가 +1된다.
        >
          +
        </button>
        <span classname={styles.value}>{count} </span> 
        <button
          className={styles.button}
          aria-label="Decrement value" //-버튼
          onClick={() => dispatch(decrement())} //클릭하면 decrement가 동작하여 중간의 숫자가 -1된다.
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
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
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