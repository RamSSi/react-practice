
> 2023-01-09

<br>

# Reducer
리액트 개발자라면 꼭 알아야 하는 개념!
- Effects : Side Effect란?
- Reducers : Reducer가 있는 컴포넌트의 복잡한 state 관리 방법
- Context : 앱 수준, 즉 여러 개의 컴포넌트에 영향을 주는 state
  - 컴포넌트 간의 state 공유 및  state 업데이트를 쉽게 해주는 Context

<br>

## Side Effect
리액트의 역할
- JSX를 평가하고 렌더링 한다.
- State와 Props를 관리한다.
- 이벤트와 입력에 반응한다.
- State와 Props의 변화에 따라 컴포넌트를 재평가하고, 필요에 따라 실제 DOM을 조작한다. 

만약 서버와 통신할 때 Http 메시지를 전송해야 하지만, 이것은 리액트가 실행해야 하는 작업이 아니다. 리액트는 주로 UI를 렌더링하는 작업을 한다!

<br>

예를 들어 http 응답에 따라 어떤 state를 변경한다면 무한 루프에 빠질 수 있다. jsx 함수가 실행될 때마다 리퀘스트를 보내게 되면 리퀘스트에 대한 응답에 따라 state가 변경될 것이고, state가 변하면 jsx 함수가 재호출되기 때문이다.

또 다른 예로는 로그인 시 로컬 스토리지에 있는 정보를 받아서 state 값을 변경할 경우, 무한 루프에 빠질 가능성이 존재한다.
getItem을 통해 상태가 변경되면 App 컴포넌트 함수는 재실행되고, 또 getItem을 하게 될 것이다.

<br>

```
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

  if (storedUserLoggedInInformation === '1') {
    setIsLoggedIn(true);
  }
...
}
```

따라서 이러한 side effect를 위해 사용하는 리액트 훅을 사용해야 한다.

<br>

## useEffect
useEffect는 실행할 함수와 의존성 배열을 인수로 받는다.

함수는 의존성 배열이 변경될 때마다 실행된다. 따라서 side effect가 발생할 코드를 이 함수에 넣으면 된다.

의존성 배열은 함수를 실행할 dependency들이 저장되는 배열이다.

<br>

```
useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []
);
```
위 경우에는 처음 컴포넌트 함수가 실행될 때에만 딱 한 번 실행된다.

맨 처음에는 의존성이 아예 존재하지 않아 의존성 배열이 생겼을 때 실행되지만, 그 이후에는 의존성 배열의 변화가 없기 때문에 실행되지 않는다.

<br>

```
useEffect(() => {
    setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6
    );
  }, [enteredEmail, enteredPassword]
);
```
위 경우에는 입력받은 이메일과 비밀번호의 유효성을 검사하는 함수를 실행하기 위해 useEffect 훅을 사용한다.

이메일과 패스워드가 변경될 때마다 유효성 검사가 필요하기 때문에 의존성 배열에 enteredEmail, enteredPassword를 넣어준다.

<br>

>useEffect의 역할은 side effect를 처리하는 것이다.
<br>
side effect에는 http 요청이나 데이터 저장 등이 있지만, 이외에도 키 입력에 따른 유효성 평가, 업데이트 등도 포함된다.

<br>

그러나 키를 입력할 때마다 상태가 변경되고, useEffect의 함수를 실행하기를 원하지는 않을 것이다. 키를 입력할 때마다 서버에 http 요청을 보내야 한다면 대량의 트래픽이 발생할테니 말이다.

따라서 키를 입력할 때마다 상태를 변경하는 것이 아니라 사용자가 입력을 멈춘 시점에 입력 내용을 서버에 보내고 싶을 것이다. 이를 디바운싱(그룹화)이라고 한다. 

사용자가 타이핑을 중지하고 일정 시간 후에 입력 내용을 모아 서버로 보내기에 useEffect 훅을 사용할 수 있다!

<br>

### Clean Up 함수
```
useEffect(() => {
    setTimeout(() => {
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 500);

    return () => {};
  }, [enteredEmail, enteredPassword]
);
```
``setTimeout()``을 이용하여 키 입력이 멈추고 500ms 이후에 유효성 검사를 실행한다. 

