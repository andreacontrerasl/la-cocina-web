import React from "react"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import { Controller } from "react-hook-form"

const FormInputDropdown = ({
  name,
  control,
  label,
  options,
  rules,
  required,
  fontSize,
}) => {
  const generateSingleOptions = () => {
    return options.map((option) => {
      return (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      )
    })
  }

  if (required) {
    rules = {
      ...rules,
      required: "This field required",
    }
  }

  return (
    <Controller
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel id="demo-simple-select-label" shrink>
            {label}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            onChange={onChange}
            value={value}
            label={label}
            size="small"
            sx={{
              ...(fontSize ? { fontSize } : {}),
              minWidth: 80,
            }}
            fullWidth
            native>
            {generateSingleOptions()}
          </Select>
          {error && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
      control={control}
      rules={rules}
      name={name}
    />
  )
}

FormInputDropdown.defaultProps = {
  name: "dropdownValue",
  control: () => {},
  label: "",
  options: [
    {
      label: "Dropdown Option 1",
      value: "1",
    },
    {
      label: "Dropdown Option 2",
      value: "2",
    },
  ],
}

export default FormInputDropdown
