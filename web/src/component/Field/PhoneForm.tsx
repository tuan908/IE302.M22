import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import PhoneInputWithCountrySelect, {
  isValidPhoneNumber,
} from 'react-phone-number-input';

interface IProps extends FormControlProps {
  label: string;
  helperText: string;
}

const PhoneForm = ({ disabled, label }: IProps) => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormControl
      disabled={disabled}
      className="field"
      required
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputLabel className="MuiInputLabel-shrink">{label}</InputLabel>
      <Controller
        name="phone-input"
        control={control}
        rules={{ validate: (inputValue) => isValidPhoneNumber(inputValue) }}
        render={({ field: { onChange, value } }) => (
          <PhoneInputWithCountrySelect
            value={value}
            onChange={onChange}
            defaultCountry="VN"
          />
        )}
      />
      (errors["phone-input"] &&
      <FormHelperText>Invalid phone number</FormHelperText>)
    </FormControl>
  );
};

export default PhoneForm;
