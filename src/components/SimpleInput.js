import React, { useEffect, useState } from 'react';
import UseInput from '../hooks/use-input';
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
function SimpleInput(props) {

    const { value : enteredName,
            isValid: enteredNameIsValid,
            hasError : nameInputHasError,
            valueChangedHandler : nameChangedHandler,
            inputBlurHandler : nameInputBlurHandler,
            reset : resetNameInput
            } = UseInput(value => value.trim() !=='');
    
    const { value : enteredEmail,
        isValid: enteredEmailIsValid,
        hasError : emailInputHasError,
        valueChangedHandler : emailChangedHandler,
        inputBlurHandler : emailInputBlurHandler,
        reset : resetEmailInput
        } = UseInput(value => validateEmail(value));
    
    const [formIsVallid,setFormIsValid] = useState(false);
    useEffect(()=>{
        if(enteredNameIsValid && enteredEmailIsValid){
            setFormIsValid(true);
        }else{
            setFormIsValid(false);
        }
    },[enteredNameIsValid,enteredEmailIsValid])

    const formSubmitHandler = (event) => {
        event.preventDefault();
        if(!enteredNameIsValid){
            return;
        }

        if(!enteredEmailIsValid){
            return;
        }
        console.log(enteredName +"===="+enteredEmail);
        resetNameInput();
        resetEmailInput();
    }

    const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control' ;
    const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control' ;
    return (
        <form onSubmit={formSubmitHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' onChange={nameChangedHandler} onBlur={nameInputBlurHandler}></input>
            </div>
            {nameInputHasError && <p className='error-text'>Name must not be empty.</p>}
            <div className={emailInputClasses}>
                <label htmlFor='name'>Your Email</label>
                <input type='text' id='email' onChange={emailChangedHandler} onBlur={emailInputBlurHandler}></input>
            </div>
            {emailInputHasError && <p className='error-text'>Please enter valid email.</p>}
            <div className='form-actions'>
                <button type='submit' id='' disabled={!formIsVallid}>Submit</button>
            </div>
        </form>
    );
}

export default SimpleInput;