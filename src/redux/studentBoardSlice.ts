import {createSlice} from "@reduxjs/toolkit";

interface RecordStateType {
    studentName: string,
    studentsRecord: any,
    studentClasses: null | string[],
    students: null | string[],
}

const recordState: string | null = localStorage.getItem("RECORD_STATE");

let initialState = {
    studentName: "",
    studentsRecord: null,
    studentClasses: null,
    students: null
} as RecordStateType

if (typeof recordState === "string") {
    initialState = JSON.parse(recordState);
}

export const schoolSlice = createSlice({
    name: "school",
    initialState,
    reducers: {
        setStudentName: (state, action) => {
            state.studentName = action.payload;
            const updateState = {
                ...initialState,
                studentName:  action.payload
            };
            localStorage.setItem("RECORD_STATE", JSON.stringify(updateState));
        },
        setStudentsRecord: (state, action) => {
            state.studentsRecord = action.payload;
            const updateState = {
                ...initialState,
                studentsRecord:  action.payload
            };
            localStorage.setItem("RECORD_STATE", JSON.stringify(updateState));
        },
        setStudentClasses: (state, action) => {
            state.studentClasses = action.payload;
            const updateState = {
                ...initialState,
                studentClasses:  action.payload
            };
            localStorage.setItem("RECORD_STATE", JSON.stringify(updateState));
        },
        setStudents: (state, action) => {
            state.students = action.payload;
        }
    }
});

export const {
    setStudentName, 
    setStudentsRecord, 
    setStudentClasses,
    setStudents
} = schoolSlice.actions;
export default schoolSlice.reducer;