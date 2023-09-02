import axios from "axios";
export const signIn = (body: { email: string; password: string }) =>
  axios
    .post("http://localhost:3000/auth/sign-in", {
      body: body,
    })
    .then((data) => data.data);
export const signUp = (body: {
  email: string;
  password: string;
  name: string;
  role: "Author" | "Commentator";
}) =>
  axios
    .post("http://localhost:3000/auth/sign-up", {
      body: body,
    })
    .then((data) => data.data);
