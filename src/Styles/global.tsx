import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
html {
font-size: 100%;
    @media screen and (max-width:820px) {
        font-size: 80%;
    } // 820너비 지점에서 fon-size 변경
}

body {
    padding: 0;
    margin: 0;
}

* {
    box-sizing: border-box;
    border: none;
    outline: none;
    list-style: none;
    -webkit-tap-highlight-color : transparent; // 모바일에서 클릭 시 하이라이트 제거
}

h1 {
    font-family: 'Noto Sans KR', sans-serif;
    font-size:${({ theme }) => theme.FONT_SIZE.huge};
}

h2 {
    font-family: 'Noto Sans KR', sans-serif;
    font-size:${({ theme }) => theme.FONT_SIZE.big};
}

h3 {
    font-family: 'Noto Sans KR', sans-serif;
    font-size:${({ theme }) => theme.FONT_SIZE.large};
}

h4, li {
    font-family: 'Noto Sans KR', sans-serif;
    font-size:${({ theme }) => theme.FONT_SIZE.medium};
}
h5 {
    font-family: 'Noto Sans KR', sans-serif;
    font-size:${({ theme }) => theme.FONT_SIZE.small};
}

p {
    font-family: 'Noto Sans KR', sans-serif;
    font-size:${({ theme }) => theme.FONT_SIZE.tiny};
}
div {
    font-family: 'Noto Sans KR', sans-serif;
}

// 브라우저 별 기본 효과 제거
input, textarea, button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border-radius: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
}

input:focus{
	outline:none;
}
`
