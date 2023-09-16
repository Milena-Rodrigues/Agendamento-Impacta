import axios from "axios";
const auth = "83M01mhff1iaqKIq3nar3mFK393b019nmKkfomfc93m8aGqy2mcb5nMuMC4";
const apiURL = "localhost";
const config = {
  headers: {
    Authorization: auth,
  },
};

export const findStoreByName = async (estabelecimento) => {
  const response = axios
    .get(
      `${apiURL}/Estabelecimento/getByName?estabelecimento=${estabelecimento}`,
      config
    )
    .then((res) => {
      return res;
    });
  return response;
};

export const findAllStores = async () => {
  const response = axios
    .get(`${apiURL}/Estabelecimento/getAll`, config)
    .then((res) => {
      return res;
    });
  return response;
};

export const addNewStore = async (data) => {
  const response = axios
    .post(`${apiURL}/Estabelecimento/addNewEstabelecimento`, data, config)
    .then((res) => {
      return res;
    });
  return response;
};
export const shutDownStore = async (storeId) => {
  const response = axios
    .put(
      `${apiURL}/Estabelecimento/DesativarEstabelecimento/${storeId}`,
      {},
      config
    )
    .then((res) => {
      return res;
    });
  return response;
};
