import MePage from "./pages/MePage";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { createContext, useState } from "react";
import ServiceIdPage from "./pages/ServiceIdPage";
import CreateServicePage from "./pages/CreateServicePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const UserContext = createContext();

export default function App() {
  let [UserData, SetUserData] = useState(null);

  return (
    <UserContext.Provider value={{UserData, SetUserData}}>
      <PagesContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/SignUp" element={<SignUpPage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/service/create" element={<CreateServicePage />} />
            <Route path="/service/:id" element={<ServiceIdPage />} />
            <Route path="/profile/me" element={<MePage />} />
          </Routes>
        </BrowserRouter>
      </PagesContainer>
    </UserContext.Provider>
  );
}

const PagesContainer = styled.main`
  background-color: red;
  background-image: linear-gradient(180deg, #ffd89b , #ec6f66);
  min-width: 100vw;
  height: 100vh;
  padding: 10px;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: white;
  }
  ::-webkit-scrollbar-thumb {
    background: lightgray;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: gray;
  }
`;
