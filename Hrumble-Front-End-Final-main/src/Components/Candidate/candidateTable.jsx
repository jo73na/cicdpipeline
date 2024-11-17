import {useContext,useState,useEffect} from 'react';
import {Table,Popover,Tooltip,Upload,Button,Form,message,Card} from 'antd';
import {EyeOutlined,CrownFilled,TagFilled,ClockCircleFilled,EnvironmentFilled,ClockCircleOutlined,ProfileOutlined,WalletOutlined,CaretRightOutlined,ToolOutlined,SendOutlined} from "@ant-design/icons"
import CandidateContext from '../../Providers/Candidate';
import moment from 'moment';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {EnvironmentOutlined,EyeTwoTone} from "@ant-design/icons";


const { Dragger } = Upload;




// const data = [
//   {
//     key: '1',
//     clientName: 'Deloitte',
//     totalProjects: 6,
//     ongoing: 4,
//     completed: 2,
//     activeEmployees: 10,
//     revenue: "-",
//     profit: "-"
//   },
//   {
//     key: '2',
//     clientName: 'Object Edge',
//     totalProjects: 4,
//     ongoing: 3,
//     completed: 1,
//     activeEmployees: 8,
//     revenue: "2,00,000",
//     profit: "1,50,000"
//   },
//   {
//     key: '3',
//     clientName: 'Huminn',
//     totalProjects: 1,
//     ongoing: 1,
//     completed: "-",
//     activeEmployees: 5,
//     revenue: "-",
//     profit: "-"
//   },
//   {
//     key: '4',
//     clientName: 'Collabera',
//     totalProjects: 2,
//     ongoing: "-",
//     completed: 2,
//     activeEmployees: "-",
//     revenue: "2,00,000",
//     profit: "1,80,000"
//   },
//   {
//     key: '5',
//     clientName: 'C',
//     totalProjects: 3,
//     ongoing: "-",
//     completed: 3,
//     activeEmployees: "-",
//     revenue: "4,50,000",
//     profit: "3,60,000"
//   },
// ];

