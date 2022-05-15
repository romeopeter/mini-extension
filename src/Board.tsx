import React, { useEffect } from 'react';
import useAirtableClient from './airtable-client';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { logout } from './redux/authSlice';

export default function Board() {

  const dispatch = useAppDispatch()
  const {fetchClassRecord} = useAirtableClient()

  const studentRecordState = useAppSelector(state => state.school.studentsRecord);
  const studentName = useAppSelector(state => state.school.studentName);

  useEffect(() => {
    if (studentName !== "") {
      fetchClassRecord(studentName);
      console.log(studentName);
    }
  }, [fetchClassRecord, studentRecordState, studentName])

  return (
    <div>
      <button id="logout" onClick={() => dispatch(logout())} style={{ float: "right" }}>Logout</button>

      <div id="board">
        <strong className='board-header'>Name</strong>
        <p className='board-item'>cs 101</p>
        <strong className='board-header'>Students</strong>
        <p className='board-item'>James, Emmanuel, Mark, Uche</p>
      </div>
    </div>
  )
}
