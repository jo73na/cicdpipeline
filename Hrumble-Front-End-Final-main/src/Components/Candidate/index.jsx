// import { useState,useContext,useEffect} from 'react';

// import Loader from '../../Utils/Loader';
// import {LeftOutlined } from '@ant-design/icons';

// import {Input, Tabs,Drawer, } from 'antd';

// import CandidateTable from './candidateTable';
// import CandidateContext from '../../Providers/Candidate';
// import CandidateBasicInfo from './CandidateBasicInfo';
// import AssignTable from './AssignTable';
// import AssignEditCandidatesPopup from './AssignEditCandidate';
// import AddCandidatesPopup from './AddCandidate';
// import EditResume from './EditResume';
// import SearchCandidate from './SearchCandidate';
// import Filterlogo from "/images/Filter.svg";
// import {SearchOutlined} from "@ant-design/icons"
// import { useNavigate } from 'react-router-dom';


// const { Search } = Input;




// const AllCandidates=()=>{
//  const {setopenFilterDrawer,openFilterDrawer,setOpenAssign,setopenresumeDrawer,resumeDrawer,searchCandidateOwner,AllcandidatesSearch,skillSearch,handleDateChange,candidateOwner,setLoading,Allcandidate,Allcandidates,candidateLoading,openDrawer,handleOpenDrawer,handleOpenDrawerassign,openAssign,assignEditCandidate,handleClickEditAssign,handleAllcandidateSearch,handleopenDrawerforAdd,openAddCandidateDrawer,handleSkillSearch,handleopenfilterDrawer,setAllcandidates} = useContext(CandidateContext);
//  const [filteredData,setFilterData]=useState([])
//  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total:Allcandidates.total});
//  const navigate =useNavigate()

//   const handlePageChange = (page, pageSize) => {  
//     setPagination({ ...pagination, current: page, pageSize });
//   };
// //Tabs Items
// const items = [
//     {
//       key: '1',
//       label: 'All Candidates',
//     children:<CandidateTable handlePageChange={handlePageChange} pagination={pagination} setPagination={setPagination} filteredData={filteredData} setFilterData={setFilterData}/>,
//     },
   
   
//   ];

//   console.log('candidateOwner',candidateOwner)
//   let candidateOwnerData =[]
//  candidateOwner?.map((candidate)=>{
//     candidateOwnerData.push({
//       label:candidate?.name,
//       value:candidate?.name
//     })
//  })

//  const nonUndefinedKeys = Object.keys(AllcandidatesSearch).filter(key => AllcandidatesSearch[key] !== undefined).filter(key => AllcandidatesSearch[key] !=="")
// const numberOfNonUndefinedKeys = nonUndefinedKeys.length;
// console.log("Number of keys:", numberOfNonUndefinedKeys)
// console.log("Number of keys:", AllcandidatesSearch)

//   let tableExtra=
//   <div className='d_f g_5'>
//      <button onClick={()=>setAllcandidates([])} className='btn_filter ' > <SearchOutlined /> Back To Search</button>
//        <p  onClick={handleopenfilterDrawer} className='d_f btn_filter' >Filter({numberOfNonUndefinedKeys||0}) <img src={Filterlogo} /></p>
//      <p className='m_r_30 d_n_sm'> Total Candidates <span className='heading_text'>{Allcandidates?.total||0}</span></p>
    

//   </div>
//  useEffect(() => {

//   console.log("allcandidates",Allcandidates)
//  if(Allcandidates?.data?.length > 0) {
 

//   Allcandidate(pagination)
//  }
//  }, [pagination.current,pagination.pageSize,])
//  useEffect(() => {
//     setPagination({...pagination,total:Allcandidates.total})
//  }, [Allcandidates.data])
 
//  console.log("pagination",pagination)


// //  const handleDateChange = (date, dateString) => {
// //   // dateString will contain the formatted date in "DD-MM-YYYY" format
// //   console.log('Selected Date:', dateString);
// // };

