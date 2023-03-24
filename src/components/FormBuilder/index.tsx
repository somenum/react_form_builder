import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

type FormFieldConfig = {
  name: string;
  label: string;
  type: string;
  disabled?: boolean;
  options?: Array<{ value: string; label: string }>;
  defaultValue?: string;
  handleButtonClick?: () => void;
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
          <Box key={fieldProp.name} mt={1}>
            <Controller
              control={control}
              name={fieldProp.name}
              defaultValue={
                fieldProp.defaultValue ? fieldProp.defaultValue : ""
              }
              render={({ field: { onChange, value } }) => (
                <FormControl fullWidth error={!!errors[fieldProp.name]}>
                  <InputLabel id={fieldProp.label}>
                    {fieldProp.label}
                  </InputLabel>
                  <Select
                    labelId={fieldProp.label}
                    label={fieldProp.label}
                    onChange={onChange}
                    value={value}
                    disabled={fieldProp.disabled ?? false}
                  >
                    {fieldProp.options?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Box>
        );
      case "radio":
        return (
          <Box key={fieldProp.name}>
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
                        control={
                          <Radio disabled={fieldProp.disabled ?? false} />
                        }
                        label={option.label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </Box>
        );
      case "checkbox":
        return (
          <Box key={fieldProp.name}>
            <Controller
              control={control}
              name={fieldProp.name}
              defaultValue={fieldProp.defaultValue ?? false}
              render={({ field: { onChange, value } }) => (
                <FormControl error={!!errors[fieldProp.name]}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{
                          color: errors[fieldProp.name] ? "#d32f2f" : undefined,
                        }}
                        checked={value}
                        onChange={onChange}
                        color="primary"
                        disabled={fieldProp.disabled ?? false}
                      />
                    }
                    label={fieldProp.label}
                  />
                  {errors[fieldProp.name] && (
                    <FormHelperText
                      sx={{
                        marginLeft: 0,
                      }}
                    >
                      {errors[fieldProp.name]?.message?.toString()}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Box>
        );
      case "submitButton":
        return (
          <Box key={fieldProp.name}>
            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              disabled={!isValid}
              loading={isSubmitting}
              fullWidth
            >
              {fieldProp.label}
            </LoadingButton>
          </Box>
        );
      case "button":
        return (
          <Box key={fieldProp.name}>
            <Button
              type="button"
              color="primary"
              variant="contained"
              size="large"
              onClick={fieldProp.handleButtonClick}
              disabled={fieldProp.disabled}
              fullWidth
            >
              {fieldProp.label}
            </Button>
          </Box>
        );
      default:
        return (
          <Box key={fieldProp.name}>
            <Controller
              control={control}
              name={fieldProp.name}
              defaultValue={
                fieldProp.defaultValue ? fieldProp.defaultValue : ""
              }
              render={({ field }) => (
                <TextField
                  {...field}
                  onBlur={field.onBlur}
                  label={fieldProp.label}
                  variant="outlined"
                  error={!!errors[fieldProp.name]}
                  helperText={
                    errors[fieldProp.name]
                      ? errors[fieldProp.name]?.message?.toString()
                      : ""
                  }
                  fullWidth
                  disabled={fieldProp.disabled ?? false}
                  margin="dense"
                />
              )}
            />
          </Box>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item) => renderField(item))}
    </form>
  );
};

export default FormBuilder;
