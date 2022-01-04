import React, { useEffect, useRef, useState } from 'react';

function SimpleInput(props) {
    const [enteredName, setEnteredName] = useState('');
    const [nameInputIsvalid,setNameInputIsvalid] = useState(false);
    const [nameInputTouched,setNameInputTouched] = useState(false);
    const inputRef = useRef();
    const nameChangedHandler = (event) => {
        setEnteredName(event.target.value);
        if(event.target.value.trim() !==''){
            setNameInputIsvalid(true);
        }
    }

    const nameInputBlurHandler = (event) =>{
        setNameInputTouched(true);
        if(enteredName.trim()===''){
            setNameInputIsvalid(false);    
        }
    }

    useEffect(()=>{
        if(nameInputIsvalid){
            console.log("Name input is valid!");
        }
    },[nameInputIsvalid])
    const formSubmitHandler = (event) => {
        event.preventDefault();
        setNameInputTouched(true);
        if(enteredName.trim()===''){
            setNameInputIsvalid(false);
            return;
        }
        console.log(enteredName);
        console.log(inputRef.current.value);
        setEnteredName('');

    }
    const nameInputIsInvalid = !nameInputIsvalid && nameInputTouched;
    const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control' 
    return (
        <form onSubmit={formSubmitHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={inputRef} onChange={nameChangedHandler} onBlur={nameInputBlurHandler}></input>
            </div>
            {nameInputIsInvalid && <p className='error-text'>Name must not be empty.</p>}
            <div className='form-actions'>
                <button type='submit' id=''>Submit</button>
            </div>
        </form>
    );
}

export default SimpleInput;