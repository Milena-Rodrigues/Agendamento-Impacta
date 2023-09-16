import React, { useState } from "react";
import "./Login.css";
import { addNewStore } from "../service/login.service";
import { Circles } from "./circles";
import { Link } from "react-router-dom";

export const Signup = () => {
  const initialSignupData = {
    nomeEstabelecimento: "",
    nomeProfissional: "",
    ativo: "",
  };
  const [signupData, setSignupData] = useState(initialSignupData);

  const handleNewStore = () => {
    const confirmation = Promise.resolve(addNewStore(signupData));
    confirmation.then(() => {
      alert("Loja cadastrada com sucesso");
    });
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  return (
    <div className="background-schedule">
      <div className="align-background">
        <h1 className="text-background">
          TENHA MAIS CONTROLE NO AGENDAMENTO DE CLIENTES
        </h1>
        <div className="box-login">
          <form className="form-login" onSubmit={(e) => e.preventDefault()}>
            <h3>Cadastre-se</h3>
            <label htmlFor="nomeEstabelecimento">Nome da Empresa</label>
            <input
              name="nomeEstabelecimento"
              placeholder="Insira o nome da empresa"
              onChange={handleDataChange}
            />
            <label htmlFor="nomeProfissional">Nome do profissional</label>
            <input
              name="nomeProfissional"
              placeholder="Insira o seu profissional"
              onChange={handleDataChange}
            />

            <button
              type="submit"
              className="button-login"
              onClick={handleNewStore}
            >
              Cadastrar
            </button>
            <Link className="button-signup" to={"/login"}>
              <p> Voltar</p>
            </Link>
          </form>
        </div>
      </div>

      <Circles />
    </div>
  );
};

export default Signup;
