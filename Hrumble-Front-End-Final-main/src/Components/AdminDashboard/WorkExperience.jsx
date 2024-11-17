import React, { useContext, useEffect } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider'
import moment from 'moment'

const WorkExperience = () => {

  const {workExperinceData,educationExperiData,fetchEmployFull} = useContext(EmployeeContext)

  console.log("sssssssssssssddddd-----------",educationExperiData)

  // useEffect(() =>{
  //   fetchEmployFull()
  // },[])

  return (
    <div>
      {
        educationExperiData?.map((item,i) => {
          return<>
          <div>
            <label className='profile-edu-job-title'>{`${item?.designation!=="undefined" ? item?.designation : " "} - ${item?.jobType!=="undefined" ? item?.jobType : " "}`}</label>
            <p className='profile-edu-job-com p_t_5'>{`${item?.company_name!=="undefined" ? item?.company_name : " "} - ${item?.location!=="undefined" ? item?.location : " "}`}</p>
            <p className='profile-edu-job-exp p_t_5'>{`${moment(item?.joining_date!=="undefined" ? item?.joining_date : " ").format(' DD-MM-YYYY')} - ${moment(item?.seperation_date!=="undefined" ? item?.seperation_date : " ").format(' DD-MM-YYYY')}`}</p>
          </div>
          </>
        })
      }
    </div>
  )
}

export default WorkExperience
