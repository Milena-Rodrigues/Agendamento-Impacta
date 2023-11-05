import React, { useState } from "react";
import "./Login.css";
import { addNewSchedule, changeSchedule } from "../service/login.service";

const ClientForm = (props) => {
  const nomeEstabelecimento = sessionStorage.getItem("estabelecimento");

  const initialScheduleData = {
    nomeCliente: "",
    nomeProcedimento: "",
    nomeEstabelecimento: nomeEstabelecimento,
    diaHora: props.diaHora || "",
    statusAgendamento: 0,
  };

  const [scheduleData, setScheduleData] = useState(initialScheduleData);

  const handleNewSchedule = () => {
    const confirmation = Promise.resolve(addNewSchedule(scheduleData));
    confirmation
      .then(() => {
        alert("Agendamento cadastrado com sucesso");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditSchedule = () => {
    const confirmation = Promise.resolve(
      changeSchedule(props.id, scheduleData.diaHora)
    );
    confirmation
      .then(() => {
        alert("Agendamento alterado com sucesso");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div
      className={props.className}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <label>
        Nome do Cliente
        <input
          disabled={props.id && true}
          defaultValue={props.id ? "Desabilitado" : ""}
          name="nomeEstabelecimento"
          type="text"
          onChange={({ target }) => {
            setScheduleData({ ...scheduleData, nomeCliente: target.value });
          }}
        />
      </label>
      <label>
        Procedimento
        <input
          disabled={props.id && true}
          defaultValue={props.id ? "Desabilitado" : ""}
          name="nomeProcedimento"
          type="text"
          onChange={({ target }) => {
            setScheduleData({
              ...scheduleData,
              nomeProcedimento: target.value,
            });
          }}
        />
      </label>
      <label>
        Dia/Hora
        <input
          name="nomeProfissional"
          type="datetime-local"
          defaultValue={props.data || props.diaHora}
          onChange={({ target }) => {
            console.log(`${target.value}:00`);
            setScheduleData({ ...scheduleData, diaHora: `${target.value}:00` });
          }}
        />
      </label>

      <button
        className="button-login"
        onClick={props.id ? handleEditSchedule : handleNewSchedule}
      >
        Confirmar
      </button>
    </div>
  );
};

export default ClientForm;
