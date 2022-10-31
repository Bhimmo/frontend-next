import { TextField } from "@mui/material";

export default function Input({
    id,
    variant,
    type,
    name,
    label,
    autoComplete,
    autoFocus,
    required,
    fullWidth=true,
    multiline=false,
    color,
    focused,
    placeholder,
    value,
    onChange,
    defaultValue,
    marginTop=0,
    marginLeft=0
}) {
    return (
        <TextField
            sx={{marginTop: marginTop, marginLeft: marginLeft}}
            id={id}
            defaultValue={defaultValue}
            variant={variant}
            type={type}
            name={name}
            label={label}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            required={required}
            fullWidth={fullWidth}
            multiline={multiline}
            color={color}
            focused={focused}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}