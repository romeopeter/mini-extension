import Airtable from "airtable";
import { AirtableBase } from "airtable/lib/airtable_base";
import { store } from "./redux/store";
import {setStudentsRecord, setStudentClasses, setStudents} from "./redux/studentBoardSlice";

function useAirtableClient() {

    const apiKey: string = process.env.REACT_APP_API_KEY as string;
    const baseAccessKey: string = process.env.REACT_APP_BASE_ACCESS_KEY as string;

    const _base = () => {
        Airtable.configure({
            endpointUrl: 'https://api.airtable.com',
            apiKey: apiKey
        });

        return Airtable.base(baseAccessKey);
    }
    const TABLE: AirtableBase = _base();
    const dispatch = store.dispatch

    const fetchClassRecord = (studentName: string): void => {
        TABLE("Classes").select({ 
            filterByFormula: `SEARCH('${studentName}', {Students})` 
        }).firstPage((err, records) => {
            if (err) console.log(err);

            const data: any[] = [];

            records?.forEach(record => {
                data.push(record.get("Name"));
            })

            dispatch(setStudentClasses(data));
        })
    };

    const fetchStudentsRecord = async () => {
        interface studentRecordType {
            name: string,
            class: []
        }
       

        const table = await TABLE("Students").select({
            fields: ["Name", "Classes"],
        });

        let studentRecord: studentRecordType[];
 
        table.firstPage((err, records) => {
            if (err) console.log(err);

            const data: studentRecordType[] = [];
            
            records?.forEach(record => {

                const fields = {
                    name: record.get("Name"),
                    class: record.get("Classes")
                } as studentRecordType;
    
                data.push(fields);
            });

            studentRecord = data

            if (studentRecord.length === records?.length) {
                dispatch(setStudentsRecord(studentRecord));
            }
        });

    }

    const fetchStudentInClasses = (formula: string): void => {

        TABLE("Students").select({
            filterByFormula: `AND(${formula})`
        }).firstPage((err, records) => {
            if (err) console.log(err);

            const data: any[] = [];

            records?.forEach(record => {
                data.push(record.get("Name"));
            });

            dispatch(setStudents(data));
        });
    }

    return {fetchStudentsRecord, fetchClassRecord, fetchStudentInClasses}
}

export default useAirtableClient;
