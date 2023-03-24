# Getting Started with Form Builder
The `<FormBuilder />` is using `react-hook-form` and `Material UI` libraries.

To use the `<FormBuilder />` component, you have to pass three props: `fields`, `onSubmit` and `validationSchema`. 


- `fields` prop accepts an array of field objects. Each field accept 3 required parameters: `name`, `label` and `type`
```
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
    { name: "submit", 
      label: "Submit", 
      type: "submitButton" 
    }
  ];
```
For fields with types `select` and `radio`, you can provide the additional parameter `options`, which accept an array of objects with `value` and `label` fields
```
  const fields = [
   {
      name: "selectSomething",
      label: "Select something",
      type: "select",
      options: [
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" }
      ],
   },
   {
      name: "choose",
      label: "Choose something",
      type: "radio",
      options: [
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" }
      ],
   },
  ];
```
Also, you can pass additional parameters, such as `defaultValue` and `disabled`.
The full list of type parameters:
```
type FormField = {
  name: string;
  label: string;
  type: string;
  disabled?: boolean;
  options?: Array<{ value: string; label: string }>;
  defaultValue?: string;
  handleButtonClick?: () => void;
};
```

- `onSubmit` prop accepts a `handleSubmit` function for your form;
- `validationSchema` prop accepts a yup validation schema object. For example:
```
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(16).required(),
  });
```
