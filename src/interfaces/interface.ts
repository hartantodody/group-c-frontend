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

export interface Layout {
  children: ReactNode;
  titleText: string;
}

export interface ButtonProps {
  buttonText: string;
}
