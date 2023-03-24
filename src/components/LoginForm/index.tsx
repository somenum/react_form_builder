import React, { FC } from "react";
import * as yup from "yup";

import FormBuilder from "../FormBuilder";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(16).required(),
});

const LoginForm: FC = () => {
  const handleSubmit = (data: Record<string, unknown>) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(data);
        return resolve();
      }, 2000);
    });
  };

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "text",
    },
    {
      name: "password",
      label: "Password",
      type: "text",
    },
    { name: "submit", label: "Submit", type: "submitButton" },
  ];

  return (
    <div>
      <h1>Login</h1>
      <FormBuilder
        fields={fields}
        onSubmit={handleSubmit}
        validationSchema={schema}
      />
    </div>
  );
};

export default LoginForm;
