## 2022-12-26
<img src="./readme/2022-12-26.png" alt="1226" />

### React 동작 원리
리액트의 주요 파일 : index.js, index.html, App.js

- index.js에서 root 요소를 생성하여 index.html에서 보여줄 페이지를 구성
- index.html : 리액트가 SPA 개발에 사용되는 이유는 index.html 문서 하나로 모든 웹 페이지를 표현할 수 있기 때문
- App.js : 모든 컴포넌트를 담는 그릇, 리액트의 컴포넌트 트리는 App 컴포넌트로부터 시작

### Props를 통한 컴포넌트 간 데이터 전달
- props는 properties를 의미하며 보통 props라는 이름으로 사용
- props는 상위 컴포넌트로부터 전달된 properties들을 담는 객체
- 하위 컴포넌트에서 속성값을 얻고자 할 때 "props.속성명"으로 사용