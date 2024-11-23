import{  useState} from 'react';
import axios from 'axios';
// import { ExpenceApi } from '../../api';
import Context from './index';
// import { BASE_URL } from '../../Utils/api';
import { notification } from 'antd';
import CookieUtil from '../../Utils/Cookies';

const BASE_URL = import.meta.env.VITE_BASE_URL; 
 
const InvoiceExpenceProvider =(props) => {
    const [expence, setExpence] = useState([]);
    const [others, setOthers] = useState([]);
    const [expenceOthersSelect, setExpenceOthersSelect] = useState([]);
    const [expenceOthersSub, setExpenceOthersSub] = useState([]);
    const [expenceSelect, setExpenceSelect] = useState([]);
    const [invoice, setInvoice] = useState([]);
    const [invoicedata, setInvoicedata] = useState([]);
    const [expencegraph, setExpencegraph] = useState({});
    const [expenceothers, setExpencothers] = useState({});
    const [invoiceSingle, setInvoiceSingle] = useState({});
    const [expenceOthersChart, setExpenceOthersChart] = useState({});
    const [invoiceGraph, setInvoicegraph] = useState({});
    const [editExpence, setEditExpence] = useState({});
    const [editInvoice, setedit] = useState({});
    const [expencePie, setExpencePie] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [expenceEditPopup, setExpenceEditPopup] = useState(false);
    const [invoiceFilter, setinvoiceFilter] = useState("Year");
    const [othersId, setOtherId] = useState("");
    const [recordopen, setRecordOpen] = useState(false);
    const [customPopup, setCuatomPopup] = useState(false);
    const [InvoiceLoading, setInvoiceLoading] = useState(false);
    const [expenceAddemployee, setExpenceSelectEmployee] = useState([]);
    const [addexpensebutton, setAddexpenceButton] = useState(false);
    const [addinvoicebutton, setAddinvoiceButton] = useState(false);
    const [clientSelect, setClientSelect] = useState([]);
    const [clientSent, setClientsent] = useState([]);
    const [paymentdata, setPaymentdata] = useState([]);
    const [range, setRange] = useState("");
    const [date, setdate] = useState("");
    const [paginationExpence,setPaginationExpence ] = useState({ current: 1, pageSize: 10, total:10 });
    const [paginationExpenceOthers,setPaginationExpenceOthers ] = useState({ current: 1, pageSize: 10, total:10 });

    const token =CookieUtil.get("admin_token")
   
    const fetchExpence = async () => {
 
        let api=`${BASE_URL}/expense`
        let graphapi=`${BASE_URL}/expense/graph`
        let piecharthapi=`${BASE_URL}/expense/others`
        setLoading(true)
        try {
            await axios.get(api).then((resp) => {
                setExpence(resp.data.data);
            });
            await axios.get(graphapi).then((resp) => {
                setExpencegraph(resp.data.data);
            });

            await axios.get(piecharthapi).then((resp) => {
                setExpencothers(resp.data.data);
        setLoading(false)

            });
          
        } catch (error) {
            console.log('error', error);
        setLoading(false)
 
        }
    };
    const fetchinvoicedata = async(filter,range,date)=>{
        let graphapi=`${BASE_URL}/invoice/invoicecard`
        let invoicedata=`${BASE_URL}/invoice/invoicedata/`
        let invoicegraph=`${BASE_URL}/invoice/graph/`
        setLoading(true)

        setinvoiceFilter(filter)
       
          
          if(filter =="Year"){
            let params ={
                status:"All",
                time_interval:"Year"
            }
            //  setinvoiceFilter(filter)
            await axios.get(invoicedata,{
                params
            }).then((resp) => {
                setInvoice(resp.data.data);
        setLoading(false)

            });
            await axios.get(graphapi,{
                params
            }).then((resp) => {
                setInvoicedata(resp.data.data);
        setLoading(false)

            });
            await axios.get(invoicegraph,{
                params
            }).then((resp) => {
                 setInvoicegraph(resp.data.data);
        setLoading(false)

            });
          }
          if(filter =="Month"){

            let params ={
                status:"All",
                time_interval:"Month"
            }
            await axios.get(invoicedata,{
                params
            }).then((resp) => {
                setInvoice(resp.data.data);
        setLoading(false)

            });
            await axios.get(graphapi,{
                params
            }).then((resp) => {
                setInvoicedata(resp.data.data);
        setLoading(false)

            });
            await axios.get(invoicegraph,{
                params
            }).then((resp) => {
                 setInvoicegraph(resp.data.data);
        setLoading(false)

            });
          }
          if(filter =="Week"){
            let params ={
                status:"All",
                time_interval:"Week"
            }
            await axios.get(invoicedata,{
                params
            }).then((resp) => {
                setInvoice(resp.data.data);
        setLoading(false)

        

            });
            await axios.get(graphapi,{
                params
            }).then((resp) => {
                setInvoicedata(resp.data.data);
        setLoading(false)

            });

            await axios.get(invoicegraph,{
                params
            }).then((resp) => {
                 setInvoicegraph(resp.data.data);
        setLoading(false)

            });
          }
          if(filter =="Today"){
            let params ={
                status:"All",
                time_interval:"Today"
            }
            await axios.get(invoicedata,{
                params
            }).then((resp) => {
                setInvoice(resp.data.data);
        setLoading(false)

            });
            await axios.get(graphapi,{
                params
            }).then((resp) => {
                setInvoicedata(resp.data.data);
        setLoading(false)

            });
          }
          if(filter == "Custom"){
             if(range == "Yearly Wise"){
                let params ={
                    status:"All",
                    time_interval:"Year"
                }
                //  setinvoiceFilter(filter)
                await axios.get(invoicedata,{
                    params
                }).then((resp) => {
                    setInvoice(resp.data.data);
            setLoading(false)
    
                });
                await axios.get(graphapi,{
                    params
                }).then((resp) => {
                    setInvoicedata(resp.data.data);
            setLoading(false)
    
                });
             }
             if(range == "Monthly Wise"){
                let params ={
                    status:"All",
                    time_interval:"Custom",
                    range :range,
                    date,
                }
                //  setinvoiceFilter(filter)
                await axios.get(invoicedata,{
                    params
                }).then((resp) => {
                    setInvoice(resp.data.data);
            setLoading(false)
    
                });
                await axios.get(graphapi,{
                    params
                }).then((resp) => {
                    setInvoicedata(resp.data.data);
            setLoading(false)
    
                });  
             }
             if(range == "WeeklyWise"){
                let params ={
                    status:"All",
                    time_interval:"Custom",
                    range :range,
                    date,
                }
                //  setinvoiceFilter(filter)
                await axios.get(invoicedata,{
                    params
                }).then((resp) => {
                    setInvoice(resp.data.data);
            setLoading(false)
    
                });
                await axios.get(graphapi,{
                    params
                }).then((resp) => {
                    setInvoicegraph(resp.data.data);
            setLoading(false)
    
                }); 
             } 
             
           
          }
    }
    const fetchexpencedata = async(filter)=>{
        
        let invoicedataSalary=`${BASE_URL}/expense/expensedata`
         let invoicedataOthers=`${BASE_URL}/expense/othersdata`
        let graphapi=`${BASE_URL}/expense/graph`
        let piecharthapi=`${BASE_URL}/expense/others`
        setLoading(true)

        setinvoiceFilter(filter)
         let othersParams ={
            time_interval:filter,
            range,
            date,
            page:paginationExpenceOthers?.current,
            limit:paginationExpenceOthers?.pageSize
         }
       
        let params ={
            
            time_interval:filter,
            range,
            date,
            page:paginationExpence?.current,
            limit:paginationExpence?.pageSize
        }
        await axios.get(invoicedataSalary,{
            params:othersParams
        }).then((resp) => {
            setExpence(resp.data.data.data);
            setPaginationExpence ({...paginationExpence,total:resp.data.data.total});
           

        });
        await axios.get(invoicedataOthers,{
            params
        }).then((resp) => {
            setOthers(resp.data.data.data);
            setPaginationExpenceOthers ({...paginationExpenceOthers,total:resp.data.data.total});
           

        });

        // await axios.get(invoicedataOthers,{
        //     params
        // }).then((resp) => {
        //     setExpenceOthers(resp.data.data.data);
        //     setPaginationExpenceO ({...paginationExpence,total:resp.data.data.total});
           

        // });

        await axios.get(graphapi,{params}).then((resp) => {
            setExpencegraph(resp.data.data);
        });

        await axios.get(piecharthapi,{params}).then((resp) => {
            setExpencothers(resp.data.data);
    setLoading(false)
        })
         
          
            //  setinvoiceFilter(filter)
            
          
        
    }


     const FetstatusInvoice = async (status)=>{
        let api=`${BASE_URL}/invoice/invoicedata`
       
        setInvoiceLoading(true)
        try {
             let params ={
                 status:status ,
                 time_interval:invoiceFilter

             }
             if(invoiceFilter == "Custom"){
                 params.range =range,
                 params.date=date
             }
            await axios.get(api,{params}).then((resp) => {
                setInvoice(resp.data.data);
        setInvoiceLoading(false)

            });
          
        } catch (error) {
            console.log('error', error);
        setLoading(false)
 
        }
     }
    const fetchInvoice = async () => {
 
        let api=`${BASE_URL}/invoice`
        let graphapi=`${BASE_URL}/invoice/invoicecard`
        let piecharthapi=`${BASE_URL}/expense/piechart`
        setLoading(true)
        try {
            await axios.get(api).then((resp) => {
                setInvoice(resp.data.data);
            });
            await axios.get(graphapi).then((resp) => {
                setInvoicedata(resp.data.data);
            });
          
        } catch (error) {
            console.log('error', error);
        setLoading(false)
 
        }
    };
    const fetchExpenceAddinit = async () => {
 
        let api=`${BASE_URL}/employee/invoiceselect`
        let apiothersSelect=`${BASE_URL}/expense/getselectOthers`
        try {
            await axios.get(api).then((resp) => {
                setExpenceSelectEmployee(resp.data.data);
            });
            await axios.get(apiothersSelect).then((resp) => {
                setExpenceOthersSelect(resp.data.data);
            });
        } catch (error) {
            console.log('error', error);
        }
    };
    const handleviewInvoice = async (id) => {
 
        let api=`${BASE_URL}/invoice/${id}`
        let apiPayment=`${BASE_URL}/payment-records/`
         let params ={
             invoice_id:id
         }
        try {
            // setInvoiceLoading(true)
            await axios.get(api).then((resp) => {
                setInvoiceSingle(resp.data.data)
                // setInvoiceLoading(false)
                // setExpenceSelectEmployee(resp.data.data);
            });
            await axios.get(apiPayment,{params}).then((resp) => {
                setPaymentdata(resp.data.data)
                // setInvoiceLoading(false)
                // setExpenceSelectEmployee(resp.data.data);
            });

        } catch (error) {
            setInvoiceLoading(false)
 
            console.log('error', error);
        }
    };
 
 const handleAddExpense=()=>{
    setAddexpenceButton(true)
 }
 
  const handleFinishExpence= async(values,form,edit,dreawrClose)=>{
    const apiCreate=`${BASE_URL}/expense/`
    const apiupadte=`${BASE_URL}/expense/${editExpence?._id}`


    if(edit){
        await axios.put(apiupadte,values,{
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers if needed
            },})
             .then((response)=>{
                 if(response){
                    notification.success({
                        message: response?.data?.message,
                        duration:1,
                      });
                    setAddexpenceButton(false)
                    dreawrClose()
                 
                    fetchexpencedata(invoiceFilter)
                    form.resetFields();
     
     
                 }
           
                })  
             .catch((err)=>{
                setAddexpenceButton(false)
                notification.error({
                    message: err?.data?.message,
                    duration:1,
                  });
                console.log(err)
               
     
             }
             )
    }
    else{
        axios.post(apiCreate,values,{
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers if needed
            },})
             .then((response)=>{
                 if(response.status===201){
                    notification.success({
                        message: response?.data?.message,
                        duration:1,
                      });
                    setAddexpenceButton(false)
                 
                    fetchexpencedata(invoiceFilter)
                   
                    form.resetFields();
     
     
                 }
           
                })  
             .catch((err)=>{
                setAddexpenceButton(false)
                notification.error({
                    message: err?.data?.message,
                    duration:1,
                  });
                console.log(err)
               
     
             }
             )
    }


  }
  const handlesendInvoice= async(values,form)=>{
    const apiCreate=`${BASE_URL}/invoice`
    setAddinvoiceButton(true)
    axios.post(apiCreate,values,{
        headers: {
          Authorization: `Bearer ${token}`,
          // Other headers if needed
        },})
         .then((response)=>{
             if(response.status===201){
                notification.success({
                    message: response?.data?.message,
                    duration:1,
                  });
                  setAddinvoiceButton(false)
             
                fetchInvoice()
                form.resetFields();
 
 
             }
       
            })  
         .catch((err)=>{
            setAddinvoiceButton(false)
            notification.error({
                message: err?.data?.message,
                duration:1,
              });
            console.log(err)
           
 
         }
         )
  }
 
 
   const fethSelect= async()=>{
     let clientSelect = `${BASE_URL}/clients/getselect`
     try {
        await axios.get(clientSelect).then((resp) => {
            setClientSelect(resp.data.data);
        });
    } catch (error) {
        console.log('error', error);
    }
   }
 
    const fetchcontact= async(id)=>{
        let clientsent = `${BASE_URL}/clients/saveandsent/${id}`
        try {
           await axios.get(clientsent).then((resp) => {
               setClientsent(resp.data.data);
           });
       } catch (error) {
           console.log('error', error);
       }
      }

      const handleviewExpence= async(id)=>{
         console.log("id",id)
        let viewExpence = `${BASE_URL}/expense/${id}`
        try {
           await axios.get(viewExpence).then((resp) => {
               setEditExpence(resp.data.data);
           });
       } catch (error) {
           console.log('error', error);
       }
      }

     const handleClickSerach=async(filter)=>{
         if(filter == "Expense"){
            fetchexpencedata("Custom",range,date)
        setCuatomPopup(!customPopup)

         }
         else{
            fetchinvoicedata("Custom",range,date)
            setCuatomPopup(!customPopup)
         }
      

     }
   
 

     const openCustompopup =()=>{
        setCuatomPopup(!customPopup)
         
     }   
      const handleopenpaymnet =()=>{
        setRecordOpen(true)
     }
   const handleClosepaymnet =()=>{
    setRecordOpen(!recordopen)
        
   }

    const handleOpenEditExpence =()=>{
         setExpenceEditPopup(!expenceEditPopup)
    }

    const handleExpenceOthers = async(id)=>{
        let apiothersSelect=`${BASE_URL}/expense/getselectOthers`
        let params ={
             parent_id:id
        } 
         setOtherId(id)
        
        try {
          
            await axios.get(apiothersSelect,{params}).then((resp) => {
                setExpenceSelect(resp.data.data);
            });
        } catch (error) {
            console.log('error', error);
        }

    }


     const handleAddOtherType =(values)=>{
        const apiCreate=`${BASE_URL}/expense/otherstypeAdd`
        let send ={
            ...values,
            parent_id:othersId
   
       }
        axios.post(apiCreate,send,{
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers if needed
            },})
             .then((response)=>{
                handleExpenceOthers(othersId)
           
                })  
             .catch((err)=>{
               
                console.log(err)
               
     
             }
             )
     }

     const handleSendRecordPayment =(values)=>{
        const apiCreate=`${BASE_URL}/payment-records/`
         let send ={
             ...values,
             invoice_id:invoiceSingle?._id,
             client_id:invoiceSingle?.client_id?._id,
             payment_date:values["payment_date"]?.$d
         }
        axios.post(apiCreate,send,{
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers if needed
            },})
             .then((response)=>{
                handleClosepaymnet()
                // handleExpenceOthers(othersId)
           
                })  
             .catch((err)=>{
               
                console.log(err)
               
     
             }
             )
     }

     const handleChangestatus =(id)=>{
        const apiCreate=`${BASE_URL}/invoice/${id}`
         let send ={
              status:"Draft"
         }
        axios.put(apiCreate,send,{
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers if needed
            },})
             .then((response)=>{
             fetchinvoicedata("Year")
                // handleExpenceOthers(othersId)
           
                })  
             .catch((err)=>{
               
                console.log(err)
               
     
             }
             )
     }


      const fetchExpenseOthersSub =async(id)=>{
        const apiOthersSub=`${BASE_URL}/expense/getselectOthersSub`
        let params ={
            parent_id:id
        } 
        try {

            await axios.get(apiOthersSub,{params}).then((resp) => {
                setExpenceOthersSub(resp.data.data.data);
                setExpenceOthersChart(resp.data.data.send);
            });
        } catch (error) {
            console.log('error', error);
        }
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
                expencegraph,
                handleFinishExpence,
                fetchExpence,
                expencePie,
                Loading,
                clientSelect,
                fethSelect,
                fetchcontact,
                clientSent,
                handlesendInvoice,
                addinvoicebutton,
                fetchInvoice,
                handleviewInvoice,
                invoice,
                invoiceSingle,
                InvoiceLoading,
                handleopenpaymnet,
                recordopen,
                handleClosepaymnet,
                fetchinvoicedata,
                FetstatusInvoice,
                fetchexpencedata,
                expenceothers,
                paginationExpence,
                setPaginationExpence,
                openCustompopup,
                customPopup,
                handleChangestatus,
                setRange,
                range,
                handleClickSerach,
               
                invoicedata,
                setdate,
                invoiceGraph,
                editExpence,
                handleOpenEditExpence,
                expenceEditPopup,
                setEditExpence,
                handleviewExpence,
                expenceOthersSelect,
                expenceSelect,
                handleExpenceOthers,
                handleAddOtherType,
                fetchExpenseOthersSub,
                expenceOthersSub,
                expenceOthersChart,
                setedit,
                editInvoice,
                handleSendRecordPayment,
                paymentdata,
                paginationExpenceOthers,
                setPaginationExpenceOthers,
                others,
                date
            }}
        >
            {props.children}
        </Context.Provider>
    );
}
 
export default InvoiceExpenceProvider;