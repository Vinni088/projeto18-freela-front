import Logo from "../components/Logo";
import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderSite() {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <DivHeader>
        <Logo />
        <Pointer>
          <BiExit color="#ec6f66" title="Fazer Logout"
            onClick={() => {
              navigate("/");
              localStorage.removeItem("token");
            }}
          />
        </Pointer>
      </DivHeader>
      <DivHeader>
        <Link to={"/profile/me"}> Meu Perfil </Link>
        <Link to={"/home"}> Home </Link>
        <Link to={"/service/create"}> Adicionar Serviço </Link>
      </DivHeader>
    </HeaderContainer>
  );
}

const DivHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
  a {
    text-align: center;
    color: #ec6f66;
    width: 170px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    padding-top: unset;
    :hover {
      border: solid 1px #ec6f66;
    }
  }
`;
const Pointer = styled.div`
  cursor: pointer;
`;
const HeaderContainer = styled.div`

`