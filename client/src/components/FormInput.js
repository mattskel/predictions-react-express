import React, { useState } from "react";
import './FormInput.css'

const FormInput = ({ label, register, error }) => {

  return (
    <div className="formInput">
      <label>{label}</label>
      <input
        {...register(label, { required: true })}
      />
      {error && <span>This field is required</span>}
    </div>
  )
}

export default FormInput;