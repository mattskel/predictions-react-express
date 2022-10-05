import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setPredictions, getQuestions } from "../services/predictions";
import "./PredictionsForm.css";
import "./PredictionsForm.scss";
import FormInput from "./FormInput";
import _ from 'lodash';

const PredictionsForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [values, setValues] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions()
      .then((response) => {
        const {values: [questions] = []} = JSON.parse(response) || {};
        setQuestions(questions);
        questions.forEach(question => {
          values[question] = "";
          setValues({ ...values });
        });
      });
  }, [])

  const onSubmit = data => {
    const predictions = questions.map((question) => data[question]);
    setPredictions(predictions)
      .then((response) => {
        console.log('response', JSON.stringify(response));
        const {statusCode, error} = JSON.parse(response) || {};
        if (error) return alert('🤬 Server error.');
 
        if (statusCode !== 200) {
          return alert('Something went wrong. Server returned status code ' + statusCode + '. 🫠');
        }

        return alert('✅ Form submitted. Good luck with your tips 🤞');

      });
  }

  return (
    <div className="highlights">
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(values).map((question, index) => (
          <FormInput
            key={index}
            label={question}
            register={register}
            error={errors[question]}
          />
        ))}
        <button className="mdc-button foo-button">
          <div className="mdc-button__ripple"></div>
          Submit predictions
        </button>
      </form>
    </div>
  )
}

export default PredictionsForm;