import  { useContext, useState } from 'react'
import { DownloadOutlined } from '@ant-design/icons';
 
 
import Moment from 'moment';
import html2pdf from 'html2pdf.js';
import { Button,Card, Collapse,  Empty, Select } from 'antd';
import InvoiceExpenceContext from '../../../Providers/InvoiceExpence';
import Loader from './../../../Utils/Loader';
import dayjs from "dayjs"
 
export default function InvoiceDetails({setDrawerInvoice}) {
   const {paymentdata,invoiceSingle,InvoiceLoading,handleopenpaymnet}=useContext(InvoiceExpenceContext)
   console.log("invoiceSingle",invoiceSingle)
   const daysOverdue = Math.floor((new Date() - new Date(invoiceSingle?.due_date)) / (1000 * 60 * 60 * 24));
  const [invoiceStat,setInvoiceStat] = useState("Pending")
 
  const [invoiceDetails,setInvoiceDetails] = useState({
    "invoiceStat":""
  })
 
  const [termsOptions,setTermsOptions] = useState([
    { value: "net30",label: 'Net 30',"numeric": 30 },
    { value: "net45",label: 'Net 45',"numeric": 45 },
    { value: "net60",label: 'Net 60',"numeric": 60 },
  ])
 
  const [taxOptions,setTaxOptions] = useState([
    {
      value: "igst0",
      label: 'IGST0',
      "numeric":0
    },
    {
      value: "igst5",
      label: 'IGST5',
      "numeric":0.05
    },
    {
      value: "igst12",
      label: 'IGST12',
      "numeric":0.12
    },
    {
      value: "igst18",
      label: 'IGST18',
      "numeric":0.18
    },
    {
      value: "igst28",
      label: 'IGST28',
      "numeric":0.28
    },
  ])
 
  const [tdsOptions,setTDSOptiosn] = useState([
    {
      value:"commission-or-brokerage",
      label:"Commission or Brokerage",
      "numeric":0.05
    },
    {
      value:"commission-or-brokerage-(reduced)",
      label:"Commission or Brokerage (Reduced)",
      "numeric":0.0375
    },
    {
      value:"dividend",
      label:"Dividend",
      "numeric":0.1
    },
    {
      value:"dividend-(reduced)",
      label:"Dividend (Reduced)",
      "numeric":0.075
    },
    {
      value:"other-interest-than-securities",
      label:"Other interest than securities",
      "numeric":0.1
    },
    {
      value:"Other-interest-than-securities-(reduced)",
      label:"Other interest than securities (Reduced)",
      "numeric":0.075
    },
  ])
 
  const getMapValue = (array_name,textValue,returnFeild) => {
 
    let returnValue = 0
 
    let res = array_name.filter((element)=>(element["value"]===textValue))
 
    if(res.length){
      returnValue = res[0][returnFeild]
    }
 
    //console.log(array_name,textValue,numericValue)
 
    return returnValue;
  }
 
//   const getInvoiceDetailsById = async (invoice_id) => {
 
//     let get_id_url = APIConstClass.mongo_url + "api/v1/invoice/"+invoice_id
 
//     let response_data = await axios.get(get_id_url).then((response)=>{
 
//       let dataBody = response?.data?.data
 
//       if(dataBody){
//         console.log("output:",dataBody)
//         setInvoiceDetails(dataBody)
//       }
 
//     }).catch((err)=>{console.log(err)})
 
//   }
 
//   useEffect(()=>{
 
//     if(props.invoiceId!==""){
//       console.log("detail drawer:",props.invoiceId)
//       getInvoiceDetailsById(props.invoiceId)
//     }
 
//   },[props.invoiceId])
 
  const items = [
    {
      key: '1',
      extra: <label onClick={()=>{
        setDrawerInvoice(false)
        handleopenpaymnet()}}>+ Record Payment</label>,
      label: `Payments Received:${paymentdata?.length|| 0}  `,
      children:<table className='table card-table border-no success-tbl'>
        <thead>
          <tr>
            <th>Sl#</th>
            {/* <th>Id</th> */}
            <th>Date</th>
            <th>Amount</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {
            paymentdata?.map((payment,index)=>{
              return(
                <tr>
                  <td>{index+1}</td>
                  {/* <td>{payment?._id}</td> */}
                  <td>{dayjs(payment?.payment_date).format('DD-MM-YYYY')}</td>
                  {/* <td>{payment?.total_amount / payment?.exchange_rate}</td> */}
                  <td style={{
                    textAlign:'left'
                  }}>{payment?.total_amount}</td>
                  {/* <td></td> */}
              </tr>
              )
            })
          }
        </tbody>
      </table> ,
    },
  ];
 
  const handleDownloadPDF = () => {
    const element = document.getElementById('pdf-content');
 
    html2pdf(element, {
      margin:       0.3,
      filename:     'document.pdf',
      image:        { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 1 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    });
  };
 
  function convertAmountToWords(amount) {
    const singleDigits = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
 
    function convertThreeDigitNumber(num) {
        let str = '';
 
        if (num >= 100) {
            str += singleDigits[Math.floor(num / 100)] + ' Hundred ';
            num %= 100;
        }
 
        if (num >= 20) {
            str += tens[Math.floor(num / 10)] + ' ';
            num %= 10;
        } else if (num >= 10) {
            return str + teens[num - 10] + ' ';
        }
 
        if (num > 0) {
            str += singleDigits[num] + ' ';
        }
 
        return str;
    }
 
    if (amount === 0) {
        return 'Zero';
    }
 
    let words = '';
    console.log("amount",amount)
    const crore = Math.floor(amount / 10000000);
    const lakhs = Math.floor((amount % 10000000) / 100000);
    const thousands = Math.floor((amount % 100000) / 1000);
    const hundreds = amount % 1000;
 
    if (crore > 0) {
        words += convertThreeDigitNumber(crore) + 'Crore ';
    }
 
    if (lakhs > 0) {
        words += convertThreeDigitNumber(lakhs) + 'Lakh ';
    }
 
    if (thousands > 0) {
        words += convertThreeDigitNumber(thousands) + 'Thousand ';
    }
 
    if (hundreds > 0) {
        words += convertThreeDigitNumber(hundreds);
    }
 
    return words.trim();



}
 
 
function formatIndianCurrency(amount) {
  // Convert amount to string (in case it's not already)
  const amountStr = String(amount);

  // Split the amount into lakhs and crores parts
  let lakhs = amountStr.slice(-5); // Last 5 characters (for lakhs)
  let crores = amountStr.slice(0, -5); // Remaining characters (for crores)

  // Format lakhs part with commas
  if (lakhs.length > 3) {
      lakhs = lakhs.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  }

  // Combine lakhs and crores with a comma separator if crores part exists
  if (crores !== "") {
      return `${crores},${lakhs}`;
  } else {
      return lakhs;
  }
}
 
 
  return (
    // <div style={{ margin: '0 auto', width: '1000px' }}>
    //   <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    //     <tbody>
    //       {/* section1 */}
    //       <tr style={{ verticalAlign: 'middle', backgroundColor: '#f8f9ff' }}>
    //         <td style={{ padding: '12px' }}>
    //           <img src="https://zive2.technoladders.com/images/MicrosoftTeams-image.png" alt="" height="50" />
    //         </td>
    //         <td style={{ padding: '12px' }}>
    //           <h4 style={{ margin: '0 0 5px', textTransform: 'uppercase', fontWeight: 'bold', color: '#000', fontSize: '20px', textAlign: 'right' }}>
    //             Tax Invoice
    //           </h4>
    //           <h4 style={{ margin: '0 0 0px', textTransform: 'uppercase', fontWeight: 'bold', color: '#000', fontSize: '20px', textAlign: 'right' }}>
    //             #INV - 2580
    //           </h4>
    //         </td>
    //       </tr>
    //       {/* section2 */}
    //       <tr style={{ verticalAlign: 'top', backgroundColor: '#f8f9ff', border: '1px solid #f8f9ff' }}>
    //         <td style={{ padding: '12px', border: '1px solid #f8f9ff', padding: '20px 12px' }}>
    //           <p style={{ margin: '0 0 12px' }}>Technoladders Solutions Private Limited.</p>
    //           <p style={{ margin: '0 0 12px' }}>Old No 9 New No 17</p>
    //           <p style={{ margin: '0 0 12px' }}>Seethammal Rd, Sethammal Colony,</p>
    //           <p style={{ margin: '0 0 12px' }}>Alwarpet, Chennai, Tamilnadu 600018.</p>
    //           <p style={{ margin: '0 0 0px' }}>GSTIN 33AAACL2081B1ZT</p>
    //         </td>
    //         <td style={{ textAlign: 'right', padding: '12px', border: '1px solid #f8f9ff', padding: '20px 12px' }}>
    //           <div style={{ textAlign: 'right', display: 'flex', width: 'fit-content', margin: '0 0 0 auto' }}>
    //             <p style={{ margin: '0 0 12px', textAlign: 'left', width: '130px' }}>
    //               Invoice Date:
    //             </p>
    //             <p style={{ margin: '0 0 12px', textAlign: 'right', width: 'fit-content', fontWeight: 'bold', color: '#000' }}>
    //               24 Dec, 2022
    //             </p>
    //           </div>
    //           {/* ... truncated for brevity */}
    //         </td>
    //       </tr>
    //       {/* section3 */}
    //       <tr>
    //         <td style={{ padding: '20px 12px' }} colSpan="1.5">
    //           {/* ... truncated for brevity */}
    //         </td>
    //         <td style={{ padding: '20px 12px 20px 280px' }} colSpan="0.5">
    //           {/* ... truncated for brevity */}
    //         </td>
    //       </tr>
    //       {/* ... rest of the table ... */}
    //     </tbody>
    //   </table>
    // </div>
   
      InvoiceLoading  ?
      <Loader/>
      :
      <div className='container-fluid'>
    {
      daysOverdue>0 &&
      <div className='d_f a_i_c g_5 m_t_5'>
      <p className='overdue'></p>
      <p className=''> Overdue by : <span  style={{
        color:"red"
      }}> {daysOverdue} day</span></p>
    </div>
    }
 
      <div className='d_f j_c_s_b g_10 m_t_10'>
       
          <div className='d_f f_d_c g_20'>
            <table>
              <tbody>
              <tr>
                    <td
                     className='p_5'><label>Invoice Amount (₹):</label></td>
                    <td><label>{invoiceSingle?.total_amount}</label></td>
                </tr>
                <tr>
                    <td className='p_5'><label>Received (₹):</label></td>
                    <td className=''><label>0.00</label></td>
                </tr>
                <tr>
                    <td className='p_5'><label>Due (₹):</label></td>
                    <td><label>{Number(invoiceSingle?.total_amount||0)-Number(invoiceSingle?.paidAmount||0)}</label></td>
                </tr>
             
              </tbody>
            </table>
            {/* <div>
              <label >Invoice Amount (₹):</label><label>{invoiceDetails?.invoice_details?.total_bill}</label>
            </div>
            <div>
              <label>Received (₹):</label><label>0.00</label>
            </div>
            <div>
              <label>Due:</label><label>3,36,000.00</label>
            </div> */}
          </div>

          {/* <div className='green'>
             <Select
             style={{
              width: '110px',
             }}
             className='status_selectbox'
             defaultValue={"Sent"}
              options={
                [{
                  label:"Save",
                  value:"Save"
                },
                {
                  label:"Save and Sent",
                  value:"Save and Sent"
                },{
                  label:"Sent",
                  value:"Sent"
                },
              ]
              }
              />
 
             
          </div> */}
         <div>
         { invoiceSingle?.status == "Sent" ?
     <span className="badge badge-secondary light border-0 me-1">{invoiceSingle?.status}</span>
     :
     <span className="badge badge-success light border-0 me-1">{invoiceSingle?.status}</span>
           }
          </div>         
        {/* <div className='col-6'>
        <div className="dropdown d-inline ml-2">
            <button className={"dropdown-toggle badge badge-pill zive-pill-text mx-2 py-2 px-3 bg-secondary"}
                    type="button" id="dropdownMenu1" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                {invoiceDetails?.invoice_details?.invoice_status}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <a className="dropdown-item" >Sent</a>
                <a className="dropdown-item" >Overdue</a>
                <a className="dropdown-item" >Withheld</a>
                <a className="dropdown-item" >Paid</a>
                <a className="dropdown-item" >Draft</a>
            </div>
        </div>
        </div> */}
       
      </div>
      <div className='col_1 m_t_10'>
        <Collapse items={items} />
        </div>
 
      <div className='d_f j_c_f_e m_10'>
      <Button onClick={handleDownloadPDF} icon={<DownloadOutlined />} type="primary">
        Download PDF
      </Button>
      </div>
      <Card>
     <div id="pdf-content"
      style={{
        margin:"10px"
      }}>
     <table style={{ width: '100%', borderCollapse: 'collapse',  }}>
      <tbody>
        {/* section1 */}
        <tr style={{ verticalAlign: 'middle', backgroundColor: '#f8f9ff' }}>
          <td style={{ padding: '12px' }}>
            <img src="/images/logo.png" alt="" height="50" />
          </td>
          <td style={{ padding: '12px' }}>
            <h4 style={{
              margin: '0 0 5px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              color: '#000',
              fontSize: '20px',
              textAlign: 'right',
            }}>
              Tax Invoice
            </h4>
            <h4 style={{
              margin: '0 0 0px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              color: '#000',
              fontSize: '20px',
              textAlign: 'right',
            }}>
              {invoiceSingle?.invoice_number}
            </h4>
          </td>
        </tr>
        {/* section2 */}
        <tr style={{ verticalAlign: 'top', backgroundColor: '#f8f9ff', border: '1px solid #f8f9ff' }}>
          <td style={{ padding: '0px', border: '1px solid #f8f9ff', width:"500px" }}>
            <p style={{ margin: '0 0 10px', fontSize:"10" }}>Technoladders Solutions Private Limited.</p>
            <p style={{ margin: '0 0 10px' }}>Old No 9 New No 17</p>
            <p style={{ margin: '0 0 10px' }}>Seethammal Rd, Sethammal Colony,</p>
            <p style={{ margin: '0 0 10px' }}>Alwarpet, Chennai, Tamilnadu 600018.</p>
            <p style={{ margin: '0 0 10px' }}>GSTIN 33AAACL2081B1ZT</p>
          </td>
          <td style={{ textAlign: 'right', border: '1px solid #f8f9ff' }}>
            <div className='d_f j_c_f_e a_i_f_e '>
              <div className='col_2 g_5'>
              <p style={{ margin: '0 0 12px', textAlign: 'left', width: '130px' }}>
                Invoice Date :
                   
                   
 
                 
                 </p>
                <p style={{
                  margin: '0 0 12px',
                  textAlign: 'right',
                  width: 'fit-content',
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                  {Moment(invoiceSingle?.invoice_date).format(' DD-MM-YYYY')}
                </p>
                <p style={{ margin: '0 0 12px', textAlign: 'left', width: '130px' }}>
                Due Date :
                   
                   
 
                 
                 </p>
                <p style={{
                  margin: '0 0 12px',
                  textAlign: 'right',
                  width: 'fit-content',
               
 
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                  {Moment(invoiceSingle?.due_date).format(' DD-MM-YYYY')}
                </p>
                <p style={{ margin: '0 0 12px', textAlign: 'left', width: '130px' }}>
               Terms :
                   
                   
 
                 
                 </p>
                <p style={{
                  margin: '0 0 12px',
                  textAlign: 'right',
                  width: 'fit-content',
                justifyContent: 'flex start',
 
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                {
                  invoiceSingle?.terms
                }
                </p>
                <p style={{ margin: '0 0 12px', textAlign: 'left', width: '130px' }}>
               Amount Due:
                   
                   
 
                 
                 </p>
                <p style={{
                  margin: '0 0 12px',
                  textAlign: 'right',
                  width: 'fit-content',
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                  ₹
                {
                    formatIndianCurrency(invoiceSingle?.total_amount)
                }
                </p>
              </div>
            </div>
          {/* <div style={{
                textAlign: 'right',
                display: 'flex',
                justifyContent: 'center',
                width: 'fit-content',
                margin: '0 0 0 auto',
              }}>
                <p style={{ margin: '0 0 12px', textAlign: 'left', width: '130px' }}>
                Invoice Date
                   
                   
 
                 
                 </p>
                <p style={{
                  margin: '0 0 12px',
                  textAlign: 'right',
                  width: 'fit-content',
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                  {Moment(invoiceSingle?.invoice_date).format(' DD-MM-YYYY')}
                </p>
              </div>
              <div style={{
                textAlign: 'right',
                display: 'flex',
                width: 'fit-content',
                justifyContent: 'center',
 
                margin: '0 0 0 auto',
              }}>
             
              </div>
              <div style={{
                textAlign: 'right',
                display: 'flex',
                width: 'fit-content',
                justifyContent: 'center',
 
                margin: '0 0 0 auto',
              }}>
                <p style={{ margin: '0 0 12px', textAlign: 'left', width: '130px' }}>
               Terms:
                   
                   
 
                 
                 </p>
                <p style={{
                  margin: '0 0 12px',
                  textAlign: 'right',
                  width: 'fit-content',
                justifyContent: 'flex start',
 
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                {
                  invoiceSingle?.terms
                }
                </p>
              </div>
              <div style={{
                textAlign: 'right',
                display: 'flex',
                width: 'fit-content',
                justifyContent: 'center',
 
                margin: '0 0 0 auto',
              }}>
                <p style={{ margin: '0 0 12px', textAlign: 'left', width: '130px' }}>
               Amount Due:
                   
                   
 
                 
                 </p>
                <p style={{
                  margin: '0 0 12px',
                  textAlign: 'right',
                  width: 'fit-content',
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                {
                  invoiceSingle?.total_amount
                }
                </p>
              </div> */}
            {/* Invoice Date sections */}
            {/* {[1, 2, 3, 4].map((item,i) => (
              <div key={item} style={{
                textAlign: 'right',
                display: 'flex',
                width: 'fit-content',
                margin: '0 0 0 auto',
              }}>
                <p style={{ margin: '0 0 12px', textAlign: 'left', width: '130px' }}>
                  {
                    i == 0 ?
                    "Invoice Date:"
                    :
                    i == 1 ?
                    "Due Date:"
                    :
                    i==2 ?
                    "Terms:"
                    :
                    " Amount Due:"
 
                  }
                 </p>
                <p style={{
                  margin: '0 0 12px',
                  textAlign: 'right',
                  width: 'fit-content',
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                  24 Dec, 2022
                </p>
              </div>
            ))} */}
          </td>
        </tr>
        {/* section3 */}
        <tr>
          {/* Bill TO sections */}
          <td style={{ padding: '20px 12px', width:"50%" }} colspan="1.5">
            <h4 style={{
              margin: '0 0 15px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              color: '#000',
              fontSize: '20px',
              textAlign: 'left',
            }}>
              Bill TO
            </h4>
            {
              invoiceSingle?.client_id?.billing_address?.map((item)=>(
                 <>
                 {/* <p style={{ margin: '0 0 12px' }}>Technoladders Solutions Private Limited.</p> */}
                <p style={{ margin: '0 0 12px' }}>{item?.phone_no}</p>
 
                {/* <p style={{ margin: '0 0 12px' }}>{item?.attention}</p> */}
                <p style={{ margin: '0 0 13px' }}>{item?.city} {item?.state} {item?.zip_code}.</p>
                {/* <p style={{ margin: '0 0 0px' }}>GSTIN 33AAACL2081B1ZT</p> */}
               </>
              ))
            }
 
          </td>
          <td style={{ padding: '20px 12px' } } colspan="1.5">
            <h4 style={{
              margin: '0 0 15px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              color: '#000',
              fontSize: '20px',
              textAlign: 'left',
            }}>
              Ship TO
            </h4>
            {
              invoiceSingle?.client_id?.shipping_address?.map((item)=>(
                 <>
                 {/* <p style={{ margin: '0 0 12px' }}>Technoladders Solutions Private Limited.</p> */}
                <p style={{ margin: '0 0 12px' }}>{item?.phone_no}</p>
 
                {/* <p style={{ margin: '0 0 12px' }}>{item?.attention}</p> */}
                <p style={{ margin: '0 0 13px' }}>{item?.city} {item?.state} {item?.zip_code}.</p>
                {/* <p style={{ margin: '0 0 0px' }}>GSTIN 33AAACL2081B1ZT</p> */}
               </>
              ))
            }
            {/* <p style={{ margin: '0 0 12px' }}>Technoladders Solutions Private Limited.</p>
            <p style={{ margin: '0 0 12px' }}>Old No 9 New No 17</p>
            <p style={{ margin: '0 0 12px' }}>Seethammal Rd, Sethammal Colony,</p>
            <p style={{ margin: '0 0 12px' }}>Alwarpet, Chennai, Tamilnadu 600018.</p>
            <p style={{ margin: '0 0 0px' }}>GSTIN 33AAACL2081B1ZT</p> */}
          </td>
 
        </tr>
        <tr style={{ backgroundColor: '#f8f9ff' }}>
          <td style={{ padding: '20px 12px', width:"50%" }}>-</td>
          <td style={{ padding: '20px 12px 20px 100px', width:"50%"  }}>Place of Supply { invoiceSingle?.client_id?.shipping_address?.length>0 && invoiceSingle?.client_id?.shipping_address[0]?.state }</td>
        </tr>
        <tr>
          <td colSpan="2" style={{ padding: '20px 12px' }}>
            <h5 style={{
              margin: '0 0 8px',
              textTransform: 'capitalize',
              fontWeight: '500',
              color: '#000',
              fontSize: '18px',
              textAlign: 'left',
            }}>Subject :</h5>
            <p style={{ margin: '0 0 0px' }}>{invoiceSingle?.subject ||""}</p>
          </td>
        </tr>
        </tbody>
        </table>
       
  {/* Hello world */}{" "}
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      border: "1px solid #d5d9f3"
    }}
  >
    <thead style={{ backgroundColor: "#f8f9ff" }}>
      <tr>
        <th rowSpan={2} style={{ padding: 8 }}>
          #
        </th>
        <th rowSpan={2} style={{ padding: 8, border: "1px solid #d5d9f3" }}>
          Item &amp; Description
        </th>
        <th rowSpan={2} style={{ padding: 8, border: "1px solid #d5d9f3" }}>
          Quantity / Hours
        </th>
        <th rowSpan={2} style={{ padding: 8, border: "1px solid #d5d9f3" }}>
          Rate
        </th>
        <th colSpan={2} style={{ padding: 8, border: "1px solid #d5d9f3" }}>
          IGST
        </th>
        <th rowSpan={2} style={{ padding: 8, border: "1px solid #d5d9f3" }}>
          Amount
        </th>
      </tr>
      <tr>
        <th colSpan={1} style={{ padding: 8, border: "1px solid #d5d9f3" }}>
          %
        </th>
        <th colSpan={1} style={{ padding: 8, border: "1px solid #d5d9f3" }}>
          Amt
        </th>
      </tr>
    </thead>
    <tbody>
      {
        invoiceSingle?.tableData?.map((item)=>(
         
          <tr style={{ textAlign: "center" }}>
          <td style={{ padding: 8, border: "1px solid #d5d9f3" }}>{item?.key}</td>
          <td style={{ padding: 8, border: "1px solid #d5d9f3" }}>
            {item?.subject|| ""}
          </td>
          <td style={{ padding: 8, border: "1px solid #d5d9f3" }}>{item?.quantity
}</td>
          <td style={{ padding: 8, border: "1px solid #d5d9f3" }}>{item?.rate}</td>
          <td style={{ padding: 8, border: "1px solid #d5d9f3" }}>{item?.tax ||"-"}</td>
          <td style={{ padding: 8, border: "1px solid #d5d9f3" }}>{item?.taxamount || "-"}</td>
          <td style={{ padding: 8, border: "1px solid #d5d9f3" }}>₹{formatIndianCurrency(item?.rate * item?.quantity) }</td>
        </tr>
        ))
      }
    
      <tr>
        <td colSpan={6}></td>
        <td style={{ textAlign: "right", padding: 5 }}>
  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center" }}>
    <p style={{ margin: 0, textAlign: "left", minWidth: 10 }}>
      Sub Total
    </p>
    <p style={{ margin: 0, textAlign: "right" }}>
    ₹{invoiceSingle?.sub_total}
    </p>
  </div>
  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center" }}>
    <p style={{ margin: 0, textAlign: "left", minWidth: 130 }}>
      IGST %
    </p>
    <p style={{ margin: 0, textAlign: "right" }}>
      {invoiceSingle?.igst_amount}
    </p>
  </div>
  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center" }}>
    <p style={{ margin: 0, textAlign: "left", minWidth: 130 }}>
      TDS
    </p>
    <p style={{ margin: 0, textAlign: "right" }}>
      0
    </p>
  </div>
  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center" }}>
    <p style={{ margin: 0, textAlign: "left", minWidth: 130 }}>
      Adjustments
    </p>
    <p style={{ margin: 0, textAlign: "right" }}>
      0
    </p>
  </div>
  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center" }}>
    <p style={{ margin: 0, textAlign: "left", minWidth: 130, fontWeight: "bold" }}>
      Total Payable (₹)
    </p>
    <p style={{ margin: 0, textAlign: "right", fontWeight: "bold" }}>
    { formatIndianCurrency(invoiceSingle?.total_amount)}
    </p>
  </div>
</td>

      </tr>
      <tr>
        <td
          colSpan={7}
          style={{ padding: "12px 10px", border: "1px solid #d5d9f3" }}
        >
          Amount in Words: : {convertAmountToWords(Number(invoiceSingle?.total_amount||0))} Only
        </td>
      </tr>
      <tr>
        <td
          rowSpan={1}
          colSpan={5}
          style={{ padding: "12px 10px", border: "1px solid #d5d9f3" }}
        >
          <p style={{ margin: "0 0 12px", fontWeight: 600, color: "#000" }}>
            Notes :
          </p>
          <p style={{ margin: 0 }}>{invoiceSingle?.notes}</p>
        </td>
        <td
          rowSpan={2}
          colSpan={3}
          style={{
            padding: "12px 10px",
            border: "1px solid #d5d9f3",
            verticalAlign: "bottom",
            textAlign: "center"
          }}
        >
          <p style={{ margin: "0 0 0px", fontWeight: 600, color: "#000" }}>
            Authorized Signature
          </p>
        </td>
      </tr>
      <tr>
        <td
          rowSpan={1}
          colSpan={5}
          style={{ padding: "12px 10px", border: "1px solid #d5d9f3" }}
        >
          <p style={{ margin: "0 0 12px", fontWeight: 600, color: "#000" }}>
            Terms &amp; Conditions : 
          </p>
          <p style={{ margin: 0 }}>{invoiceSingle?.terms_and_conditions||""}</p>
        </td>
      </tr>
    </tbody>
  </table>
     </div>
 
 
       
      </Card>
     
    </div>  
     
  )
}