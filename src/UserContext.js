import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const auth = "83M01mhf41iaqKIq3nar3mFK393b019nmKkfomfc93m8aGqy2m";
const apiURL = "localhost";
const config = {
  headers: {
    Authorization: auth,
  },
};

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [permission, setPermission] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/login");
  }, []);

  const handleFindStoreByName = (estabelecimento) => {
    axios
      .get(
        `${apiURL}/Estabelecimento/getByName?estabelecimento=${estabelecimento}`,
        config
      )
      .then((res) => {
        setData(res);
      });
  };

  async function userLogin(estabelecimento) {
    try {
      setLoading(true);
      navigate("/login");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setPermission(true);
      window.localStorage.setItem("permission", true);
    }
  }

  async function userLogout(auth) {
    setPermission(false);
  }

  return (
    <UserContext.Provider
      value={{
        userLogin,
        userLogout,
        permission,
        // data,
        error,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
