import React, { useContext, useEffect } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider'

const BankDetails = () => {

  const {adminLoginData,fetchEmployFull} = useContext(EmployeeContext)

  useEffect(() =>{
    // fetchEmployFull()
  },[])

  return (
    <div className='employeeDashboard-personalHeading'>
      <div className='col_2'>
        <label className='col_3'>Name as in Bank  <span className='employeeDashBoard-personalLabel'> {adminLoginData?.name_as_in_bank!=="undefined" ? adminLoginData?.name_as_in_bank : " "} </span> </label>
        <label className='col_3'>Account Number - <span className='employeeDashBoard-personalLabel'> {adminLoginData?.account_num!=="undefined" ? adminLoginData?.account_num : " "} </span> </label>
      </div>
      <div className='col_2'>
        <label className='col_3 p_t_20'>Bank Name - <span className='employeeDashBoard-personalLabel'> {adminLoginData?.bank_name!=="undefined" ? adminLoginData?.bank_name : " "} </span> </label>
        <label className='col_3 p_t_20'>IFSC Code - <span className='employeeDashBoard-personalLabel'> {adminLoginData?.ifsc_code!=="undefined" ? adminLoginData?.ifsc_code : " "}</span> </label>
      </div>
      <div className='col_1'>
        <label className='col_6 p_t_20'>Branch Name - <span className='employeeDashBoard-personalLabel'> {adminLoginData?.branch_name!=="undefined" ? adminLoginData?.branch_name : " "} </span> </label>
        <p className='col_6 p_t_20'>Branch Address - <span className='employeeDashBoard-personalLabel'> {adminLoginData?.branch_addr!=="undefined" ? adminLoginData?.branch_addr : " "}</span> </p>
      </div>
    </div>
  )
}

export default BankDetails
