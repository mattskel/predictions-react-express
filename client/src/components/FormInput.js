import { useState } from "react";
import './FormInput.css'

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const {label, onChange, ...inputProps} = props;

  const handleBlur = (e) => {
    setFocused(true)
  };

  return (
    <div className="formInput">
      <label>{label}</label>
      <input 
        {...inputProps}
        type="text" 
        onChange={onChange} 
        touched={focused.toString()} 
        onBlur={handleBlur}
        required
      />
      <span>This is a required field</span>
    </div>
  )
}

export default FormInput;