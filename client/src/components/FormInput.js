import React, { useEffect, useCallback, useRef, useState } from "react";
import './FormInput.scss'
import './FormInput.css'
import {MDCTextField} from '@material/textfield';
import {MDCTextFieldHelperTextFoundation} from '@material/textfield/helper-text/foundation';

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

/**
 * Use the foundation/adapter design pattern to load mdc component
 * @param {*} classList 
 * @param {*} setClassList 
 * @returns null
 */
function helperRefCallback (classList, setClassList) {
  const ref = useRef(null)
  const setRef = useCallback(node => {
    if (node) {
      const mdcFoundation = new MDCTextFieldHelperTextFoundation({
        addClass(className) {
          setClassList(classList.add(className))
        },
        removeClass(className) {
          classList.delete(className)
          setClassList(classList)
        },
        hasClass(className) {
          return classList.has(className);
        },
        setAttr(name, value) {
          node.setAttribute(name, value)
        },
        removeAttr(name) {
          node.removeAttribute(name);
        }
      });
      mdcFoundation.init();
      mdcFoundation.showToScreenReader();
      mdcFoundation.setValidity(false);
    }

    ref.current = node
  }, [])

  return [setRef]
}

const FormInput = ({ label, register, error }) => {

  const [ref] = useHookWithRefCallback()
  const [classList, setClassList] = useState(new Set());
  const [helperRef] = helperRefCallback(classList, setClassList)

  return (
    <div className="formInput" ref={ref}>
      <label className="mdc-text-field mdc-text-field--filled">
        <span className="mdc-text-field__ripple"></span>
        <span className="mdc-floating-label" id="my-label-id">{label}</span>
        <input className="mdc-text-field__input" type="text" required data-lpignore="true"
          aria-labelledby="my-label-id" 
          aria-controls="my-helper-text"
          aria-describedby="my-helper-text"
          {...register(label, {required: true})}/>
        <span className="mdc-line-ripple"></span>
      </label>

      <div className="mdc-text-field-helper-line">
        <div ref={helperRef} id="my-helper-text" className="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg">Required</div>
      </div>
    </div>
  )
}

export default FormInput;