import * as yup from "yup";

export const schemaLogin = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});


export const schemaRegister = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  name: yup.string().required()
});


export const schemaContact = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
});
