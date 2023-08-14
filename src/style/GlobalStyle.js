import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        box-sizing: border-box;
        transition: all 500ms;
    }
    button {
        outline: none;
        border: none;
        border-radius: 10px;
        background-color: white;
        font-size: 20px;
        font-weight: 600;
        color: black;
        cursor: pointer;
        width: 90%;
        padding: 12px;
        :hover {
            background-color: lightgray;
        }
    }
    h1 {
        font-weight: 700;
        font-size: 26px;
        color: white;
    }
    input {
        font-size: 20px;
        width: calc(100% - 30px);
        border-radius: 10px;
        outline: none;
        border: 1px solid #ccc;
        padding: 15px;
        margin: 1px;
        :focus {
            border: 2px solid #ffb6b6;
            margin: 0px;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;
        width: 100%;
        border-radius: 5px;
    }
    a {
        font-weight: 700;
        font-size: 20px;
        line-height: 18px;
        color: white;
        text-decoration: none;
        padding-top: 30px;
    }
`

export default GlobalStyle