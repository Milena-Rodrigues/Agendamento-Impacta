import React, { useState } from "react";
import "./Login.css";
import { Circles } from "./circles";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Login = () => {
  const initialSignupData = {
    nomeEstabelecimento: "",
    nomeProfissional: "",
  };
  const [loginData, setLoginData] = useState(initialSignupData);

  const handleDataChange = ({ target }) => {
    const { name, value } = target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = (e) => {
    console.log("Login clicked!");
  };

  return (
    <div className="background-schedule">
      <div className="align-background">
        <h1 className="text-background">
          TENHA MAIS CONTROLE NO AGENDAMENTO DE CLIENTES
        </h1>
        <div className="box-login">
          <form className="form-login">
            <h3>Acesse sua agenda!</h3>
            <label>
              Nome da Empresa
              <input
                name="nomeEstabelecimento"
                value={loginData.nomeEstabelecimento}
                onChange={handleDataChange}
              />
            </label>
            <label>
              Nome do profissional
              <input
                name="nomeProfissional"
                value={loginData.nomeProfissional}
                onChange={handleDataChange}
              />
            </label>
            <button className="button-login" onClick={handleLogin}>
              Entrar
            </button>

            <Link className="button-signup" to={"/signup"}>
              <p> Cadastre sua empresa</p>
            </Link>
          </form>
        </div>
      </div>

      <Circles />
    </div>
  );
};

export default Login;