const CandidateTable = ({handlePageChange,setPagination,setFilterData,filteredData,pagination}) =>{ 
 
  const {  setOpenAssign,Allcandidates,skillSearch,handleOpenDrawerassign,searchCandidateOwner,AllcandidatesSearch,handleEditResume,} = useContext(CandidateContext);
    console.log("searchCreatedOn",searchCandidateOwner)

    const [showMore, setShowMore] = useState({});
    const [showMorelocation, setShowMorelocation] = useState({});

    const[data,setData]=useState([])

    const [resume, setResume] = useState("");
 
  const navigate =useNavigate()
 const props = {
    name: "file",
    multiple: false,
    action: "https://apiv1.technoladders.com/test",
   
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setResume (info.file.originFileObj)
      }
      if (status === "done") {
                setResume (info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
   const handleCandidate =(id)=>{
    navigate(`/candidates/${id}`)
        // handleOpenDrawer(id,true)
   }

   const handleViewMoreClick = (record) => {
    setExpandedRows([...expandedRows, record.key]);
  };

  const columns = [
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (text, record) => (
       
           <div
            className='col_1'>
            <div className='card p_20'
           style={{
            width:"500px"
           }}>
           <div className='d_f j_c_s_b a_i_f_s'>
           <div>
            <p
              className='key_Skill'
              onClick={() => handleCandidate(record?.action)}
            >
              {record.candidate_name}
            </p>
            <div className='d_f j_c_s_b m_t_10'>
              <div className='d_f g_10'>
                <p className='color_gray'>
                <span className='c_primary'> <ClockCircleFilled/></span> {
                    record.to_exp_from || 0
                  }y {Number(record.to_exp_to)<12 ?record.to_exp_to:0 }m
                </p>
                <p className='color_gray'>
                <span className='c_primary'  style={{
              fontWeight: 'bolder'
            }}>₹</span> {record.current_ctc||0} lakhs
                </p>
                <p>
                  <span className='c_primary'>
                    {' '}
                    <EnvironmentFilled />
                  </span>{' '}
                  {record.current_location}
                </p>
              </div>
          
            </div>
            </div>
            <div
            className='d_f g_10 a_i_c'
              // onClick={() => handleCandidate(record?.action)}
              >

<Popover content="Assign To New Job" trigger="hover">
<p
 onClick={(e)=>handleOpenDrawerassign(record?.action)}
              className='c_primary'
              
              style={{
                cursor: 'pointer',
                fontWeight: "900",
                fontSize: "30px"
              }}>+</p>
    </Popover>
              
             
              <button 
              onClick={() => handleCandidate(record?.action)}

              type='primary'
              className='btn btn-primary'>
                 View
              </button>

            </div>
           </div>
            <div >
            {
               <p><TagFilled  className='c_primary'/>
                <span
                className='databaseview_heading'> Role :</span>
                {record.roll_name||" -"}</p>
            }
              <p><EnvironmentFilled className='c_primary' />&nbsp; 
               <span className='databaseview_heading'>Preferred Locations:</span> 

              {
                  record.preferred_location.length > 4 ?
                  <>
                   {record?.preferred_location?.slice(0, showMorelocation[record.key] ? Infinity : 3).map(
                    (skill, index) => (
                      <span className='color_gray' key={index}>{skill},</span>
                    )
                  )}
                  <a
                    className='c_primary'
                    onClick={() =>
                      setShowMorelocation((prevShowMore) => ({
                        ...prevShowMore,
                        [record.key]: !prevShowMore[record.key],
                      }))
                    }
                  >
                    {showMorelocation[record.key] ? ' ...view Less' : ' ...view More'}
                  </a>
                  </>
                  :
                  record.preferred_location?.map((item,i)=><p className="color_gray" style={{display:"inline-block"}} key={i}>{item},&nbsp;</p>)

                }
               {/* {
              record.preferred_location?.map((item,i)=><p className="color_gray" style={{display:"inline-block"}} key={i} className=''>{item},&nbsp;</p>)} */}
    
   
    </p>
            
              <div className=''>
              <p><CrownFilled className='c_primary'/>&nbsp;
              <span
              className='databaseview_heading'>Skills :</span>
                
                {
                  record.skils.length > 5 ?
                  <>
                   {record?.skils?.slice(0, showMore[record.key] ? Infinity : 3).map(
                    (skill, index) => (
                      <span className='color_gray' key={index}>{skill},</span>
                    )
                  )}
                  <a
                    className='c_primary'
                    onClick={() =>
                      setShowMore((prevShowMore) => ({
                        ...prevShowMore,
                        [record.key]: !prevShowMore[record.key],
                      }))
                    }
                  >
                    {showMore[record.key] ? ' ...view Less' : ' ...view More'}
                  </a>
                  </>
                  :
                  record.skils?.map((item,i)=><p className="color_gray" style={{display:"inline-block"}} key={i}>{item},&nbsp;</p>)

                }
              </p>
              </div>
            </div>
            <div>
         
            </div>
            <div>
            
            </div>
           
          </div>
           </div>
        
      ),
    },
    // Add more columns as needed
  ];



//   const columns = [
//     {
//       title: 'Candidate Name',
//       dataIndex: 'candidate_name',
//       key: 'candidate_name',
//       render: (text, record) => (
//         <a className='hover_add' 
//         onClick={() => handleCandidate(record?.action)}
//         >{text}</a>
      
//       )
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email_id',
//       key: 'email_id',
//     },
//     {
//       title: 'Contact No',
//       dataIndex: 'contact_no',
//       key: 'contact_no',
//     },
//     {
//       title: 'Created on',
//       dataIndex: 'created_on',
//       key: 'created_on',
//     },
//     {
//       title: 'Candidate Owner',
//       dataIndex: 'candidate_owner',
//       key: 'candidate_owner',
//     },
//     {
//       title: 'Skills',
//       dataIndex: 'skils',
//       key: 'skils',
//       render:(text, record) => (
            
//         <Popover content={record?.skils?.map((skill, index) => 
//          <div className='d_f f_w_w' key={index}>
//            <span key={index}>{skill},</span>
//          </div>)}>
//            <EyeOutlined  style={{cursor:"pointer"}}/>
//       </Popover>)
//     },
//    {
//       title: 'Resume',
//       key: 'action',
//       render: (_, record) => (
//         <div style={{
//             display:"flex",
//             gap:"10px 10px"
//          }}>
 
//           {
//             record.resume?
//             <a href={`https://apiv1.technoladders.com/${record?.resume}`} target="_blank" rel="noopener noreferrer">
//             <Tooltip placement="bottomRight" title="Download">
              
//                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="none">
// <path d="M6.68425 1.16699H2.2738C1.93959 1.16699 1.61907 1.29869 1.38275 1.53311C1.14643 1.76753 1.01367 2.08547 1.01367 2.41699V12.417C1.01367 12.7485 1.14643 13.0665 1.38275 13.3009C1.61907 13.5353 1.93959 13.667 2.2738 13.667H9.83457C10.1688 13.667 10.4893 13.5353 10.7256 13.3009C10.9619 13.0665 11.0947 12.7485 11.0947 12.417V5.54199L6.68425 1.16699Z" stroke="#E10102" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>
//    </Tooltip>
//        </a> :
//            <a className='c_primary' onClick={()=>handleEditResume(record?.action)}>Upload</a>
//           }
//          </div>
//         // <Icon className='clients-table-icon' component = {BreifCaseAdd} />
       
//       ),
//     },
// //     {
// //       title: 'Action',
// //       key: 'action',
// //       render: (_, record) => (
// //         <div style={{
// //           display:"flex",
// //           gap:"10px 10px" nvvg 
// //        }}>
// //              <Button type="primary" className="btn" htmlType="submit">
// //            Add
// //         </Button> 
      
// //        </div>
// // //         <div style={{
// // //             display:"flex",
// // //             gap:"10px 10px"
// // //          }}>
 
// // //           {
// // //             record.resume?
// // //             <a href={`https://apiv1.technoladders.com/${record?.resume}`} target="_blank" rel="noopener noreferrer">
// // //             <Tooltip placement="bottomRight" title="Download">
              
// // //                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="none">
// // // <path d="M6.68425 1.16699H2.2738C1.93959 1.16699 1.61907 1.29869 1.38275 1.53311C1.14643 1.76753 1.01367 2.08547 1.01367 2.41699V12.417C1.01367 12.7485 1.14643 13.0665 1.38275 13.3009C1.61907 13.5353 1.93959 13.667 2.2738 13.667H9.83457C10.1688 13.667 10.4893 13.5353 10.7256 13.3009C10.9619 13.0665 11.0947 12.7485 11.0947 12.417V5.54199L6.68425 1.16699Z" stroke="#E10102" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
// // // </svg>
// // //    </Tooltip>
// // //        </a> :
// // //           <Form.Item
        
// // //           name="resume"
// // //           rules={[
// // //             {
// // //               required: true,
// // //               message: "Please Upload Resume!",
// // //             },
// // //           ]}
// // //         >
// // //           <Dragger {...props}>
// // //             <p className="ant-upload-drag-icon">
// // //               {/* <img src={Upload1} className="d_i_b" /> */}
// // //             </p>
            
// // //             <p className="ant-upload-text">
// // //               Drag Your file here or <span className="browse">Browse</span>
// // //             </p>
// // //             <p className="ant-upload-hint">Support format .PDF,.PNG,.JPG</p>
// // //           </Dragger>
// // //         </Form.Item>
// // //           }
// // //          </div>
// //         // <Icon className='clients-table-icon' component = {BreifCaseAdd} />
       
// //       ),
// //     },
//   ];
  // Redux useSelctor 
  

 const  skillmap =(item)=>{
   let data=item.skills?.map((e)=>e && e).filter(Boolean)
    // let data=item?.candidateskills?.map((e)=>e.skill)
    return data
 }

 
//   Allcandidates?.data?.map((item, i) => (
     
//     data.push({key: i,
//     candidate_name: `${item?.first_name} ${item?.last_name}`,
//     job_title:item?.job_id?.job_title,
//     contact_no: item?.phone_no,
//     email_id:item?.email_id,
//     current_location:item?.current_location,
//     candidate_owner: item?.candidate_owner?.name,
//     skils:item?.job_id?.skils||skillmap(item),
//     status: item?.status,
//     created_on: moment(item?.created_on).format(' DD-MM-YYYY'), 
//     // profit:profit(item) ,
//     resume:item?.resume,
//     action: item?._id,
// })));


useEffect(() => {



  console.log("Allcandidates?.data",Allcandidates?.data)
   let senddata=Allcandidates?.data?.map((item, i) => (
     
   {key: i,
    candidate_name: `${item?.first_name} ${item?.last_name}`,
    job_title:item?.job_id?.job_title,
    contact_no: item?.phone_no,
    email_id:item?.email_id,
    current_location:item?.current_location,
    candidate_owner: item?.candidate_owner?.name,
    to_exp_from:item.to_exp_from,
    to_exp_to:item.to_exp_to,
    skils:item?.job_id?.skils||skillmap(item),
    current_ctc:item.current_ctc,
    preferred_location:item.preferred_location||[],
    roll_name:item.roll_name,
    status: item?.status,
    created_on: moment(item?.created_on).format(' DD-MM-YYYY'), 
    // profit:profit(item) ,
    resume:item?.resume,
    action: item?._id,
}));
  setData(senddata);
},[Allcandidates.data])

  // let filteredData=[]
// useEffect(() => {

  
//   if(searchCandidateOwner){
   
//     console.log('dataFilter',data.filter((item) =>
//     Object.values(item).some((value) => value?.toString().toLowerCase().includes("Kumar".toLowerCase())
//     )))
//     let filter=data.filter((item) =>
//     Object.values(item).some((value) => value?.toString().toLowerCase().includes(searchCandidateOwner.toLowerCase())
//     ))
//     setFilterData(filter)
//   }
//   if(AllcandidatesSearch){
   
//     setFilterData(data.filter((item) =>
//     Object.values(item).some((value) => value?.toString().toLowerCase().includes(AllcandidatesSearch.toLowerCase())
//     )))
//   }
//   if(skillSearch&&AllcandidatesSearch){
   
//    let  data=filteredData?.filter((item) =>
//     Object.values(item).some((value) => value?.toString().toLowerCase().includes(skillSearch.toLowerCase())
//     ))
//     setFilterData(data)
//   }


//   if(AllcandidatesSearch&&searchCandidateOwner){
   
//     let  data=filteredData?.filter((item) =>
//      Object.values(item).some((value) => value?.toString().toLowerCase().includes(searchCandidateOwner.toLowerCase())
//      ))
//      setFilterData(data)
//    }

  
// }, [skillSearch,AllcandidatesSearch,searchCandidateOwner])



 return (<Table columns={columns}
  className='database_table'
  showHeader={false} 
  size='small'
  onChange={(pagination) => handlePageChange(pagination.current, pagination.pageSize)}
   dataSource={
    
    data}   

 pagination={pagination}/>)}
export default CandidateTable; 
