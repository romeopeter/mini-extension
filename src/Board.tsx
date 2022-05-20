import React, { useEffect } from 'react';
import useAirtableClient from './airtable-client';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { logout } from './redux/authSlice';

export default function Board() {

  const dispatch = useAppDispatch()
  const { fetchClassRecord, fetchStudentInClasses } = useAirtableClient()

  const studentName = useAppSelector(state => state.school.studentName);
  const studentClasses: null | string[] = useAppSelector(state => state.school.studentClasses);
  const students = useAppSelector(state => state.school.students);

  useEffect(() => {
    if (studentName !== "" && studentClasses === null) {
      fetchClassRecord(studentName);
    }
  }, [fetchClassRecord, studentName, studentClasses])

  useEffect(() => {
    if (students === null) {

      let formula: string = "";

      const createFormula = (c: string, index: number) => {

        formula += `SEARCH('${c}', {Classes}),`

        if (studentClasses?.length === 1) formula = `SEARCH('${c}', {Classes})`;

        if (studentClasses?.length !== 1 && (index + 1) === studentClasses?.length) {
          formula += `SEARCH('${c}', {Classes})`;
        }

        console.log(formula);
      }

      studentClasses?.forEach(createFormula);

      if (formula !== "") fetchStudentInClasses(formula);
    }
  },[studentClasses, students, fetchStudentInClasses])
  

  const Classes = (props: any) => {
    const classes = props.classes;

    if (classes !== null && classes?.length > 0) {
     return classes.map((c: any, index: number) => (
       <>
       <small key={index}>{`${c}`}</small>{" "}
       </>
     ));
    } else if(classes !== null && classes?.length > 0) {
     return (<p>{classes[0]}</p>); 
    }

    return null
  }

  const StudentsComponent = (props: any) => {
    const students = props.students;

    if (students !== null) {
      return students.map((student: string, index: number) => (
        <>
          <small key={index}>{student}</small>
          {" "}
        </>
      ))
    }

    return null
  }

  const logoutFunc = () => {
    const action = dispatch(logout());

    if (action.type === "auth/logout") window.location.reload();
  }

  return (
    <div>
      <button id="logout" onClick={logoutFunc} style={{ float: "right" }}>Logout</button>

      <div id="board">
        <strong className='board-header'>Names of classes</strong>
        <div>
          <Classes classes={studentClasses} />
        </div>
        <strong className='board-header'>Students in classes</strong>
        <div>
        <StudentsComponent students={students} />
        </div>
      </div>
    </div>
  )
}
