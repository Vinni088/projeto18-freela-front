import axios from "axios";
import styled from "styled-components";
import { UserContext } from "/src/App.jsx";
import HeaderSite from "../components/Headers";
import { ThreeDots } from "react-loader-spinner";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ServiceIdPage() {

    /* Ferramentas da Página */
    const params = useParams()
    const navigate = useNavigate();
    const url = import.meta.env.VITE_API_URL;
    const User = useContext(UserContext).UserData;
    const setUser = useContext(UserContext).SetUserData;
    let [Serviço, SetServiço] = useState([]);

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

        let promisse2 = axios.get(`${url}/jobs/${params.id}`);
        promisse2.then((resposta) => {
            console.log(resposta);
            SetServiço(resposta.data);
        });
    }, []);

    if (!User || !Serviço) {
        return (
            <ServiceContainer>
                <HeaderSite />
                <Loading>{<ThreeDots width={"150px"} color="#FFFFFF" />}</Loading>
            </ServiceContainer>
        );
    }

    if (User && Serviço) {
        return (
            <ServiceContainer>
                <HeaderSite />
                <ServiceSpace>
                    <ServiceDesc>
                        <Div1>
                            <h1>{Serviço.serviceTitle}</h1>
                            <img src={Serviço.servicePhoto} alt="" />
                        </Div1>
                        <Div2>
                            <h2> Informações do Serviço: </h2>
                            <span> Descrição do Provedor: </span>
                            <h3> {Serviço.serviceDescription} </h3>
                            <span> Precificação: </span>
                            <h3> {(Number(Serviço.price)/100).toFixed(2)}R$ por {Serviço.priceDescription} </h3>
                        </Div2>
                    </ServiceDesc>

                </ServiceSpace>
            </ServiceContainer>
        );
    }
}

const ServiceContainer = styled.div`
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
const ServiceSpace = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
  h1 {
    padding-left: 40px;
  }
`
const ServiceDesc = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`
const Div1 = styled.div`
    width: 300px;

    gap: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    
    h1 {
        max-width: 300px;
        overflow: hidden;
    }

    img {
    width: 300px;
    height: 300px;
    border-radius: 20px;
  }
`
const Div2 = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    span {
        color: gray;
        font-size: 20px;
        font-weight: 700;
    }
    h2 {
        color: white;
        font-size: 22px;
        font-weight: 700;
    }
    h3 {
        color: white;
        font-size: 18px;
        font-weight: 500;
    }
`