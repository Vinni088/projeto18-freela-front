import axios from "axios";
import LOGO from "../components/Logo";
import styled from "styled-components";
import { UserContext } from "/src/App.jsx";
import HeaderSite from "../components/Headers";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

export default function CreateServicePage() {

    let [serviceTitle, setserviceTitle] = useState("");
    let [serviceDescription, setserviceDescription] = useState("");
    let [price, setPrice] = useState("");
    let [priceDescription, setpriceDescription] = useState("");
    let [photoUrl, setPhotoUrl] = useState("");
    let [visivel, setVisivel] = useState(false);
    const User = useContext(UserContext).UserData;
    const setUser = useContext(UserContext).SetUserData;
    const url = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();


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
    }, []);

    function Cadastro(e) {
        e.preventDefault();
        requisição();
    }

    function requisição() {
        if (
            serviceTitle === "" || serviceDescription === "" ||
            price === "" || priceDescription === "" || photoUrl === "" 
        ) {
            return alert("Todos os campos devem estar preenchidos")
        }
        if(isNaN(price)) {
            return alert("o preço deve ser um numero")
        }
        let novoServiço = {
            serviceTitle,
            serviceDescription,
            price: Number(price) * 100,
            priceDescription,
            photoUrl,
            isActive: true
        };
        
        

        const chave = { headers: { Authorization: `Bearer ${User.token}` } };

        const post = axios.post(`${url}/jobs`, novoServiço, chave);

        setVisivel(true)
        post.then(() => {
            alert("Oferta de Serviço registrada!")
            navigate("/")
        });
        post.catch((resposta) => {
            alert(
                `Houve um problema com seu cadastro: ${resposta.response.data}`
            );
            setVisivel(false)
            console.log(resposta);
        });
    }

    if (!User) {
        return (
            <AddServiceLoading>
                <HeaderSite />
                <Loading>{<ThreeDots width={"150px"} color="#FFFFFF" />}</Loading>
            </AddServiceLoading>
        );
    }
    return (
        <AddServiceContainer>
            <HeaderSite/>
            <FormSignup onSubmit={Cadastro}>
                <InputSignup
                    placeholder="Titulo do serviço"
                    type="text"
                    value={serviceTitle}
                    onChange={(e) => setserviceTitle(e.target.value)}
                />
                <InputHint>
                    Exemplo: Aulas de Karatê
                </InputHint>

                <InputSignup
                    placeholder="Descrição"
                    type="text"
                    value={serviceDescription}
                    onChange={(e) => setserviceDescription(e.target.value)}
                />
                <InputHint>
                    Exemplo: As aulas serão ministras de forma...
                </InputHint>

                <InputSignup
                    placeholder="Preço"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <InputHint>
                    Em reais, como por exemplo: 25.50
                </InputHint>

                <InputSignup
                    placeholder="Unidade de trabalho"
                    type="text"
                    value={priceDescription}
                    onChange={(e) => setpriceDescription(e.target.value)}
                />
                <InputHint>
                    Por qual unidade de trabalho voce cobrará? Exemplo: hora, dia, unidade de produto produzida...
                </InputHint>

                <InputSignup
                    placeholder="Deixe a Url de uma imagem que ilustre este serviço"
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                />
                <InputHint>
                    https://FotoDaAulaDeKaratê.com.jpg
                </InputHint>

                <button type="submit">Cadastrar Serviço </button>
            </FormSignup>
            {<ThreeDots height={"40"} color="#FFFFFF" visible={visivel} />}

        </AddServiceContainer>
    );
}

const AddServiceLoading = styled.section`
  display: flex;
  flex-direction: column;
  padding: 15px;
  height: 100%;
`;

const AddServiceContainer = styled.section`

  display: flex;
  flex-direction: column;
  margin: 15px;
  height: 100%;
  
  /*max-width: 90vw;
  margin: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;*/
`;

const FormSignup = styled.form`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
  border-radius: 5px;
`
const InputSignup = styled.input`
  font-size: 20px;
  width: 40%;
  border-radius: 10px;
  outline: none;
  border: 1px solid #ccc;
  padding: 15px;
  margin: 1px;
  :focus {
      border: 2px solid #ffb6b6;
      margin: 0px;
  }
`
const InputHint = styled.div`
  overflow: hidden;
  font-size: 20px;
  width: 40%;
  border-radius: 10px;
  outline: none;
  background-color: white;
  border: 1px solid #ccc;
  padding: 15px;
  margin: 1px;
  :focus {
      border: 2px solid #ffb6b6;
      margin: 0px;
  }
`
const Loading = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;