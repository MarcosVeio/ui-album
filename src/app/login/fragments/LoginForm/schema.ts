import * as yup from "yup";

export const schema = yup.object({
  username: yup.string().required("Usuário obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});
