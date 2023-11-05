import axios from "axios";
const apiURL = "http://localhost:3000";

function generateUUID() {
  var d = new Date().getTime();
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

const generateStringSchedule = (date) => {
  const schedule = new Date(date).toISOString();
  return schedule.replace("Z", "");
};

export const findStoreByName = async (estabelecimento) => {
  const response = axios.get(
    `${apiURL}/Estabelecimento/getByName?estabelecimento=${estabelecimento}`
  );
  return response;
};
export const findAllStores = async () => {
  const response = axios.get(`${apiURL}/Estabelecimento/getAll`).then((res) => {
    return res;
  });
  return response;
};

export const addNewStore = async (data) => {
  const response = axios
    .post(`${apiURL}/Estabelecimento/addNewEstabelecimento`, data)
    .then((res) => {
      return res;
    });
  return response;
};
export const shutDownStore = async (storeId) => {
  const response = axios
    .put(`${apiURL}/Estabelecimento/DesativarEstabelecimento/${storeId}`, {})
    .then((res) => {
      return res;
    });
  return response;
};

export const getAllSchedules = async (data) => {
  const response = axios
    .get(`${apiURL}/Agendamento/getAll`, data)
    .then((res) => {
      return res;
    });
  return response;
};

export const addNewSchedule = async (data) => {
  data.idAgendamento = generateUUID();
  data.diaHoraAgendamento = generateStringSchedule(data.diaHora);
  const response = axios
    .post(`${apiURL}/Agendamento/addNewAgendamento`, data)
    .then((res) => {
      return res;
    });
  return response;
};

export const changeSchedule = async (id, data) => {
  const response = axios
    .put(`${apiURL}/Agendamento/alterarAgendamento/${id}?DataNova=${data}`)
    .then((res) => {
      return res;
    });
  return response;
};

export const shutDownSchedule = async (id) => {
  const response = axios
    .put(`${apiURL}/Agendamento/cancelarAgendamento/${id}`)
    .then((res) => {
      return res;
    });
  return response;
};
