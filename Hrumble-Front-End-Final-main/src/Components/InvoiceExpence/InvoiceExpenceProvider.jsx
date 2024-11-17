import{ useEffect, useState} from 'react';
import axios from 'axios';
// import { ExpenceApi } from '../../api';
import Context from './index';
import { BASE_URL } from '../../Utils/api';

const InvoiceExpenceProvider =(props) => {
    const [expence, setExpence] = useState([]);
    const [expenceAddemployee, setExpenceSelectEmployee] = useState([]);
    const [addexpensebutton, setAddexpenceButton] = useState(false);

    const fetchExpence = async () => {

        let api="https://apiv1.technoladders.com/api/v1/job"
        try {
            await axios.get(api).then((resp) => {
                setExpence(resp.data.data);
            });
        } catch (error) {
            console.log('error', error);
        }
    };
    const fetchExpenceAddinit = async () => {

        let api=`${BASE_URL}/employee/invoiceselect`
        try {
            await axios.get(api).then((resp) => {
                setExpenceSelectEmployee(resp.data.data);
            });
        } catch (error) {
            console.log('error', error);
        }
    };

 const handleAddExpense=()=>{
    setAddexpenceButton(true)
 }



    // useEffect(() => {
    //     console.log('Component rendered');
    //     fetchExpence();
    // },[setExpence]);

    return (
        <Context.Provider
            value={{
                ...props,
                expence,
                fetchExpenceAddinit,
                expenceAddemployee,
                handleAddExpense,
                addexpensebutton,
                
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default InvoiceExpenceProvider;
