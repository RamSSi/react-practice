> 2022-12-26

<img src="./readme/2022-12-26.png" alt="1226" />

<br>

# React 동작 원리
리액트의 주요 파일 : index.js, index.html, App.js

- index.js에서 root 요소를 생성하여 index.html에서 보여줄 페이지를 구성
- index.html : 리액트가 SPA 개발에 사용되는 이유는 index.html 문서 하나로 모든 웹 페이지를 표현할 수 있기 때문
- App.js : 모든 컴포넌트를 담는 그릇, 리액트의 컴포넌트 트리는 App 컴포넌트로부터 시작

<br>

# Props를 통한 컴포넌트 간 데이터 전달
- props는 properties를 의미하며 보통 props라는 이름으로 사용
- props는 상위 컴포넌트로부터 전달된 properties들을 담는 객체
- 하위 컴포넌트에서 속성값을 얻고자 할 때 "props.속성명"으로 사용

<br>

---

> 2022-12-28

<br>

# 컴포넌트
리액트는 다양한 컴포넌트(함수)가 반환하는 요소를 렌더링 하는 원리를 이용한 컴포넌트들의 결합을 통해 사용자 인터페이스를 구현하는 라이브러리이다.

컴포넌트들로 구성된 페이지를 크롬의 개발자 도구에서 확인하면 사용자 정의 컴포넌트의 모습은 확인할 수 없다. 그 이유는 결국 사용자 정의 컴포넌트도 기본 컴포넌트로 구성되기 때문이다.

<br>

---

> 2023-01-01

<br>

# 이벤트 리스너
```
function func_name(props) {

    const clickHandler = () => {
        console.log("Clicked!");
    }

    return (
        <button onClick={clickHandler}>
            Change Title
        </button>
    );
}
```
## 이벤트 리스너 추가 방법
1. 이벤트 리스너 함수를 작성한다.
2. 이벤트에 대한 props에서 함수를 호출하지 않고 함수 이름만 지정한다.

> 만약 함수를 호출(함수이름 + "`()`")한다면 jsx 코드가 컴파일 될 때(렌더링인가...) 함수가 실행되기 때문에 이벤트가 발생했을 때에는 반응이 없을 것이다. 

<br>

## 이벤트 리스너 함수명
> 이벤트 종류 + ... + Handler 

필수는 아니고 이렇게 하면 좋다~ (권장)

<br>

# State

## 독립적인 state 선언
```
const [enteredTitle, setEnteredTitle] = useState("");
const [enteredAmount, setEnteredAmount] = useState();
const [enteredDate, setEnteredDate] = useState("");

setEnteredTitle("Hello");
...
```


## state 그룹
```
const [userInput, setUserInput] = useState({
    enteredTitle: '',
    enteredAmount: '',
    enteredDate: ''
});

setUserInput({
    ...userInput,
    enteredTitle: e.target.value
});
...
```
하나의 상태 업데이트 함수에 의존하여 상태를 변경하기 때문에 이전 상태의 스냅샷에 의존하게 된다.