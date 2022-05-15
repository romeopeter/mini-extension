import React, { useState, useEffect } from 'react';
import { useNavigate, NavigateFunction } from 'react-router';

import { useAppDispatch, useAppSelector } from './redux/hooks';
import { setStudentsRecord , setStudentName} from './redux/studentBoardSlice';
import useAirtableClient from './airtable-client';
import {login} from "./redux/authSlice"
import './styles/App.css';

function App() {
  const dispatch = useAppDispatch();
  const {fetchStudentsRecord} = useAirtableClient();

  const studentRecordState = useAppSelector(state => state.school.studentsRecord);

  const [name, setName] = useState("");
  const [noName, setNoName] = useState(false)

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const studentRecord = fetchStudentsRecord();

    if (studentRecord.length > 0) {
      console.log(studentRecord);
      // Dispatch result to store
      dispatch(setStudentsRecord(studentRecord));
    }

  }, [dispatch, fetchStudentsRecord])


  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (name !== "") {
      studentRecordState.find((record: any) => {
        if (record.name.toLowerCase() !== name.toLocaleLowerCase()) {
          setNoName(true);
        }

        if (record.name.toLowerCase() === name.toLocaleLowerCase()) {
          dispatch(setStudentName(name));
          dispatch(login());

          // Redirec to Board component
          navigate("/student/board");
        }

        return null
      })
    };
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <input type="text" value={name} placeholder="Enter student name" onChange={(e) => setName(e.target.value)} />
          <button type='submit' id="btn">login</button>
        </div>
      </form>
      <div>
        {noName && (<p>Student doesn't not exist</p>)}
      </div>
    </div>
  );
}

export default App;
