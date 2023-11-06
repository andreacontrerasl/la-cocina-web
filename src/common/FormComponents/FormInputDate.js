import React from "react"
import { Controller } from "react-hook-form"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const FormInputDate = ({
  name,
  control,
  label,
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

  const disableDate = (date) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const selectedMonth = date.getMonth();
    return currentMonth !== selectedMonth;
  };

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
            <DateCalendar
              {...field}
              disablePast
              shouldDisableDate={disableDate}
              label={label}
              onChange={customOnChange}
              sx={{width: '100%'}}
            />
          )
        }}
      />
    </LocalizationProvider>
  )
}

export default FormInputDate
