import React, { useState,useRef, } from 'react';
import Wrapper from'../Helpers/Wrapper';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  const  nameInputRef=useRef(); 
  const  ageInputRef=useRef();
  const collageInputRef=useRef();
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
  
    const enteredUsername=nameInputRef.current.value;
    const  enteredAge=ageInputRef.current.value;
     const enteredCollage=collageInputRef.current.value;
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0 ||enteredCollage.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge,enteredCollage);
    nameInputRef.current.value='';
    ageInputRef.current.value='';
    collageInputRef.current.value='';
  };

  
  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={nameInputRef}
          />
         
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            ref={ageInputRef}
          />
           <label htmlFor="collagename">Collage:</label>
          <input
            id="collage"
            type="text"
            ref={collageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
