import { Collapse } from 'antd'
import React from 'react'
import PersonalCollapse from './CollapsePersonal'

const EditInfoDocument = () => {

    const items = [
        {
            key: '1',
            label: "Personal Details",
            children: <PersonalCollapse />
        }
    ]

    const items1 = [
        {
            key: '2',
            label: "Educational Details",
            // children: <InfoEducational />
        }
    ]

    const items2 = [
        {
            key: '3',
            label: "Work Experience",
            // children: <InfoExperience />
        }
    ]
    
    const items3 = [
        {
            key: '4',
            label: "BGV and Bank Details",
            // children: <InfoBgv />
        }
    ]

  return (
    <div>
      <div className=''>
            <Collapse ghost items={items} defaultActiveKey={['0']} />
      </div>
      <div className=''>
            <Collapse ghost items={items1} />
      </div>
      <div className=''>
            <Collapse ghost items={items2} />
      </div>
      <div className=''>
            <Collapse ghost items={items3} />
      </div>
    </div>
  )
}

export default EditInfoDocument
