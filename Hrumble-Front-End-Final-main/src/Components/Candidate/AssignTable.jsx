import {Table, Input} from "antd";
import{useEffect,useContext,useState } from "react";

import {PlusOutlined} from "@ant-design/icons"
import CandidateContext from "../../Providers/Candidate";
const { Search } = Input;




const AssignTable = () => {

  
    const {jobsAssignTable,handleClickEditAssign,AssignJobFetch,handleSkillSearch,skillSearch} = useContext(CandidateContext);
      

    


 const [filteredData,setFilterData]=useState([])
  


  



   const handleAssign= async(e,id)=>{
    
    handleClickEditAssign(id)
   
   }
   const data=[]

   jobsAssignTable?.map((item, i) => {
     data.push({
        key: i,
        job_id: item?.job_id,
        job_title: item?.job_title,
        clients:`${item?.Clients[0]?.name} ${item.poc?.length>0?(`(${item.poc[0]})`):""}`,
        action:item?._id
     })
    
   })

 

   const columns=[ {
    title: 'Job Id',
    dataIndex: 'job_id',
    key: 'job_id',
  },
  {
    title: 'Job Title',
    dataIndex: 'job_title',
    key: 'job_title',
    
    //  (a, b) => a.job_title-b.job_title,
  },
  {
    title: 'Client',
    dataIndex: 'clients',
    key: 'clients',
  },
  {
    title: 'Assign',
    dataIndex: 'clients',
    key: 'clients',
    render:(text, record) => (
              
        <p style={{
            cursor:"pointer"
           
        }} onClick={(e) => handleAssign(e, record?.action)}>
        <PlusOutlined /></p>
      
     
    )
  },
]
    
//   createCandidateColumn('Job Id', 'job_id', 'job_id',null,null,20),
//   createCandidateColumn(
//     'Clients', 'clients',
//     (a, b) => a.clients-b.clients,
//     100,
//   ),
//   createCandidateColumn(
//     'Job Title',
//     'job_title',
//     'job_title',
//     (a, b) => a.job_title-b.job_title,
//     (text, record) => (
      
//         filter?.options?.includes("View Candidate Info") ? <p>{text}</p>:
      
//       <a  className="hover_add" onClick={() => navigate(`/jobs/${record?.action}`)}>{text}</a>
//     )
//   ),

     useEffect(() => {
        AssignJobFetch()
      }, [])
      useEffect(() => {
        if(skillSearch){
   
          setFilterData(data.filter((item) =>
          Object.values(item).some((value) => value?.toString().toLowerCase().includes(skillSearch.toLowerCase())
          )))
        }
      }, [skillSearch])
    //   let filterdata=[]
    //   const onSearch=(e)=>{
    //     console.log("e",e.target.value);
    //     setSearch(e.target.value)
    //      let  filterdata = data.filter((item) =>
    //     Object.values(item).some((value) =>
    //       value?.toString().toLowerCase().includes(e.target.value.toLowerCase())
    //     )) 
    //     setFilter(filterdata)
    //   }

  // Redux States get-------------->
 return(
    <div>
        <div className="m_t_10 m_b_10">
      {/* <Search className="input_search" allowClear placeholder="Search by Job Title / ID" 
      onChange={handleSkillSearch}
    //   enterButton onChange={handleChangeSearch} 
      /> */}
        
    
        </div>

        <Table size="small"  columns={columns} dataSource={
            //  search? filter:
            skillSearch? filteredData: data}
             />

          {/* <Timeline
     items={timeline}
     /> */}
    </div>
 )
};

export default AssignTable;
