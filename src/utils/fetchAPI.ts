/* eslint-disable no-useless-catch */
import { loginUrl, registerUrl, registerProfileUrl, caloriesUrl } from "./fetchUrl";
import { Meditation, Water, Login, Profile, Register } from "./../interfaces/interface";
import { loginUrl, registerUrl, registerProfileUrl, caloriesUrl, waterUrl, meditationUrl } from "./fetchUrl";

export const fetchLogin = async (values: Login) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    console.log(values);
    const data = await response.json();
    return data;
  
  } catch (error) {
    throw error;
  }
};

export const fetchRegister = async (values: Register) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    console.log(values);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchRegisterProfile = async (values: Profile) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(registerProfileUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });
    console.log(values);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchCalories = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(caloriesUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchFoodConsumed = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(caloriesUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchAddFoodConsumed = async (foodNames: string[]) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(caloriesUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ foodNames }),
    });
    console.log({ foodNames });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchAddWaterIntake = async (waterActual: Water) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(waterUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(waterActual),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add water intake");
    }

    const data = await response.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error("Error in fetchAddWaterIntake:", error);
    throw error;
  }
};

export const fetchWaterIntake = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(waterUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetcAddhMeditation = async (values: Meditation) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(meditationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add meditation time");
    }

    const data = await response.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error("Error in fetcAddhMeditation:", error);
    throw error;
  }
};

export const fetchMeditation = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(meditationUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
