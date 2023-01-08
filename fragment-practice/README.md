> 2023-01-08

# JSX Limitations
## JSX 요소들이 인접해 있는 경우 에러 발생
▶ JSX에서는 하나의 루트 요소만 존재해야 함, 루트 수준에서 여러 JSX를 반환할 수 없음 

<br>
<img src="./readme/2023-01-08-jsx.png" />

- JSX 코드는 결국 JS의 react.createElement로 변환됨
- 실제로 자바스크립트에서 함수값을 반환할 때에도 하나의 값만을 반환할 수 있음

<br>

## Div Soup
실제 DOM으로 렌더링될 때 많은 컴포넌트들이 중첩될 수 있기 때문에 div 등의 요소로 감싸주어야 한다.
이러한 이유로 최종적으로 브라우저에서 보는 결과에 필요없는 div 태그가 매우 많아질 수 있다. jsx를 사용하기 위해서는 필요한 div이지만 semantic하지 못한 코드가 많아지게 된다.

<br>

## 해결 방법 : Wrapper
JSX의 규칙(하나의 루트 요소만 반환)을 만족하기 위한 wrap 요소로, div로 감쌀 필요 없이 wrapper로 감싸면 브라우저에 쓸모없는 코드가 나타나지 않음!

<br>

### Wrapper.js
```
const Wrapper = props => {
  return props.children;
}

export default Wrapper;
```
<br>

### 결과 코드
<img src="./readme/2023-01-08-jsx1.png" />

<br><br>

# Fragments
우리는 Wrapper 컴포넌트를 직접 만들지 않아도 된다. <strong>왜냐하면 리액트에서 제공해주니까!!!</strong>

<br>

## React fragment
<img src="./readme/2023-01-08-jsx2.png" />

``<Fragment></Fragment>`` 또는 ``<> </>``를 사용하면 실제 브라우저에는 나타나지 않지만 루트 요소로 반환이 가능하다. 불필요한 div 요소를 사용하지 않아도 된다는 뜻이다!

<br>

# Portals
## React Portals
우리는 모달을 직접 만들어 사용할 수 있다. 그러나 모달은 페이지에 직접적인 구조에 포함되지 않는 알림창일 뿐이다. 그래서 브라우저에 렌더링될 때 모달 요소를 볼 수 있는 코드는 좋은 코드로 취급되지 않는다.

- 스크린 리더가 모달을 중요한 내용으로 착각하고 의도하지 않은 순서로 읽어버릴 수도 있다.
- html 요소 안에 숨어서 어떤 요소로 인한 모달창인지 확인이 어려울 수 있다.

<br>

- 원하는 곳으로 컴포넌트를 이동시킬 수 있다. (portal)

### index.html
```
...
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  
  <div id="backdrop-root"></div>
  <div id="overlay-root"></div>
  <div id="root"></div>
  ...
</body>
```
<br>

### Portal
```
return (
  <React.Fragment>
    {ReactDOM.createPortal(
    <Backdrop onConfirm={props.onConfirm} />, 
    document.getElementById("backdrop-root")
  )}
  {ReactDOM.createPortal(
    <ModalOverlay 
      title={props.title} 
      message={props.message} 
      onConfirm={props.onConfirm} 
    />,
    document.getElementById("overlay-root")
  )}
  </React.Fragment>
);
```
<br>

# Ref

기존의 useState를 사용하여 input에 키보드를 누를 때마다 상태가 변경되었다.
```
<!-- useState -->
const [enteredUsername, setEnteredUsername] = useState('');
const [enteredAge, setEnteredAge] = useState('');

<!-- state 변경 (onChange) -->
const usernameChangeHandler = (event) => {
  setEnteredUsername(event.target.value);
};

const ageChangeHandler = (event) => {
  setEnteredAge(event.target.value);
};
```
<br>

## useRef

키를 누를 때마다 상태를 확인하고 변경하는 것은 매우 번거롭다.
Ref를 사용하면 현재 값을 바로 받아올 수 있다. 편리하다~

```
<!-- Ref 지정 -->
const nameInputRef = useRef();
const ageInputRef = useRef();

<!-- Ref 사용 -->
const enteredUsername = nameInputRef.current.value;
const enteredAge = ageInputRef.currentvalue;
```

<br>

