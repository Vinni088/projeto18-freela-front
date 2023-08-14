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
    let [desabilitar1, setDesabilitar1] = useState(false)
    let [desabilitar2, setDesabilitar2] = useState(false)

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

    function contato() {
        setDesabilitar1(true)
        setTimeout(() => setDesabilitar1(false), 3000)
    }
    function rating() {
        setDesabilitar2(true);
        setTimeout(() => setDesabilitar2(false), 3000)
    }

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
                    <Div1>
                        <h1>{Serviço.serviceTitle}</h1>
                        <img src={Serviço.servicePhoto} alt="" />
                    </Div1>
                    <Div2>
                        <h2> Informações do Serviço: </h2>
                        <span> Descrição do Serviço: </span>
                        <h3> {Serviço.serviceDescription} </h3>
                        <span> Precificação: </span>
                        <h3> {(Number(Serviço.price) / 100).toFixed(2)}R$ por {Serviço.priceDescription} </h3>

                        <h2> Informações do provedor: </h2>
                        <h3>
                            <span> Nome: </span> {Serviço.serviceProvider}
                        </h3>
                        <h3>
                            <span> Email: </span> {Serviço.email}
                        </h3>
                        <h3>
                            <span> telefone: </span> {Serviço.phone}
                        </h3>
                        <h3>
                            <span> Localidade: </span> {Serviço.city} - {Serviço.state}
                        </h3>
                        

                    </Div2>
                </ServiceSpace>
                <ServiceSpace>
                    <button disabled={desabilitar1} onClick={() => contato()}> 
                        Vou entrar em contato! 
                    </button>
                    <button disabled={desabilitar2} onClick={() => rating()}> 
                        Já utilizei este serviço! 
                    </button>
                </ServiceSpace>
                <PopUp escondido={desabilitar1}>
                    Que bom! O GetSamurais Fica feliz em ajudar!
                </PopUp>
                <PopUp escondido={desabilitar2}>
                    Que bom! Futuramente vamos compilar os feedbacks sobre os serviços!
                </PopUp>
                {/*<FeedbackDiv escondido={desabilitar2}>
                    <form action="">
                        Poderia compartilhar numa escala de 1 a 5 como foi sua experiencia com este serviço?
                        <input type="text" />
                    </form>
        </FeedbackDiv>*/}
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
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  button {
    width: 30%;
  }
`
const Div1 = styled.div`
    width: 300px;

    gap: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    h1 {
        max-width: 300px;
        overflow: hidden;
        color: #ec6f66;
    }

    img {
    width: 300px;
    height: 300px;
    border-radius: 20px;
  }
`
const Div2 = styled.div`
    padding: 10px;
    min-width: 300px;
    min-height: 300px;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
        color: gray;
        font-size: 20px;
        font-weight: 700;
    }
    h2 {
        color: #ec6f66;
        font-size: 22px;
        font-weight: 700;
    }
    h3 {
        color: white;
        font-size: 18px;
        font-weight: 500;
        max-width: 300px;
    }
`
const FeedbackDiv = styled.div`
    padding: 20px;
    position: fixed;
    left: 20%;
    top: 20%;
    z-index: 3;
    background-color: white;
    border: 2px lightgray solid;
    border-radius: 20px;
    display: ${ props => props.escondido == true ? 'flex' : 'none'};
    width: 60%;
    height: 60%;
`
const PopUp = styled.div`
    width: 220px;
    height: 80px;
    
    position: fixed;
    top: 180px;
    right: ${ props => props.escondido == true ? '10px' : '-300px'};
    z-index: 3;

    background-color: white;
    border: 2px lightgray solid;
    border-radius: 20px;

    display: flex ;
    padding: 5px;
    justify-content: center;
    align-items: center;
`
/*right: ${ (propriedade) => {propriedade.escondido === true ? '10px' : '200px'}};*/