import { Card, Progress, Tabs } from 'antd';
import React from 'react'
import PersonalDetails from './PersonalDetails';
import EducationalDetails from './EducationalDetails';
import Documents from './Documents';
import BankDetails from './BankDetails';

const MyProfileDashbooard = () => {

    const items = [
        {
          key: '1',
          label: 'Personal Details',
          children: <PersonalDetails />,
        },
        {
          key: '2',
          label: 'Education & Experience',
          children: <EducationalDetails />,
        },
        {
          key: '3',
          label: 'Documents',
          children: <Documents />,
        },
        {
          key: '4',
          label: 'Bank Account Details',
          children: <BankDetails />,
        },
      ];

  return (
    <div className=''>
      
      <label className='zive-onboarding-profile'>My Profile</label>
      <div className='card-progress m_t_10'>
        <label className='profile-progress-comp'>10%Completed</label>
      <Progress percent={50} size={[500, 20]} strokeColor={{
        from: '#FFC000',
        to: '#FFA500',
      }} className='d_f f_w_w m_t_5' />
      <label className='profile-progress-label'>Update your profile information to release offer letter.</label>
      </div>
      <div className='card m_t_10'>
      <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  )
}

export default MyProfileDashbooard
