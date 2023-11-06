import React from "react"
import { Controller } from "react-hook-form"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"

const FormInputText = ({
  name,
  control,
  label,
  multiline,
  rules,
  helperText,
  number,
  required,
  rows,
  inputRef,
  currency,
  shrink,
  type
}) => {
  const transform = {
    input: (value) => (isNaN(value) || value === 0 ? 0 : value.toString()),
    output: (e) => {
      const output = parseInt(e.target.value, 10)
      return isNaN(output) ? 0 : output
    },
  }

  if (required) {
    rules = {
      required: "This field required",
      ...rules,
    }
  }

  let inputAdornmentProps = { sx: { borderRadius: '10px' } }

  if (currency) {
    inputAdornmentProps = {
      startAdornment: (
        <InputAdornment
          position="start"
          disableTypography
          sx={{ opacity: 0.7 }}>
          $
        </InputAdornment>
      ),
    }
  }

  let inputLabelProps = {}

  if (shrink) {
    inputLabelProps = { shrink: true }
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <TextField
            inputRef={inputRef}
            helperText={error ? error.message : helperText || null}
            size="small"
            error={!!error}
            onChange={number ? (e) => onChange(transform.output(e)) : onChange}
            value={number ? transform.input(value) : value || ""}
            fullWidth
            label={rules?.required ? `${label} *` : label}
            variant="outlined"
            multiline={!!multiline}
            rows={multiline && (rows || 2)}
            InputProps={inputAdornmentProps}
            InputLabelProps={inputLabelProps}
            type={type}
          />
        )
      }}
    />
  )
}

export default FormInputText