// //  Pie Chart Start here

// //  Pie Chart ends here


// console.log("Serch",Allcandidates)

// // const numberOfKeys = Object?.keys(AllcandidatesSearch).length;

 
//  return( 
//      <>

//      {/* Drawer Open For CandidateView */}
   

    
     
   
//      {
//       Allcandidates?.length <1
//       ?
//       <SearchCandidate title="title" />
//       :
//      <>
//        {
//         candidateLoading && <Loader />
//      }
//        <p className='heading_text'><LeftOutlined className='back'  onClick={()=>setAllcandidates([])}/>Candidates</p>

// {/* <div
// className='d_f a_i_f_s f_d_c_xs m_b_5 m_t_5 g_5 f_d_c_sm f_w_w_md'>
// <Search className="input_search" allowClear placeholder="Search by Candidate Name / ID" enterButton 
// onChange={(e)=>handleAllcandidateSearch(e,pagination)} 
// defaultValue={AllcandidatesSearch}
// />
//  <Search className="input_search" allowClear placeholder="Search by Skill" enterButton 
//  defaultValue={skillSearch}
// onChange={handleSkillSearch} 
// />
//  <div className='d_f a_i_c g_5 candiade_owner'>
//   CandidateOwner :
//   <Select  placeholder=" Select by Candidate Owner"
//   allowClear
//    onChange={handleDateChange}
//    defaultValue={searchCandidateOwner}

//   options={candidateOwnerData}/>



//  </div>
// </div>   */}
// <div className='tab m_t_10 m_b_10 p_10 responsive_table'>
//     <Tabs items={items} defaultActiveKey="1" tabBarExtraContent={tableExtra}/>
//     </div> 
//      </>
      
//      }

   
     

    
  
// <Drawer
//     // title="Candidate View"
//     placement="right"
//     onClose={handleOpenDrawer}
//     closable={false}
//     size="large"
    
//     open={openDrawer}
//     height={50}
//     width={650}
    
//   >
//     <CandidateBasicInfo/> 
//   </Drawer>
//   <Drawer
//     title={`Assign Candidate To New Job`}
//     placement="right"
//     onClose={()=>setOpenAssign(!openAssign)}
//     closable={openAssign}
//     size="large"
    
//     open={openAssign}
//     height={50}
//     width={650}
    
//   >
//      <AssignTable/>
//   </Drawer>
//   <Drawer
//     title="Edit Candidate"
//     placement="right"
//     onClose={(e)=>handleClickEditAssign()}
//     closable={assignEditCandidate}
//     size="large"
    
//     open={assignEditCandidate}
//     height={50}
//     width={650} 
    
//   >
//      <AssignEditCandidatesPopup/>
//   </Drawer>

//   <Drawer
//     title="Add Candidate"
//     placement="right"
//     onClose={handleopenDrawerforAdd}
//     closable={openAddCandidateDrawer}
//     size="large"
    
//     open={openAddCandidateDrawer}
//     height={50}
//     width={650}
    
//   >
//      <AddCandidatesPopup/>
//   </Drawer>

//   <Drawer
//     // title="Candidate View"
//     placement="right"
//     onClose={()=>setopenresumeDrawer(false)}
//     closable={false}
//     size="small"
    
//     open={resumeDrawer}
//     height={50}
//      width={500}
    
//   >
//     <EditResume/> 
//   </Drawer>

//   <Drawer
//      title="Filter"
//     placement="right"
//     onClose={()=>setopenFilterDrawer(false)}
//     closable={openFilterDrawer}
//     size="large"
    
//     open={openFilterDrawer}
//     height={50}
//     //  width={500}
    
//   >
//       <SearchCandidate value="ppppp"/>
   
//   </Drawer> 


      
//         </>
//     )
// }


// export default AllCandidates;


import React,{useContext, useRef, useState, Fragment} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Tab, Nav, Accordion, Dropdown, Card} from 'react-bootstrap';

