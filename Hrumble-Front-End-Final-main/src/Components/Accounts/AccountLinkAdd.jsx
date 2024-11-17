import { Button, Input } from 'antd'
import { useContext, useState } from 'react';
import SalesandMargettingContext from '../../Providers/SalesandMargetting';



const AccountLinkAdd = () => {

     const {sendAccount,addpostmanbutton,setJsonData,jsonData}=useContext(SalesandMargettingContext)

  
    const [parsedData, setParsedData] = useState(null);
   
    const handleInputChange = (event) => {
      setJsonData(event.target.value);
    };
   
    const handleParseJson = () => {
      try {
        const parsedJson = JSON.parse(jsonData);
        setParsedData(parsedJson);
        sendAccount(parsedJson)

      } catch (error) {
        console.error('Error parsing JSON:', error);
        setParsedData(null);
      }
    };
  return (
  <>
      <Input.TextArea
       value={jsonData}
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
        <button className="btn btn-danger btn-sm">Cancel</button>
        <button type="primary " className="btn btn-primary btn-sm" onClick={handleParseJson}
         loading={addpostmanbutton}>
          Save
        </button> 
      </div>
  </>

   
   

  )
}

export default AccountLinkAdd