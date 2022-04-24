import {
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
} from '@mui/material';

interface Props {
  layout?: {
    labelCol?: number;
    inputCol?: number;
  };
  label?: string;
  required?: boolean;
  disabled?: boolean;
  fieldType?: string;
  options?: Array<{
    name?: string;
    value?: string;
  }>;
  rules?: string;
  defaultValue?: string;
  helperText?: string;
  isValidating?: boolean;
  control?: string;
}

const SelectForm = ({
  defaultValue,
  disabled,
  fieldType,
  helperText,
  label,
  layout,
  options,
  required,
  rules,
  isValidating,
  ...rest
}: Props) => {
  return (
    <Grid container alignItems="flex-end" className="field">
      <Grid item className="field-text" xs={layout!?.labelCol}>
        <span>{label}</span>
      </Grid>
      <Grid item xs={layout!?.inputCol}>
        <FormControl
          disabled={disabled}
          required={required}
          className={`field-${fieldType} field-select`}
          fullWidth
        >
          {isValidating ? (
            <Select>
              {options?.map((option, index) => (
                <MenuItem value={option.value} key={index} />
              ))}
            </Select>
          ) : (
            <Select defaultValue={defaultValue} {...rest}>
              {options}
            </Select>
          )}
          <FormHelperText className="error-text">{helperText}</FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default SelectForm;