// import EmployeeOffcanvas from '../../constant/EmployeeOffcanvas';


import { useEffect } from 'react';



import {  Checkbox, Drawer, Form, Input, Pagination, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import SearchCandidate from './SearchCandidate';
import { useForm } from 'antd/es/form/Form';
import Highlight from 'react-highlight';

import AssignTable from './AssignTable';
import AssignEditCandidatesPopup from './AssignEditCandidate';
import JobContext from '../../Providers/JobProvider';
import CandidateContext from '../../Providers/Candidate';


const Candidates = () => {
    const[skill_required,setskillsmanitory]=useState(false)
    const [selectedLabels, setSelectedLabels] = useState("All");
    const Navigate =useNavigate()

    const [form]=useForm()
    const userdata = useRef();
    const {handleSerchcandidatedataFetch,skill,location} = useContext(JobContext);
 const {handleSearch,setopenFilterDrawer,openFilterDrawer,setOpenAssign,setopenresumeDrawer,resumeDrawer,searchCandidateOwner,AllcandidatesSearch,skillSearch,handleDateChange,candidateOwner,setLoading,Allcandidate,Allcandidates,candidateLoading,openDrawer,handleOpenDrawer,handleOpenDrawerassign,openAssign,assignEditCandidate,handleClickEditAssign,handleAllcandidateSearch,handleopenDrawerforAdd,openAddCandidateDrawer,handleSkillSearch,handleopenfilterDrawer,setAllcandidates} = useContext(CandidateContext);




 const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total:Allcandidates.total});

 useEffect(() => {

 
   
  if(Allcandidates?.data?.length > 0) {
    Allcandidate(pagination)
        
  }
   
   }, [pagination.current,pagination.pageSize,])
   useEffect(() => {
      setPagination({...pagination,total:Allcandidates.total})
   }, [Allcandidates.data])

   const onInit = () => {
};  





function  PostComment(item){
	return(
		<ul className="post-comment d-flex mt-1">
			<li>
				<label className="me-3"><Link to={"#"}><i class="fa-solid fa-briefcase me-2"></i> {
                    item.to_exp_from || 0
                  }y {Number(item.to_exp_to)<12 ?item.to_exp_to:0 }m</Link></label>
			</li>
			<li>
				<label className="me-3"><Link to={"#"}><i class="fa-solid fa-wallet me-2"></i>
                {item.current_ctc||0} lakhs</Link></label>
			</li>
			<li>
				<label className="me-3"><Link to={"#"}><i class="fa-solid fa-location-dot me-2"></i>
                {item.current_location}
</Link></label>	
			</li>
		</ul>
	)


}





