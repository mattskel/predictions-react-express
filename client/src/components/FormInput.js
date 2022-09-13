import React, { useEffect, useCallback, useRef } from "react";
import './FormInput.css'
import {MDCTextField} from '@material/textfield';

function useHookWithRefCallback() {
  const ref = useRef(null)
  const setRef = useCallback(node => {
    if (ref.current) {
      // Make sure to cleanup any events/references added to the last instance
    }
    
    if (node) {
      // Check if a node is actually passed. Otherwise node would be null.
      // You can now do what you need to, addEventListeners, measure, etc.
      const textField = new MDCTextField(node.querySelector('.mdc-text-field'));
    }
    
    // Save a reference to the node
    ref.current = node
  }, [])
  
  return [setRef]
}

const FormInput = ({ label, register, error }) => {

  const [ref] = useHookWithRefCallback()

  return (
    <div className="formInput" ref={ref}>
      <label className="mdc-text-field mdc-text-field--filled">
          <span className="mdc-text-field__ripple"></span>
          <span className="mdc-floating-label" id="my-label-id">{label}</span>
          <input className="mdc-text-field__input" type="text" aria-labelledby="my-label-id" {...register(label, {required: true})}/>
          <span className="mdc-line-ripple"></span>
        </label>
    </div>
  )
}

export default FormInput;