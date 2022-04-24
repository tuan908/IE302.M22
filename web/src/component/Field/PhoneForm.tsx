import { Controller, useForm } from 'react-hook-form';
import PhoneInputWithCountrySelect, {
  isValidPhoneNumber,
} from 'react-phone-number-input';

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
  const { handleSubmit, control } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        <label htmlFor="">Phone number</label>
      </div>
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
      <p className="error-message">Invalid phone number</p>)
    </form>
  );
};

export default PhoneForm;
