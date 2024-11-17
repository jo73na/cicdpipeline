import React from 'react'
import PDF from "/images/Pdffile.svg"

const OthersDocInfo = () => {
  return (
    <div className='col_3'>
      <label className='zive-jobDetail-card1-label'>Attachment Name: </label>
      <div>
        <label> Documents</label>
      <div className='d_f f_w_w j_c_s_b'>
        <img src={PDF} />
      </div>
      </div>
    </div>
  )
}

export default OthersDocInfo
