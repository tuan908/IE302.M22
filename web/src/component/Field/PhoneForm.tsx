import {
  FormControl,
  InputLabel,
  TextField,
  FormHelperText,
} from '@mui/material';
import { rest } from 'lodash';

interface Props {
  disabled?: boolean;
  required?: boolean;
  label?: string;
  defaultValue?: string | number;
  helperText?: string;
}

const PhoneForm = ({
  defaultValue,
  disabled,
  helperText,
  label,
  required,
}: Props) => {
  return (
    <FormControl disabled={disabled} className="field" required={required}>
      <InputLabel className="MuiInputLabel-shrink">{label}</InputLabel>
      <Controller
        as={NumberFormat}
        thousandSeparator
        control={control}
        rules={{
          validate: isValidPhoneNumber,
        }}
        allowEmptyFormatting
        customInput={TextField}
        format="+## ## #### ####"
        defaultValue={defaultValue}
        {...rest}
      />
      <FormHelperText className="error-text">{helperText}</FormHelperText>
    </FormControl>
  );
};

export default PhoneForm;
