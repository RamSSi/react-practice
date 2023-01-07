> 2023-01-04

<br>

# 컴포넌트 스타일
- Conditional & Dynamic Styles
- Styled Components
- CSS Modules

<br>

## Conditional & Dynamic Styles
### 동적 인라인 스타일 설정
```
<label style={{color: isValid ? 'black' : 'red'}}>Label</label>
```
상태 변화를 통해 스타일이 동적으로 변경됨

<br>

### 동적 css 클래스 설정
```
<!-- JSX 코드 -->
<div className={`form-control ${isValid ? "" : "invalid"}`}>
  <label>Label</label>
  <input 
    type="text" 
  />
</div>

<!-- CSS 코드 -->
.form-control.invalid input {
  border-color: red;
  background-color: #ffd7d7;
}

.form-control.invalid label {
  color: red;
}
```

CSS 파일에 스타일이 지정된 선택자 (클래스, ID 등)의 중복으로 인해 의도하지 않은 스타일이 반영될 가능성이 있다.

이를 위해 styled component를 사용한다.

<br><br>

> 2023-01-06

<br>
## Styled Components
특정한 스타일이 첨부된 컴포넌트를 구축할 수 있도록 해주는 패키지
스타일이 첨부되는 컴포넌트에만 영향을 미치고 다른 컴포넌트에는 영향을 주지 않는다.

- 패키지 설치
```
npm install --save styled-components
```
<br>

### 사용 방법
- tagged template literal : 자바스크립트 기능

▶ button은 styled의 메소드 일종으로 괄호 대신 백틱을 사용

- button 메소드는 새로운 button 컴포넌트를 반환 (styled는 html 요소에 대한 메소드를 내장하고 있음)

<br>

- ```.button:focus``` 가상 선택자의 경우에는 `&` 기호를 사용하여 표현

- styled의 메소드를 통해 반환된 새 컴포넌트는 styled가 할당한 고유 클래스 명을 가지기 때문에 다른 컴포넌트에 영향을 주지 않는다!

- styled가 반환한 컴포넌트 역시 props를 전달하고, 전달받을 수 있기 때문에 유효성 검사를 통해 클래스를 추가하거나 삭제할 수 있다.

- styled 메소드 내에서 props를 사용할 수 있기 때문에 동적인 스타일링이 쉽게 가능하다.
```
<!-- JSX -->
<FormControl invalid={!isValid}>
...
</FormControl>


<!-- styled method -->
  border: 1px solid  ${props => props.invalid ? 'red' : '#ccc'};
  background-color: ${props => props.invalid ? '#ffd7d7' : 'transparent'};
```

<br><br>

