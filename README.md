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

