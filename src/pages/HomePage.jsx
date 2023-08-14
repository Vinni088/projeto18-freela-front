import axios from "axios";
import HeaderSite from "../components/Headers";
import styled from "styled-components";
import { UserContext } from "/src/App.jsx";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

export default function HomePage() {
  /* Ferramentas da Página */
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const User = useContext(UserContext).UserData;
  const setUser = useContext(UserContext).SetUserData;
  let [Serviços, SetServiços] = useState([]);

  /* Dados externos iniciais: */
  useEffect(() => {
    let tokenSessao = localStorage.getItem("token");
    if (!tokenSessao) {
      return navigate("/");
    }
    if (tokenSessao && !User) {
      let promisse1 = axios.post(`${url}/logged`, { token: tokenSessao });

      promisse1.then((resposta) => {

        setUser({
          id: resposta.data.id,
          nome: resposta.data.name,
          email: resposta.data.email,
          token: resposta.data.token,
        });

      });
    }

    let promisse2 = axios.get(`${url}/jobs`);
    promisse2.then((resposta) => {
      console.log(resposta);
      SetServiços(resposta.data);
    });
  }, []);

  if (!User || !Serviços) {
    return (
      <HomeContainer>
        <HeaderSite />
        <Loading>{<ThreeDots width={"150px"} color="#FFFFFF" />}</Loading>
      </HomeContainer>
    );
  }

  if (User && Serviços) {
    return (
      <HomeContainer>
        <HeaderSite />
        <ServiceSpace>
          {Serviços.map(serviço => {
            if (serviço.isActive) {
              return (
                <ServiceDiv key={serviço.id} onClick={() => navigate(`/service/${serviço.id}`)}>
                  <h1>{serviço.serviceTitle}</h1>
                  <ServiceDesc>
                    <img src={serviço.servicePhoto} alt="" />
                    <div>
                      <span>Preço: {serviço.price / 100}R$/{serviço.priceDescription} </span>
                      <span>Prestador: {serviço.name} </span>
                    </div>
                  </ServiceDesc>
                </ServiceDiv>
              )
            }
          }
          )}
        </ServiceSpace>
      </HomeContainer>
    );
  }
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  height: 100%;
`;
const Loading = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ServiceDiv = styled.div`
  max-width: 600px;
  height: 200px;
  background: white;
  :hover {
    background: lightgray;
    cursor: pointer;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  border-radius: 20px;
  padding: 30px 15px;
  h1 {
    color: black;
    font-size: 18px;
    font-weight: 600;
  }
`
const ServiceDesc = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  img {
    width: 140px;
    height: 140px;
    border-radius: 20px;
  }
  div {
    padding-top: 20px;
    gap: 7.5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  
  span {
    color: black;
    font-size: 15px;
    font-weight: 300;
  }
`
const ServiceSpace = styled.div`
  display: flex;
  gap: 10px;
`