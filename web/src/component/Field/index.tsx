import {
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { isEmpty } from 'lodash';
import { ReactElement } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { allowPositive } from 'src/util/form';
import PhoneForm from './PhoneForm';

interface IProps {
  disabled?: boolean;
  required?: boolean;
  helperText: string;
  defaultValue?: string | number;
  typeField?: string;
  options?: Array<{
    name: string;
    value: string;
  }>;
  inputType?: string;
  label: string;
  rules?: object;
  control?: object;
  notRightLabel?: boolean;
  layout?: {
    labelCol?: number;
    inputCol?: number;
  };
}

export default function PinterestField({
  disabled,
  defaultValue,
  options,
  label,
  required,
  helperText,
  rules,
  notRightLabel,
  typeField,
  inputType,
  layout,
  ...rest
}: IProps): ReactElement {
  const { control } = useForm();

  if (inputType === 'phone') {
    return (
      <PhoneForm
        defaultValue={defaultValue}
        disabled={disabled}
        helperText={helperText}
        label={label}
        required={required}
      />
    );
  } else if (inputType === 'select') {
    const isValidating = !isEmpty(control);
    return (
      <Grid container alignItems="flex-end" className="field">
        <Grid item className="field-text" xs={layout!.labelCol}>
          <span>{label}</span>
        </Grid>
        <Grid item xs={layout!.inputCol}>
          <FormControl
            disabled={disabled}
            required={required}
            className={`field-${typeField} field-select`}
            fullWidth
          >
            {isValidating ? (
              <Controller
                name="field"
                render={() => (
                  <Select>
                    {options?.map((option, index) => (
                      <MenuItem key={index} value={option.value} />
                    ))}
                  </Select>
                )}
                rules={rules}
                control={control}
                defaultValue={defaultValue}
              />
            ) : (
              <Select defaultValue={defaultValue} {...rest}>
                {options?.map((option, index) => (
                  <MenuItem key={index} value={option.value} />
                ))}
              </Select>
            )}
            <FormHelperText className="error-text">{helperText}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container alignItems="flex-end" className="field">
      {!notRightLabel && (
        <Grid item className="field-text" xs={layout!.labelCol}>
          <span>{label}</span>
        </Grid>
      )}
      <Grid item xs={notRightLabel ? 12 : layout!.inputCol}>
        <TextField
          label={notRightLabel ? label : ''}
          inputProps={{ readOnly: disabled }}
          defaultValue={defaultValue}
          fullWidth
          required={required}
          error={!!helperText}
          helperText={helperText}
          className={`field-${typeField} ${disabled ? 'filed-disable' : ''}`}
          onChange={(e) => {
            if (inputType === 'number') {
              return allowPositive(e);
            }
            return e;
          }}
          {...rest}
        />
      </Grid>
    </Grid>
  );
}
