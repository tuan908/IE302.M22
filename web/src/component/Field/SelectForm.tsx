import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { map, rest } from 'lodash';

interface Props {
  layout?: {
    labelCol?: number;
    inputCol?: number;
  };
  label?: string;
  required?: boolean;
  disabled?: boolean;
  fieldType?: string;
  options?: {
    name?: string;
    value?: string;
  };
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
            <Controller
              as={
                <Select>
                  {map(options!, (option!, i) => (
                    <MenuItem name={option!.value} key={i} value={option!?.value}>
                      {option!?.name}
                    </MenuItem>
                  ))}
                </Select>
              }
              rules={rules}
              control={control}
              defaultValue={defaultValue}
              {...rest}
            />
          ) : (
            <Select defaultValue={defaultValue} {...rest}>
              {map(options, (option, i) => (
                <MenuItem name={option.value} key={i} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          )}
          <FormHelperText className="error-text">{helperText}</FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default SelectForm;
