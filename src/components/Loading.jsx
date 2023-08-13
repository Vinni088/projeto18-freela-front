import styled from "styled-components"
import { ThreeDots } from "react-loader-spinner";

export default function LoadingGifDiv() {
    return (
        <LoadingDiv>
            {<ThreeDots width={"150px"} color="#FFFFFF" />}
        </LoadingDiv>
    )
}

const LoadingDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

