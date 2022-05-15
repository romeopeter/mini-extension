import {createSlice} from "@reduxjs/toolkit";

interface RecordStateType {
    studentName: string,
    studentsRecord: any,
    studentClasses: {name: string, classes: string[]},
}

const recordState: string | null = localStorage.getItem("RECORD_STATE");

let initialState = {
    studentName: "",
    studentsRecord: [],
    studentClasses: {
        name: "",
        classes: []
    }
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
        setClassesRecord: (state, action) => {
            state.studentsRecord = action.payload;
        },
    }
});

export const {setStudentName, setStudentsRecord, setClassesRecord} = schoolSlice.actions;
export default schoolSlice.reducer;