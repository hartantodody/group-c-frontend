import { loginUrl } from "./fetchUrl";
import { Login } from "../interfaces/interface";

export const fetchLogin = async (values: Login) => {
  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
