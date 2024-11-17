import React, { useContext, useEffect, useState } from 'react'
import { FolderOutlined } from '@ant-design/icons';
import FileManagerContext from '../../Providers/FileManagerProvider';
import SowProject from './SowProject';

const Sow = () => {

  const { FetchSowClient, sowClient,FetchSowProject  } = useContext(FileManagerContext)

  const [ClientOpen,setClientOpen] = useState(false)

  const handleSowClient = (id) => {
    FetchSowProject(id)
    setClientOpen(true);
}

  useEffect(() => {
    FetchSowClient()
  },[])

  return (
    <div>
      <div className='col_4 p_t_10 g_20'>
        {
          ClientOpen ? <p><SowProject setClientOpen={setClientOpen} /></p> :
          sowClient?.map((item,i) => {
            return<>
            <div className='file-employeename-box d_f g_10 p_t_10'>
                <FolderOutlined />
                <label  className='file-employeename' onClick={ (e)=> handleSowClient(item?._id)}>{item?.name}</label>
            </div>
            </>
          })
        }
            
      </div>
    </div>
  )
}

export default Sow
