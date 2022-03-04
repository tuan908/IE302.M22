import React from 'react';
import PhoneForm from './PhoneForm';

interface Props {
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  defaultValue?: string | number;
  typeField?: string;
  options: {
    name: string;
    value: string;
  };
  inputType?: string;
  label?: string;
  rules?: object;
  control?: object;
  notRightLabel?: boolean;
  layout?: {
    labelCol?: number;
    inputCol?: number;
  };
}

const PinterestField: React.FC<Props> = ({
  disabled,
  defaultValue,
  options,
  label,
  required,
  helperText,
  control,
  rules,
  notRightLabel,
  typeField,
  inputType,
  layout,
  ...rest
}: Props) => {
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
    const isFieldValidation = !isEmpty(control);
    return (
      <Grid container alignItems="flex-end" className="field">
        <Grid item className="field-text" xs={layout.labelCol}>
          <span>{label}</span>
        </Grid>
        <Grid item xs={layout.inputCol}>
          <FormControl
            disabled={disabled}
            required={required}
            className={`field-${typeField} field-select`}
            fullWidth
          >
            {/* <InputLabel id="role-required">{label}</InputLabel> */}
            {isFieldValidation ? (
              <Controller
                as={
                  <Select>
                    {map(options, (option, i) => (
                      <MenuItem
                        name={option.value}
                        key={i}
                        value={option.value}
                      >
                        {option.name}
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
  }
  return <div>PinterestField</div>;
};

export default PinterestField;