만약 키 입력이 멈췄다가, 실행했다가, 멈췄다가, 실행했다가 를 반복하면 수많은 타이머가 겹쳐서 실행될 것이다. 이를 막기 위해 클린 업 함수를 사용한다.

useEffect가 return하는 함수를 클린 업 함수라고 하는데, 이 함수는 useEffect 함수가 실행되기 직전, 컴포넌트가 제거되기 직전에 실행된다. (useEffect가 처음 실행되기 적전에는 실행되지 않음)

따라서 이 함수를 통해 아직 끝나지 않은 타이머를 제거하고 가장 최근에 실행된 타이머만 500ms 이후 종료될 것이다.

<br>



> 2023-01-10

## useReducer

여러 개의 state, 여러 dependency들로 인해 사용 및 관리가 어려워지거나 오류가 발생할 수 있다. (버그가 생길 가능성이 있는 코드)

사용하기 어렵지만 상태 관리를 더욱 쉽게 만들어주는 ``useReducer``를 사용한다.

대부분의 경우에는 ``useState``를 사용하는 것이 좋지만 ``useReducer``를 사용해야 하는 복잡한 상황이 존재한다.

<br>

예를 들어 다른 state를 기반으로 state를 업데이트 하는 경우이다!
이 경우에는 두 가지 선택지가 있다.
1. 두 개의 state를 하나의 state로 만들어 관리한다. 
2. Reducer를 사용한다.

<br>

```
const [ state, dispatchFn ] = useReducer(reducerFn, initialState, initFn);
```
- state : 상태 스냅샷
- dispatchFn : 상태를 업데이트 할 수 있는 함수 (새로운 state 값 설정이 아닌 상태 업데이트 액션)
- reducerFn : 액션이 dispatch 될 때마다 리액트가 실행하는 reducer 함수
  - 리액트가 관리하는 최신의 state 스냅샷을 가져온다.
  - ``(prevState, action) => newState``
- initialState : 초기 상태

<br>

### 예. email, email 유효성 상태를 하나의 state로 관리하는 예제
```
<!-- useReducer 함수 정의 -->
const [emailState, dispatchEmail] = useReducer(emailReducer, {
  value: '',
  isValid: null
});

<!-- reducer 함수 정의 -->
const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@')};
  }

  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')};
  }
}

<!-- email 변경하는 action을 dispatch 하는 함수 -->
const emailChangeHandler = (event) => {
  dispatchEmail({type: 'USER_INPUT', val: event.target.value});
  ...
};

<!-- email의 유효성을 검사하는 action을 dispatch 하는 함수 -->
const validateEmailHandler = () => {
  dispatchEmail({type: 'INPUT_BLUR'});
};
```

<br>

### 리팩토링 해보기!
```
const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@')};
  }

  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')};
  }
}

const passwordReducer = (state, action) => {
  switch (action.type) {
    case 'USER_INPUT': 
      return {value: action.val, isValid: action.val.trim().length > 6};
  
    case 'INPUT_BLUR':
      return {value: state.value, isValid: state.value.trim().length > 6};

    default:
      return state;
  }
};
```

<br>

### 구조 분해 할당 (destructuring assignment)
객체나 배열을 변수로 분해할 수 있게 해주는 특별한 문법

```
<!-- 객체 디스트럭처링 -->
const { isValid: emailIsValid } = emailState;
// emailState라는 state 객체의 isValid 값을 emailIsValid라는 별칭으로 접근할 수 있다.

useEffect(() => {
    const tIdentifier = setTimeout(() => {
      console.log('valid?')
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      console.log('Clean Up');
      clearTimeout(tIdentifier);
    };
  }, [emailIsValid, passwordIsValid]
);
// useEffect의 종속성을 state 객체 내의 한 속성으로 지정하기 위해
```

<br>

## `useState()` vs `useReducer()`
### `useState()`
- 주요 state 관리 도구
- 개별 state 및 데이터를 다루기 쉬움
- state 개수가 적고 관리가 쉬울 경우 적합

### `useReducer()`
- state 객체나 복잡한 state들을 다루는데 적합
- 연관된 state로 구성된 state 관련 데이터를 다루는 경우 적합
- state를 변경하는 여러 action이 필요한 경우 적합

