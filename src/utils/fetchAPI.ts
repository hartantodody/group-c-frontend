import { Meditation, Water, Login, Profile, Register, Sleep, Steps, Mood } from "./../interfaces/interface";
import {
  loginUrl,
  registerUrl,
  registerProfileUrl,
  caloriesUrl,
  waterUrl,
  meditationUrl,
  sleepUrl,
  stepsUrl,
  editProfileUrl,
  foodConsumedUrl,
  moodUrl,
  reportUrl,
  allReportUrl,
  allFoodConsumedUrl,
} from "./fetchUrl";

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

export const fetchEditProfile = async (values: Profile) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(editProfileUrl, {
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

export const fetchCalculateCalories = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(caloriesUrl, {
      method: "POST",
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

export const fetchAllFoodConsumed = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(allFoodConsumedUrl, {
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

export const fetchDeleteFoodConsumed = async (values: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(foodConsumedUrl + `/${values}`, {
      method: "DELETE",
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
    const response = await fetch(foodConsumedUrl, {
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

export const fetchAddSleep = async ({ sleepStart, sleepEnd }: Sleep) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(sleepUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ sleepStart, sleepEnd }),
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

export const fetchPostSteps = async ({ stepsActual }: Steps) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(stepsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ stepsActual }),
    });

    console.log(stepsActual);
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to save your steps progress!");
    }

    const data = await response.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error("Error in fetchPostSteps:", error);
    throw error;
  }
};

export const fetchGetSteps = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(stepsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to get steps");
    }

    const data = await response.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error("Error in fetchGetSleep:", error);
    throw error;
  }
};

export const fetchPostMood = async ({ currentMood }: Mood) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(moodUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentMood }),
    });

    console.log("Mood sent to backend :", currentMood);
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to save your mood status!");
    }

    const data = await response.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error("Error in fetchPostMood:", error);
    throw error;
  }
};

export const fetchGetMood = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(moodUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to get mood");
    }

    const data = await response.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error("Error in fetchGetMood:", error);
    throw error;
  }
};

export const fetchPostReport = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(reportUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to send your daily report progress!");
    }

    const data = await response.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error("Error in fetchPostReport:", error);
    throw error;
  }
};

export const fetchGetReport = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(allReportUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to get weekly report");
    }

    const data = await response.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error("Error in fetchGetReport:", error);
    throw error;
  }
};
