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

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    alert("Procurando\nPor favor aguarde...");

    const confirmation = Promise.resolve(
      addNewStore({
        nomeEstabelecimento:signupData.nomeEstabelecimento,
        nomeProfissional:signupData.nomeProfissional
      })
    );
    confirmation
      .then((axios) => {
        console.log(axios);
        const alerta = (!axios.data)  ? "Erro ao salvar.\n\nPor favor verifique seus dadoe e tente novamente."    : "Empresa salva com sucesso.";
        alert(alerta);
      })
      .catch((error) => {
        alert("Erro ao salvar a empresa.");
        console.error("Erro ao salvar a empresa:", error);
      });
  };


  return (
    <div className="background-schedule">
      <div className="align-background">
        <h1 className="text-background">
          TENHA MAIS CONTROLE NO AGENDAMENTO DE CLIENTES
        </h1>
        <div className="box-login">
          <form className="form-login" onSubmit={handleSignup}>
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
              onClick={handleSignup}
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
