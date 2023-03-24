import React from "react";
import * as yup from "yup";

import FormBuilder from "../FormBuilder";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  nationality: yup.string().required(),
  termsAndConditions: yup
    .string()
    .oneOf(["true"], "The terms and conditions must be accepted."),
  gender: yup.string().required(),
});

const PersonalDetailsForm = () => {
  const checkboxStyle = {
    display: "flex",
    width: "100%",
    marginTop: 1,
  };

  const radioStyle = {
    display: "flex",
  };
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
      name: "firstName",
      label: "First name",
      type: "text",
    },
    {
      name: "lastName",
      label: "Last name",
      type: "text",
    },
    {
      name: "nationality",
      label: "Nationality",
      type: "select",
      options: [
        { label: "Ukrainian", value: "ukrainian" },
        { label: "American", value: "american" },
        { label: "Spanish", value: "spanish" },
      ],
    },
    {
      name: "termsAndConditions",
      label: "Terms and Conditions",
      type: "checkbox",
      customFiledContainerStyles: checkboxStyle,
    },
    {
      name: "gender",
      label: "Gender",
      type: "radio",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
      customFiledContainerStyles: radioStyle,
    },
    { name: "submit", label: "Submit", type: "submitButton" },
  ];

  return (
    <div>
      <h1>Personal details</h1>
      <FormBuilder
        fields={fields}
        onSubmit={handleSubmit}
        validationSchema={schema}
      />
    </div>
  );
};

export default PersonalDetailsForm;
