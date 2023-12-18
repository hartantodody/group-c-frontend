import { ReactNode } from "react";

export interface Login {
  username: string;
  password: string;
}

export interface Register {
  username: string;
  password: string;
  email: string;
}

export interface Profile {
  nickname: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  activeness: string;
}

export interface PublicLayoutProps {
  children: ReactNode;
  titleText: string;
}
export interface DashboardLayoutProps {
  chartMenu?: ReactNode;
  caloriesMenu?: ReactNode;
  stepsMenu?: ReactNode;
  waterMenu?: ReactNode;
  sleepMenu?: ReactNode;
  meditationMenu?: ReactNode;
  titleText?: string;
}

export interface ButtonProps {
  buttonText: string;
}

export interface CaloriesProps {
  target: number;
  calories: number;
}

export interface FoodItem {
  id: number;
  foodName: string;
  calories: number;
}
