import styled from "styled-components"
import samurai from "../assets/icons8-samurai-64.png"

export default function Logo() {
    return (
        <LogoCont>
            <Text> GetSamurais </Text>
            <img src={samurai} alt="Logo GetSamurais" title="Bem vindo ao GetSamurais" />
        </LogoCont>
        
    )
}
const LogoCont = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const Text = styled.h1`
    font-family: 'Outfit', cursive;
    font-weight: 700;
    font-size: 32px;
    color: #ec6f66;
`

