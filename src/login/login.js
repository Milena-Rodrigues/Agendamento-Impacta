import React, { useState } from "react";
import "./Login.css";
import { Circles } from "./circles";
import {
  LinearProgress,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import { findStoreByName } from "../service/login.service";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const initialSignupData = {
    nomeEstabelecimento: "",
    nomeProfissional: "",
  };
  const [loginData, setLoginData] = useState(initialSignupData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDataChange = ({ target }) => {
    const { name, value } = target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (e) => {
    setLoading(true);

    e.preventDefault();
    const confirmation = Promise.resolve(
      findStoreByName(loginData.nomeEstabelecimento)
    );
    confirmation
      .then((axios) => {
        setLoading(false);
        const alerta = !axios.data
          ? "Empresa não encontrada.\n\nPor favor verifique seus dadoe e tente novamente."
          : "Empresa encontrada com sucesso,\nPor favor aguarde";
      })
      .catch((error) => {
        setLoading(false);
        alert("Erro ao procurar a empresa.");
        console.error("Erro ao procurar a empresa:", error);
      });
    sessionStorage.setItem("estabelecimento", loginData.nomeEstabelecimento);
    navigate(`/schedule`);
  };

  return (
    <>
      <Dialog
        open={loading}
        onClose={loading}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div style={{ marginBottom: "20px" }}>
              Procurando Por favor aguarde...
            </div>
            <LinearProgress />
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <div className="background-schedule">
        <div className="align-background">
          <h1 className="text-background">
            TENHA MAIS CONTROLE NO AGENDAMENTO DE CLIENTES
          </h1>
          <div className="box-login">
            <form className="form-login" onSubmit={handleLogin}>
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
              <button type="submit" className="button-login">
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
    </>
  );
};

export default Login;