const defaultAccordion = [
    {
      title: "Accordion Header One",
      text:
        "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.",
      bg: "primary",
    
    },
    {
      title: "Accordion Header Two",
      text:
        "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.",
  
      bg: "info",
    
    },
    {
      title: "Accordion Header Three",
      text:
        "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.",
      bg: "success",
    
    },
  ];

  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const data = [
    { name: 'HTML' },
    { name: 'CSS' },
    { name: 'JavaScript' },
    { name: 'React' },
    { name: 'Node.js' },
  ]; // Your data array

  const onSearch = (text) => {
    const filteredOptions = data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    const panelValues = filteredOptions.map((item) => ({ value: item.name }));
    setOptions(panelValues);
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  const onChange = (data) => {
    setValue(data);

 
  };
  const handleskillmanitory=(e)=>{
    setskillsmanitory(e.target.checked)
 }


 const hadleSerchfinish=(values)=>{
       
  let data={
   ...values,
   skill_required:skill_required,

  }

  if(selectedLabels){
     if(selectedLabels !=="All"){
     data.gender=selectedLabels
         
     }
     else{
     data.gender=""

     }
  }
  handleSearch(data)
}

let skillsdata = [];
let locationsdata=[]

skill?.map((item,i) => {
    skillsdata.push({
     key:i,
      label: item?.name,
      value: item?.name,
    });
  });
  location?.map((item,i) => {
    locationsdata.push({
     key:i,
      label: item?.name,
      value: item?.name,
    });
  });



    return (
        <>
            
            <div className="container-fluid">
            
            {
      Allcandidates?.length <1
      ?
      <SearchCandidate title="title" />
      :    
				<div className="row">
                     <Form
                     onFinish={hadleSerchfinish}
                     initialValues={AllcandidatesSearch}
                      form ={form}
                      layout='vertical'>
                    <Tab.Container defaultActiveKey={'Grid'} >
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="heading mb-0">Candidates</h4>
                            <div className='d_f g_5 a_i_c'>
     <button onClick={()=>setAllcandidates([])} className='btn btn-info btn-sm' > <i class="fa-solid fa-magnifying-glass me-1"></i> Back To Search</button>

     <p className='m_r_30 d_n_sm'> Total Candidates :<span className=''
      style={{
         fontSize:"18px",
         fontWeight:700

      }}>{Allcandidates?.total||0}</span></p>
                        </div>
                        </div>
                        <div className="row">
                    <div className="col-xl-3 col-xxl-4">
						<div className="row">
							
                            <div className='col-xl-12'>
                            <Card name="accordion-one" className="dz-card">
                            <Tab.Container defaultActiveKey="Preview">
                              <Card.Header className="card-header flex-wrap border-0">
                                  <div>
                                    <Card.Title><i class="fa-solid fa-filter me-1"></i>Filter</Card.Title>
                                  
                                  </div>  
                                   <button htmlType="submit" className='btn btn-primary btn-sm ms-2'><i class="fa-solid fa-magnifying-glass"></i>Search</button>
                              </Card.Header>
                              <Tab.Content className="tab-content" id="myTabContent">
                                <Tab.Pane eventKey="Preview">
                                  <Card.Body className="card-body">               
                                      <Accordion className="accordion accordion-primary" defaultActiveKey="0">
                                      
                                            <Accordion.Item className="accordion-item" key="1" eventKey="1">
                                              <Accordion.Header className="accordion-header rounded-lg">
                                                  Key Words
                                              </Accordion.Header>
                                              <Accordion.Collapse eventKey="1">
                                                  <>
                                                  <Form.Item label="Technical Skills"
                                                   className='mt-1'>
                                                  <Select mode='multiple' allowClear
 placeholder="Select Technical skills"
 options={skillsdata}
 />
                                                  </Form.Item> 
                                                  <Form.Item
           name="skill_required"
           valuePropName="checked"
           >

          <label className='search-main-gap2'>
          <Checkbox
          onChange={handleskillmanitory} defaultChecked={skill_required} />&nbsp;  Mark all Skills as mandatory </label>
          </Form.Item>
          <Form.Item
          style={{
             marginTop:"-20px"
          }}
          label="Keywords"
          name="keywords">

            <Input placeholder='Enter Keywords like skills, designation and company' allowClear  />
              
          </Form.Item>
          <label className='search-main-gap '
           style={{
             marginTop:"-25px",
             marginBottom:"50px"
           }}><Checkbox  />&nbsp;  Mark all keywords as mandatory</label>
          <Form.Item label="Experience" className='search-main-gap2'>
          {/* <Form.Item label="Experience" name="experience"> */}
            <div className='d-flex gap-2 search-cand-input'>

            <Form.Item  name="minExp">
           <Input placeholder='Min Experience'
            style={{
               width:"150px"
            }} />
           </Form.Item>
                
                  <label className='pt-3'>to</label>
                  <Form.Item  name="maxExp">
           <Input placeholder='Max Experience'
              style={{
                width:"150px"
             }}  />
           </Form.Item>
                 
            </div>

            </Form.Item>
            <Form.Item label="Current Location of Candidate" name="current_location" className=''>
            <Select 
            showSearch
             options={locationsdata} allowClear/>
            {/* <Checkbox className='p_t_5'>Include candidates who prefer to refer relocate to above locations</Checkbox> <br/>
            <Checkbox>Exclude candidates who have mentioned Anywhere in...</Checkbox> */}
        </Form.Item>
        <Form.Item label="Preffered Location of Candidate" name="preffered_location">
            <Select 
            showSearch
            mode='multiple'
            options={locationsdata} allowClear/>
            {/* <Checkbox className='p_t_5'>Include candidates who prefer to refer relocate to above locations</Checkbox> <br/>
            <Checkbox>Exclude candidates who have mentioned Anywhere in...</Checkbox> */}
        </Form.Item>
        <Form.Item label="Annual Salary">
            <div className='d-flex gap-2'>
            {/* <Select defaultValue="inr">
                <Option value='inr'>INR</Option>
                <Option value='dollar'>Dollar</Option>
            </Select> */}
           <Form.Item  name="minCTC">
           <Input placeholder='0' />
           </Form.Item>
            <label className='pt-3'>to</label>
            <Form.Item  name="maxCTC">
           <Input placeholder='8' />
           </Form.Item>
            <label className='pt-3'>lakhs</label>
            </div>
            </Form.Item>
                                                  </>
                                              </Accordion.Collapse>
                                            </Accordion.Item>
                                      
                                          <Accordion.Item className="accordion-item" eventKey="2">
                                              <Accordion.Header className="accordion-header rounded-lg">
                                              Employement Details
                                              </Accordion.Header>
                                              <Accordion.Collapse eventKey="2">
                                                  <>
                                                  <Form.Item label="Department and Role" name="role">
                <Input placeholder='Add Department/Role' />
            </Form.Item>
            <Form.Item label="Company" name="organization">
        <Input placeholder='Add Company name' />

           </Form.Item>
           <Form.Item label ="Designation" name="designation" >
           <Input placeholder='Add Designation' />
           </Form.Item>
                        
          <Form.Item label="Notice Period/ Availability of joining" name="notice period">
            <Select >
                <Option value='any'>Any</Option>
                <Option value='0days'>0-15 days</Option>
                <Option value='1mon'>1 Month</Option>
                <Option value='2mon'>2 Month</Option>
                <Option value='3mon'>3 Month</Option>
            </Select>
        </Form.Item>
       
        

            
              
      
                                                  </>
                                              </Accordion.Collapse>
                                            </Accordion.Item>
                                            <Accordion.Item className="accordion-item" eventKey="3">
                                              <Accordion.Header className="accordion-header rounded-lg">
                                              Diversity and Additional Details
                                              </Accordion.Header>
                                              <Accordion.Collapse eventKey="3">
                                                 <>
          <Form.Item label="Experience" className='search-main-gap2'>

                                                 <div className='d-flex gap-2 search-cand-input'>

<Form.Item  name="minExp">
<Input placeholder='Min Experience' width={50}/>
</Form.Item>
    
      <label className='pt-3'>to</label>
      <Form.Item  name="maxExp">
<Input placeholder='Max Experience' width={50} />
</Form.Item>
     
</div>
 </Form.Item>
        <Form.Item label="Showing Candidates Seeking" name="empStatus">
                    <Select defaultValue="any">
                        <Option value=''>Any</Option>
                        <Option value='Full time'>Full Time</Option>
                        <Option value='Part time'>Part Time</Option>
                        <Option value='Contract'>Contarct</Option>
                    </Select>
                </Form.Item>
                                                 </>
                                              </Accordion.Collapse>
                                            </Accordion.Item>
                                      </Accordion>				
                                  </Card.Body>
                                </Tab.Pane>
                                <Tab.Pane eventKey="Code">
                                <div className="card-body pt-0 p-0 code-area">
  <pre className="mb-0"><code className="language-html">
  <Highlight>
  {`
  <Accordion className="accordion accordion-primary" defaultActiveKey="0">
    {defaultAccordion.map((d, i) => (
        <Accordion.Item className="accordion-item" key={i} eventKey={\`$/{i}\`}>
          <Accordion.Header className="accordion-header rounded-lg">
            {d.title}
          </Accordion.Header>
          <Accordion.Collapse eventKey={\`$\{i}\`}>
            <div className="accordion-body">{d.text}</div>
          </Accordion.Collapse>
        </Accordion.Item>
    ))}
    </Accordion>
  `}
  </Highlight>
  </code></pre>
  </div>
                                </Tab.Pane>
                              </Tab.Content>    
                            </Tab.Container>  
                        </Card>
							</div>
							{/* <div className='col-xl-12'>
								<div className="card">
									<div className="card-body profile-accordion pb-0">
										<Accordion className="accordion" id="accordionExample2">
											<Accordion.Item className="accordion-item">
												<Accordion.Header as="h2" className="accordion-header" id="headingOne2">												  
                                                Department and Role											  
												</Accordion.Header>
												<Accordion.Body id="collapseOne2" className="accordion-collapse collapse show">													
													{followers.map((item, index)=>(
														<div className="products mb-3" key={index}>
															<img src={item.image} className="avatar avatar-md" alt="" />
															<div>
																<h6><Link to={"#"}>{item.title}</Link></h6>
																<span>{item.subtitle}</span>	
															</div>	
														</div>
													))}
												</Accordion.Body>
											</Accordion.Item>
										</Accordion>
									</div>
								</div>
							</div>
							<div className='col-xl-12'>
								<div className="card">
									<div className="card-body profile-accordion pb-0">
										<Accordion  id="accordionExample4">
											<Accordion.Item className="accordion-item">
												<Accordion.Header as="h2" className="accordion-header" id="headingOne4">												  
													Interest												  
												</Accordion.Header>
												<Accordion.Body id="collapseOne4" className="accordion-collapse collapse show" >
													<div className="profile-interest">
														<LightGallery
															onInit={onInit}
															speed={500}
															plugins={[lgThumbnail, lgZoom]}
															elementClassNames="row sp4"
														>
															
															{galleryBlog.map((item,index)=>(
																<div data-src={item.image} className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1" key={index}>
																	<img src={item.image} style={{width:"100%"}} alt="gallery"/>
																</div>
															))}
														</LightGallery>	
													</div>
												</Accordion.Body>
											</Accordion.Item>
										</Accordion>
									</div>
								</div>
							</div>
							<div className="col-xl-12">
								<div className="card">
									<div className="card-body profile-accordion pb-0">
										<Accordion >
											<Accordion.Item className="accordion-item">
												<Accordion.Header as="h2" >												  
													Our Latest News												  
												</Accordion.Header>
												<Accordion.Body >
													<div className="accordion-body">
														<div className="profile-news">
															{mediaBlog.map((item, index)=>(
																<div className="media pt-3 pb-3" key={index}>
																	<img src={item.image} alt="image" className="me-3 rounded" width="75" />
																	<div className="media-body">
																		<h6 className="m-b-5"><Link to="/post-details" className="text-black">Collection of textile samples</Link></h6>
																		<p className="mb-0">I shared this on my fb wall a few months back, and I thought.</p>
																	</div>
																</div>
															))}															
														</div>
													</div>
												</Accordion.Body>
											</Accordion.Item>
										</Accordion>
									</div>
								</div>
							</div>
							<div className="col-xl-12">
								<div className="card">
									<div className="card-body profile-accordion pb-0">
										<Accordion>
											<Accordion.Item className="accordion-item">
												<Accordion.Header as="h2">												  
													Friends												  
												</Accordion.Header>
												<Accordion.Body id="collapseOne6">													
													<div className="friend-list">
														{friends.map((item, ind)=>(
															<img src={item.image} className="avatar avatar-md" alt=""  key={ind}/>
														))}															
													</div>													
												</Accordion.Body>
											</Accordion.Item>
										</Accordion>
									</div>
								</div>
							</div> */}
						</div>
					</div>
					<div className="col-xl-9 col-xxl-8">
						<div className="row">

							{Allcandidates?.data?.map((item, ind)=>(
								<Fragment key={ind}>
									<div className="col-xl-12" >
                                     <div className='card'>
                                     <div className="card-body ">
                               
                               {/* <div className="crd-bx-img">
                                   <img src={item.image} className="rounded-circle" alt="" />
                                   <div className= {`active ${item.id === "deactive"  ?  'deactive' : ''} `}></div>
                               </div> */}
                               <div className="card__text ">
                                    <div
                                     className='d-flex justify-content-between'>
                                    <div
                                    className=''>
                                   <h4 className="mb-0">{item?.first_name} {item?.last_name}</h4>
                                    {PostComment(item)}
                                 
                                   </div>
                                   <div>
                                   <button onClick={()=>Navigate(`/candidates/${item?._id}`)} className="btn btn-primary btn-sm me-2" > <i className='fa-solid fa-eye-'></i> View Profile</button>
                                   <button className="btn btn-secondary btn-sm ms-2" onClick={()=>handleOpenDrawerassign(item?._id)} > + Assign To</button>
                               </div>
                                    </div>
                                  
                                   <ul className="canidate-location">
                               <li>
                                       <span className="card__info__stats"> Preferred Locations: </span>
                  {item.preferred_location?.map((item)=>
                  <span className="color_gray" style={{display:"inline-block"}} >{item},&nbsp;</span>)}
                                       
                                   </li>
                        
                                   <li>
                                       <span className="card__info__stats">Skills : </span>
                                       
                                       {item?.skills?.map((item)=>
                  <span className="color_gray" style={{display:"inline-block"}} >{item} | &nbsp;</span>)}
                                   </li>
                                   <li>
                                       <span className="card__info__stats">Joining Date: </span>
                                       <span>{item.Joining}</span>
                                   </li>
                               </ul> 
                               </div>
                             
                              
                               {/* <ul className="card__info">
                                   <li>
                                       <span className="card__info__stats">{item.posts}</span>
                                       <span>posts</span>
                                   </li>
                                   <li>
                                       <span className="card__info__stats">{item.followers}</span>
                                       <span>followers</span>
                                   </li>
                                   <li>
                                       <span className="card__info__stats">{item.following}</span>
                                       <span>following</span>
                                   </li>
                               </ul> */}
                             
                             	
                        
                       </div>
                                     </div>
									</div>
									
								</Fragment>
							))}		
                                <div className='d_f justify-content-end mt-3 mb-3'>
		 <Pagination
         size="small"
      showSizeChanger
      onChange={(e,pageSize)=>
         
        {
             
            setPagination({
		...pagination,
		pageSize:pageSize,
		current:e
	  })}}
      defaultCurrent={pagination?.current}
      total={pagination?.total}
      pageSize={pagination?.pageSize}
    />
			</div>					
								
						</div>
						
					</div>
				</div>	
                    </Tab.Container>
                    </Form>
                </div>
}
            </div>   


            <Drawer
    title={`Assign Candidate To New Job`}
    placement="right"
    onClose={()=>setOpenAssign(!openAssign)}
    closable={openAssign}
    size="large"
    
    open={openAssign}
    height={50}
    width={650}
    
  >
     <AssignTable/>
  </Drawer>
  <Drawer
    title="Edit Candidate"
    placement="right"
    onClose={(e)=>handleClickEditAssign()}
    closable={assignEditCandidate}
    size="large"
    
    open={assignEditCandidate}
    height={50}
    width={650} 
    
  >
     <AssignEditCandidatesPopup/>
  </Drawer> 
                   
        </>
    );
};

export default Candidates;