<br><br>

# Context
리액트에서는 부모-자식 간에만 props를 통해 데이터를 전달할 수 있다.

부모-자식 관계가 아닌 컴포넌트에게 데이터를 주거나 받기 위해서는 가장 가까운 부모 또는 자식을 통해야만 하기 때문에 복잡한 props chain이 형성된다.

이러한 문제를 해결하기 위해 context라는 저장소에서 원하는 데이터를 직접 받아올 수 있다.

## Context API
컨텍스트는 리액트가 내부적으로 state를 관리할 수 있는 저장소이다.

```
import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false
});

export default AuthContext;
```

로그인 여부 state를 관리하는 컴포넌트 AuthContext를 사용한다.

**Provider**

```
<AuthContext.Provider 
      value={{
        isLoggedIn: isLoggedIn
      }}
    >
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
```
Provider는 value로 관리하는 상태의 값을 가지고 있다.

AuthContext Provider 컴포넌트로 해당 컴포넌트에서 관리하는 state를 사용하는 컴포넌트를 감싸준다.

<br>

그렇다면 state를 사용하는 컴포넌트는 어떻게 설정해주어야 할까?
state를 사용하는 방법은 두 가지가 있다.

1. Consumer
```
<AuthContext.Consumer>
  {(ctx) => {
    return (
      <nav className={classes.nav}>
        <ul>
          {ctx.isLoggedIn && (
            <li>
              <a href="/">Users</a>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <a href="/">Admin</a>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <button onClick={props.onLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    );
  }}
</AuthContext.Consumer>
```

state를 사용하는 컴포넌트는 AuthContext Consumer 컴포넌트로 감싸준다.
Consumer 컴포넌트는 자식으로 함수를 갖게 되는데 이 함수는 state 정보를 인수로 가져와 사용한다.

<br>

2. ``useContext()``

```
const ctx = useContext(AuthContext);

return (
  <nav className={classes.nav}>
    <ul>
      {ctx.isLoggedIn && (
        <li>
          <a href="/">Users</a>
        </li>
      )}
      {ctx.isLoggedIn && (
        <li>
          <a href="/">Admin</a>
        </li>
      )}
      {ctx.isLoggedIn && (
        <li>
          <button onClick={props.onLogout}>Logout</button>
        </li>
      )}
    </ul>
  </nav>
);
```
``useContext()`` 훅을 사용하여 더욱 쉽게 state를 사용할 수 있다.

<br>

state 뿐만 아니라 함수를 전달할 수도 있다.

값을 설정하는 Provider에서 함수를 키-값으로 정의한다.

**Provider**
```
<AuthContext.Provider 
  value={{
    isLoggedIn: isLoggedIn,
    onLogout: logoutHandler
  }}
>
```

**Consumer**
```
{ctx.isLoggedIn && (
  <li>
    <button onClick={ctx.onLogout}>Logout</button>
  </li>
)}
```

<br>

## 한계
앱 또는 컴포넌트 전체에서 사용되는 state에는 적합하지만, 컴포넌트 자체의 props 생략 또는 상태 변화가 잦은 경우에는 적합하지 않음
- 1초에 한 번씩 상태가 바뀌는 것에 대해 리액트 컨텍스트는 적합하지 않아요!

그렇다면 앱 또는 컴포넌트 전체에 걸쳐 자주 변하는 state를 사용하는 경우에는 어떻게 하지?

**이 경우에는 Redux를 사용해야 합니다!**

너무 복잡하고 긴 props chain을 사용하지 않기 위해 context를 사용하는 것은 좋지만 무조건 props를 context로 바꾸어 사용하는 것은 안된다!!!

<br><br>

# Hook의 규칙

### 1. 리액트 훅은 리액트 컴포넌트 함수에서만 호출할 수 있다.
- 일반 함수(컴포넌트가 아닌 값을 반환하는 함수)에서 호출하지 말 것!

### 2. 리액트 훅은 사용자 정의 훅 함수의 최상위 수준에서만 호출할 수 있다.
- 중첩 함수 또는 Block 문에서 호출하지 말 것!

### 3. useEffect에서 참조하는 모든 항목을 의존성으로 useEffect에 추가해야 한다.