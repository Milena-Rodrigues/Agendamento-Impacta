import React, { useState } from "react";
import "./Login.css";
import { addNewSchedule } from "../service/login.service";

const ClientForm = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const nomeEstabelecimento = queryParameters.get("estabelecimento")

  const initialScheduleData = {
    nomeCliente: "",
    nomeProcedimento: "",
    nomeEstabelecimento: nomeEstabelecimento,
    diaHora: "",
    statusAgendamento: 0
  };

  const [scheduleData, setScheduleData] = useState(initialScheduleData);


  const handleNewSchedule = () => {
    const confirmation = Promise.resolve(addNewSchedule(scheduleData));
    confirmation.then(() => {
      alert("Agendamento cadastrado com sucesso");
    }).catch((error) => { console.error(error) });
  };



  return (
    <div className="box-login" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h3>Agenda</h3>
      <label>
        Nome do Cliente
        <input
          name="nomeEstabelecimento"
          type="text"
          onChange={({ target }) => {
            setScheduleData({ ...scheduleData, nomeCliente: target.value })
          }}
        />
      </label>
      <label>
        Procedimento
        <input
          name="nomeProcedimento"
          type="text"
          onChange={({ target }) => {
            setScheduleData({ ...scheduleData, nomeProcedimento: target.value })
          }}
        />
      </label>
      <label>
        Dia/Hora
        <input
          name="nomeProfissional"
          type="datetime-local"
          onChange={({ target }) => {
            setScheduleData({ ...scheduleData, diaHora: target.value })
          }}
        />
      </label>

      <button className="button-login" onClick={handleNewSchedule}>
        Confirmar
      </button>

    </div>
  );
};

export default ClientForm;
