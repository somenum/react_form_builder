import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

type FormFieldConfig = {
  name: string;
  label: string;
  type: string;
  options?: Array<{ value: string; label: string }>;
  required?: boolean;
  defaultValue?: string;
};

type Props = {
  fields: FormFieldConfig[];
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: Record<string, unknown>) => void;
  validationSchema: yup.AnyObject;
};

const FormBuilder: FC<Props> = ({ fields, onSubmit, validationSchema }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ resolver: yupResolver(validationSchema), mode: "onChange" });

  const renderField = (fieldProp: FormFieldConfig) => {
    switch (fieldProp.type) {
      case "select":
        return (
          <div key={fieldProp.name}>
            <Controller
              control={control}
              name={fieldProp.name}
              defaultValue={
                fieldProp.defaultValue ? fieldProp.defaultValue : ""
              }
              render={({ field: { onChange, value } }) => (
                <Select
                  label={fieldProp.label}
                  onChange={onChange}
                  value={value}
                >
                  {fieldProp.options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </div>
        );
      case "radio":
        return (
          <div key={fieldProp.name}>
            <Controller
              control={control}
              name={fieldProp.name}
              defaultValue={
                fieldProp.defaultValue ? fieldProp.defaultValue : ""
              }
              render={({ field: { onChange, value } }) => (
                <FormControl component="fieldset">
                  <FormLabel component="legend">{fieldProp.label}</FormLabel>
                  <RadioGroup value={value} onChange={onChange}>
                    {fieldProp.options?.map((option) => (
                      <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
        );
      case "checkbox":
        return (
          <div key={fieldProp.name}>
            <Controller
              control={control}
              name={fieldProp.name}
              defaultValue={
                fieldProp.defaultValue ? fieldProp.defaultValue : ""
              }
              render={({ field: { onChange, value } }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={value}
                      defaultChecked={fieldProp.defaultValue !== ""}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                  label={fieldProp.label}
                />
              )}
            />
          </div>
        );
      default:
        return (
          <div key={fieldProp.name}>
            <Controller
              control={control}
              name={fieldProp.name}
              defaultValue={
                fieldProp.defaultValue ? fieldProp.defaultValue : ""
              }
              render={({ field }) => (
                <TextField
                  {...field}
                  label={fieldProp.label}
                  variant="outlined"
                  error={!!errors[fieldProp.name]}
                  helperText={
                    errors[fieldProp.name]
                      ? errors[fieldProp.name]?.message?.toString()
                      : ""
                  }
                  fullWidth
                  margin="dense"
                />
              )}
            />
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item) => renderField(item))}
      <Box mt={2}>
        <LoadingButton
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          disabled={!isValid}
          loading={isSubmitting}
          fullWidth
        >
          Submit
        </LoadingButton>
      </Box>
    </form>
  );
};

export default FormBuilder;
