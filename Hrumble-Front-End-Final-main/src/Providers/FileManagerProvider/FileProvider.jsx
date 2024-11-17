import React, { useEffect, useState} from 'react';
import axios from 'axios';
// import { FaqApi } from '../../api';
import Context from './index';
import { BASE_URL } from '../../Utils/api';
import CookieUtil from '../../Utils/Cookies';


const FileProvider =(props) => {
    
    const [Loading, setLoading] = useState(false);

    const [employeeDoc,setEmployeeDoc] = useState([]);
    
    const [employeeLogindata, setEmployeeLoginData]=useState([]);
    const [employeeFull,setEmployeeFull]=useState({});
    const [employeeByID,SetEmployeeByID]=useState({});
    const [employeeExperi,setEmployeeExperi]= useState({});
    const [sowClient,setSowClient]=useState([]);
    const [sowProject,setSowProject]=useState([]);
    const [sowEmployee,setSowEmployee]=useState([]); 
    const [clientSingle,setClientSingle]=useState({});
    const [timesheetDoc,setTimesheetDoc]=useState([]); 
    const [accInvoice,setAccInvoice]=useState([]); 
    const [accExpense,setAccExpense]=useState([]); 

  const [fileOpen,setFileOpen]= useState(false);


    const token =CookieUtil.get("admin_token")

    const fetchFileEmploy = async () => {
       
        let employeeDocApi=`${BASE_URL}/file-mngr`

        try {
            setLoading(true)
          
            // await axios.get(employeeDocApi).then((resp) => {
            //     setInterview(resp.data.data);
            // });
            await axios.get(employeeDocApi,).then((resp) => {
                    setEmployeeDoc(resp.data.data)
                    setLoading(false)
            });
            

        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
    };

    const FetchEmployeeTable = async () => {

        let employeeApi = `${BASE_URL}/file-mngr/employee`
        
        try {
            setLoading(true)
          
            await axios.get(employeeApi).then((resp) => {
              console.log("resp.data.data",resp.data.data)
              setEmployeeLoginData(resp.data.data)
              
            });
            setLoading(false)
            
        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
      }; 

      const fetchEmployByID = async (id) => {

        console.log("iddddd",id)

        let employeebyIdApi = `${BASE_URL}/employee/${id}`
        
        try {
            setLoading(true)
    
            await axios.get(employeebyIdApi).then((resp) => {
              console.log("resp.data.data",resp.data.data)
              SetEmployeeByID(resp.data.data)
              
            });

            setLoading(false)
            
        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
    };

    const fetchEmployFull = async (id) => {

        console.log("iddddd",id)

        let employeebyIdApi = `${BASE_URL}/employee/${id}`

        let employeeExper = `${BASE_URL}/work-experience`

        let params = {
            employee_id: id,
        }

        
        try {
            setLoading(true)
    
            await axios.get(employeebyIdApi).then((resp) => {
              console.log("resp.data.data",resp.data.data)
              setEmployeeFull(resp.data.data)
              
            });

            await axios.get(employeeExper,{params}).then((resp) => {
                console.log("resp.data.data",resp)
                setEmployeeExperi(resp.data.data)
                
              });

            setLoading(false)
            
        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
    }; 

    const FetchSowClient = async (id) => {

        let sowClient = `${BASE_URL}/file-mngr/clients`

        let params = {
            employee_id: id,
        }
        
        try {
            setLoading(true)
          
            await axios.get(sowClient).then((resp) => {
              console.log("resp.data.data",resp.data.data)
              setSowClient(resp.data.data)
              
            });

            setLoading(false)
            
        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
      }; 

    const FetchSowProject = async (id) => {

        let sowProject = `${BASE_URL}/file-mngr/projectemployees/${id}`

        let clientSingle = `${BASE_URL}/clients/${id}`

        let params = {
            // employee_id: id,
        }
        
        try {
            setLoading(true)
    
            await axios.get(sowProject,{params}).then((resp) => {
                console.log("resp.data.data",resp.data.data)
                setSowProject(resp.data.data)
              });

              await axios.get(clientSingle,{params}).then((resp) => {
                console.log("resp.data.data",resp.data.data)
                setClientSingle(resp.data.data)
              });

            setLoading(false)
            
        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
      }; 

    const FetchSowEmployee = async (id) => {

        let sowEmployee = `${BASE_URL}/file-mngr/employee/${id}`

        let params = {
            // employee_id: id,
        }
        
        try {
            setLoading(true)
    
            await axios.get(sowEmployee,{params}).then((resp) => {
                console.log("resp.data.data",resp.data.data)
                setSowEmployee(resp.data.data)
                
              });

            setLoading(false)
            
        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
      }; 

    const FetchTimesheet = async (year,month) => {

        let timesheet = `${BASE_URL}/file-mngr/timesheet/${employeeFull?._id}`

        let params = {
            year,month
        }
        
        try {
            setLoading(true)
    
            await axios.get(timesheet,{params}).then((resp) => {
                console.log("resp.data.data",resp.data.data)
                setTimesheetDoc(resp.data.data)
                
              });

            setLoading(false)
            
        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
      }; 

      const FetchInvoice = async (year,month) => {

        let invoiceApi = `${BASE_URL}/file-mngr/invoice`

        let params = {
            year,month
        }
        
        try {
            setLoading(true)
    
            await axios.get(invoiceApi,{params}).then((resp) => {
                console.log("resp.data.data",resp.data.data)
                setAccInvoice(resp.data.data)
                
              });

            setLoading(false)
            
        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
      }; 

      const FetchExpense = async (year,month) => {

        let expenseApi = `${BASE_URL}/file-mngr/expense`

        let params = {
            year,month
        }
        
        try {
            setLoading(true)
    
            await axios.get(expenseApi,{params}).then((resp) => {
                console.log("resp.data.data",resp.data.data)
                setAccExpense(resp.data.data)
                
              });

            setLoading(false)
            
        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
      }; 
   

    return (
        <Context.Provider
            value={{
                ...props,
                employeeDoc,
                employeeLogindata,
                employeeFull,
                employeeByID,
                employeeExperi,
                sowClient,
                sowProject,
                clientSingle,
                sowEmployee,
                timesheetDoc,
                fileOpen,
                accInvoice,
                accExpense,
                setFileOpen,
                FetchEmployeeTable,
                fetchEmployByID,
                FetchInvoice,
                FetchExpense,
                fetchFileEmploy,
                fetchEmployFull,
                FetchSowClient,
                FetchSowProject,
                FetchSowEmployee,
                FetchTimesheet,
            
                Loading
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default FileProvider;