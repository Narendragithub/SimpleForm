import React, { useEffect, useState } from 'react';
import UseInput from '../hooks/use-input';
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const isNotEmpty = value => value.trim() !== '';
function BasicForm(props) {
    const { value: enteredFName,
        isValid: enteredFNameIsValid,
        hasError: fnameInputHasError,
        valueChangedHandler: fnameChangedHandler,
        inputBlurHandler: fnameInputBlurHandler,
        reset: resetFNameInput
    } = UseInput(isNotEmpty);

    const { value: enteredLName,
        isValid: enteredLNameIsValid,
        hasError: lnameInputHasError,
        valueChangedHandler: lnameChangedHandler,
        inputBlurHandler: lnameInputBlurHandler,
        reset: resetLNameInput
    } = UseInput(isNotEmpty);
    const { value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangedHandler: emailChangedHandler,
        inputBlurHandler: emailInputBlurHandler,
        reset: resetEmailInput
    } = UseInput(value => validateEmail(value));

    const [formIsVallid, setFormIsValid] = useState(false);
    useEffect(() => {
        if (enteredFNameIsValid && enteredLNameIsValid && enteredEmailIsValid) {
            setFormIsValid(true);
        } else {
            setFormIsValid(false);
        }
    }, [enteredFNameIsValid,enteredLNameIsValid, enteredEmailIsValid])

    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (!enteredFNameIsValid) {
            return;
        }
        if (!enteredLNameIsValid) {
            return;
        }

        if (!enteredEmailIsValid) {
            return;
        }
        console.log(enteredFName+ "======" +enteredLName+ "====" + enteredEmail);
        resetFNameInput();
        resetLNameInput();
        resetEmailInput();
    }

    const fnameInputClasses = fnameInputHasError ? 'form-control invalid' : 'form-control';
    const lnameInputClasses = lnameInputHasError ? 'form-control invalid' : 'form-control';
    const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';
    return (
        <form onSubmit={formSubmitHandler}>
            <div className='control-group'>
                <div className={fnameInputClasses}>
                    <label htmlFor='name'>First Name</label>
                    <input type='text' id='fname' onChange={fnameChangedHandler} onBlur={fnameInputBlurHandler} />
                </div>
                {fnameInputHasError && <p className='error-text'>First Name must not be empty.</p>}
                <div className={lnameInputClasses}>
                    <label htmlFor='name'>Last Name</label>
                    <input type='text' id='lname' onChange={lnameChangedHandler} onBlur={lnameInputBlurHandler} />
                </div>
                {lnameInputHasError && <p className='error-text'>Last Name must not be empty.</p>}
            </div>
            <div className={emailInputClasses}>
                <label htmlFor='name'>E-Mail Address</label>
                <input type='text' id='email' onChange={emailChangedHandler} onBlur={emailInputBlurHandler} />
            </div>
            {emailInputHasError && <p className='error-text'>Please enter valid email.</p>}
            <div className='form-actions'>
                <button disabled={!formIsVallid}> Submit</button>
            </div>
        </form>
    );
}

export default BasicForm;