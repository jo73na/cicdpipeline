import { Button, Input } from 'antd'
import { useContext, useState } from 'react';
import SalesandMargettingContext from '../../Providers/SalesandMargetting';
import { useParams } from 'react-router-dom';



const ContactLinkAdd = ({List}) => {

   let params =useParams()

     const {addListbutton,sendContactList,sendContact,addpostmanbutton,setcontactData,contactData}=useContext(SalesandMargettingContext)

  
    const [parsedData, setParsedData] = useState(null);
   
    const handleInputChange = (event) => {
        setcontactData(event.target.value);
    };
   
    const handleParseJson = () => {
      try {
         
        const parsedJson = JSON.parse(contactData);
        setParsedData(parsedJson);
         if(List){
        sendContactList(parsedJson,params?.id)
            
         }
         else{
        sendContact(parsedJson,params?.id)
          
         }

      } catch (error) {
        console.error('Error parsing JSON:', error);
        setParsedData(null);
      }
    };
  return (
  <>
      <Input.TextArea
       value={contactData}
     className='m_t_10'
    onChange={handleInputChange}
   placeholder='Paste AccountDetails ................'
   autoSize={{ minRows: 25, maxRows: 25 }}
   />
     <div
        style={{
          margin: "10px",
          display: "flex",
          gap: "10px",
          justifyContent: "flex-end",
        }}
      >
        <button type="button" className="btn btn-sm btn-danger">Cancel</button>
        <button type="primary" className="btn btn-primary btn-sm" onClick={handleParseJson}
         loading={addListbutton}>
          Save
        </button> 
      </div>
  </>

   
   

  )
}

export default ContactLinkAdd