import { Meditation, Water, Login, Profile, Register, Sleep } from "./../interfaces/interface";
import { loginUrl, registerUrl, registerProfileUrl, caloriesUrl, waterUrl, meditationUrl, sleepUrl } from "./fetchUrl";

export const fetchLogin = async (values: Login) => {
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


export const fetchAddSleep = async ({sleepStart, sleepEnd}:Sleep) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(sleepUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({sleepStart, sleepEnd}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add sleep");
    }

    const data = await response.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error("Error in fetchAddSleep:", error);
    throw error;
  }
};

export const fetchGetSleep = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(sleepUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get sleep");
    }

    const data = await response.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error("Error in fetchGetSleep:", error);
    throw error;
  }
};