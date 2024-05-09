import { jwtDecode } from "jwt-decode";

export const isAuthentication = () => {
  const token = sessionStorage.getItem("token");

  let decodToken = "";

  if(token) {
    decodToken = jwtDecode(token);
  }

  return token && decodToken.exp * 1000 > Date.now() ? true : false;

};
