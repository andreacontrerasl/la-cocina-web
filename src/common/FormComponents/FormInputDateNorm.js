import React from "react"
import { Controller } from "react-hook-form"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

const FormInputDateNorm = ({
  name,
  control,
  label,
  minDate,
  rules,
  required,
  onChange = () => {},
}) => {
  if (required) {
    rules = {
      ...rules,
      required: "This field required",
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          const customOnChange = (value, keyboardInputValue) => {
            field.onChange(value, keyboardInputValue)
            onChange(value, keyboardInputValue)
          }
          return (
            <DatePicker
              {...field}
              label={label}
              minDate={minDate}
              slotProps={{
                textField: { fullWidth: true, size: "small", borderRadius: '10px' },
                sx: { borderRadius: '10px' }
              }}
              onChange={customOnChange}
            />
          )
        }}
      />
    </LocalizationProvider>
  )
}

export default FormInputDateNorm
