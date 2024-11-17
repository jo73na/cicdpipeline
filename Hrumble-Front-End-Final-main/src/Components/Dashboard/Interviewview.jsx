import { Tabs } from 'antd'
import React from 'react'

const Interviewview = () => {


    const items = [
        {
          key: "1",
          label: "All Interviews",
        //   children: ,
        },
        // {
        //   key: '2',
        //   label: 'Closed Jobs',
        //   children:<OpenJobsTable table="closedjobs"/>
        // },
      ];
  return (
   <>
     <p className="heading_text">Interviews</p>

<div className="d_f a_i_f_s f_d_c_xs m_b_5 m_t_5 g_5 f_d_c_sm">
  {/* <Search
    className="input_search"
    allowClear
    placeholder="Search by Job Title / ID "
    enterButton
    onChange={handleChangeSearch}
    value={searchjob}
  />
  <div className="d_f a_i_c">
    {filter?.options?.includes("Create Job") && (
      <Button
        type="primary"
        className="btn create_btn"
        onClick={handleopenDrawerJob}
      >
        + Create New Job
      </Button>
    )}
  </div> */}
</div>
{/* <div className='col_2 g_10 col_1_xs col_2_md'>
   <div className='card p_10 w_100'>
   <p className='card_header'> Jobs Created:{job?.total}</p>
    <img  className='card_icon' src={icon1}/>
    <div style={{height: 130}} className=''>
      <PieChart />
    </div>
   </div>
   <div className='card p_10 '>
   <p className='card_header'>Requirements: {sum}</p>
   <img  className='card_icon' src={icon2}/>
   <div style={{height: 130}} className=''>
      <PieChart2 />
    </div>

   </div>
</div> */}

<div className="tab m_t_10 m_b_10 p_10 responsive_table">
  <Tabs
    items={items}
    defaultActiveKey="1"
    // tabBarExtraContent={filtericon}
  />
</div>
   </>
  )
}

export default Interviewview