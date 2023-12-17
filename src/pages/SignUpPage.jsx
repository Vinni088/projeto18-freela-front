import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import LOGO from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpPage() {
  let [nome, setNome] = useState("");
  let [email, setEmail] = useState("");
  let [senha, setSenha] = useState("");
  let [senha2, setSenha2] = useState("");
  let [phone, setPhone] = useState("");
  let [city, setCity] = useState("");
  let [state, setState] = useState("");
  let [visivel, setVisivel] = useState(false);
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  function Cadastro(e) {
    e.preventDefault();
    requisição();
  }

  function requisição() {
    if (senha !== senha2) {
      return alert("As senhas digitadas não coincidem.");
    }
    if (isNaN(phone) || phone.length < 8 || phone.length > 11) {
      return alert("Por favor insira um número válido entre 8 e 11 digitos")
    }

    let novoCadastro = {
      name: nome,
      email,
      password: senha,
      phone,
      city,
      state
    };

    const post = axios.post(`${url}/signup`, novoCadastro);
    setVisivel(true)
    post.then(() => navigate("/"));
    post.catch((resposta) => {
      alert(
        `Houve um problema com seu cadastro: ${resposta.response.data}`
      );
      setVisivel(false)
    });
  }

  return (
    <SingUpContainer>
      <LOGO />
      <FormSignup onSubmit={Cadastro}>
        <InputSignup
          placeholder="Nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <InputSignup
          placeholder="E-mail"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputSignup
          placeholder="Cidade"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <InputSignup
          placeholder="Estado"
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />


        <InputSignup
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <InputSignup
          placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
          value={senha2}
          onChange={(e) => setSenha2(e.target.value)}
        />

        <InputSignup
          placeholder="Telefone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </FormSignup>

      <Link to={"/"}>Já tem uma conta? Entre agora!</Link>

      {<ThreeDots height={"40"} color="#FFFFFF" visible={visivel} />}

    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
  padding-top: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
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
  width: calc(40%);
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