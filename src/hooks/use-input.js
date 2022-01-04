import  { useState } from 'react';
const UseInput = (validateValue) =>{
    const [enteredValue, setEnteredValue] = useState('');
    const [enteredTouched,setInputTouched] = useState(false);
    const isInpuutValid = validateValue(enteredValue);
    const hasError = !isInpuutValid && enteredTouched;

    const valueChangedHandler = (event) => {
        setEnteredValue(event.target.value);
    }

    const inputBlurHandler = (event) =>{
        setInputTouched(true);
    }

    const reset=() => {
        setEnteredValue();
        setInputTouched(false);
    }

    return {
        value : enteredValue,
        isValid :isInpuutValid,
        hasError ,
        valueChangedHandler,
        inputBlurHandler,
        reset
    }

}

export default UseInput;