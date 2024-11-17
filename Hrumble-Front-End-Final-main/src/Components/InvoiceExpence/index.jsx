// import { Tabs } from 'antd'
// import { useContext, useState } from 'react';
// import ExpenseTable from './Expence';
// import InvoiceExpenceContext from '../../Providers/InvoiceExpence';
// import InvoiceTable from './Invoice';


// const InvoiceExpence = () => {
//     const[active,setActive]=useState("1")
//    const {expencegraph,fetchExpence}=useContext(InvoiceExpenceContext)
//     console.log("expencegraph",expencegraph)
//     const items = [
//         {
//           key: '1',
//           label: 'Invoices',
//         // children:<CandidateTable handlePageChange={handlePageChange} pagination={pagination} setPagination={setPagination} filteredData={filteredData} setFilterData={setFilterData}/>,
//         },
//         {
//             key: '2',
//             label: 'Expenses',
//           //  children:  <ExpenseTable/>,
//           },
       
       
//       ];
  
//      const handlechange=(e)=>{
//       setActive(e)
//      }  
//   return (
//     <div className='notab m_t_5 m_b_10 responsive_table'>
//     <Tabs items={items}  activeKey={active} onChange={handlechange}/>
//      {
//       active =="1"?
//        <InvoiceTable/>
//       :
//       <ExpenseTable/>
//      }
//     </div> 
//   )
// }

// export default InvoiceExpence




import  {useState,  useEffect, useContext} from 'react';
import {Link, useNavigate,} from 'react-router-dom';
import { Tab, Nav } from 'react-bootstrap';








// import Expence from './Expence';


import { Drawer, Form, Modal } from 'antd';
// import ExpenceAdd from './ExpenceAdd';

import TrafficBarChart from '../UtlilsComponent/TrafficBarChart';
import { SVGICON } from '../../Utils/SVGICON';
import Loader from '../../Utils/Loader';
import InvoiceExpenceContext from '../../Providers/InvoiceExpence';
import Invoice from './Invoice';
import Expence from './Expence';
import ExpenceAdd from './ExpenceAdd';

import CrmMarketArea from '../UtlilsComponent/CrmMarketArea';
import SelectRange from './SelectRange';
import InvoiceDashboard from '../UtlilsComponent/InvoiceChart';
import InvoiceOverdue from './InvoiceOverdue';
import ExpenceEdit from './ExpenceEdit';

// import InvoiceOverdue from './invoiceOverdue';
// import AddClient from './AddClient';








//     {id: '01', invid:'INV-100023456', assign: '3', status:'Complete', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Create Frontend WordPress', select:'High'},    
//     {id: '02', invid:'INV-100023567', assign: '4', status:'Testing', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML To React Convert', select:'Low'},    
//     {id: '03', invid:'INV-100023987', assign: '4', status:'Pending', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML template Issue Complete', select:'Medium'},    
//     {id: '04', invid:'INV-100023420', assign: '3', status:'In Progress', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Complete Admin Dashboard Project', select:'Low'},    
//     {id: '05', invid:'INV-100023436', assign: '4', status:'Testing', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Create Frontend WordPress', select:'High'},    
//     {id: '06', invid:'INV-100023123', assign: '5', status:'Pending', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML To React Convert',select:'Low'},    
//     {id: '07', invid:'INV-100023987', assign: '4', status:'Complete', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML template Issue Complete',select:'Medium'},    
//     {id: '08', invid:'INV-100023852', assign: '3', status:'Testing', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Complete Admin Dashboard Project',select:'High' },    
//     {id: '09', invid:'INV-100023741', assign: '5', status:'Complete', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Create Frontend WordPress',select:'Low' },    
//     {id: '10', invid:'INV-100023963', assign: '4', status:'Pending', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML To React Convert', select:'High'},
//     {id: '11', invid:'INV-100023123', assign: '5', status:'Pending', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML To React Convert',select:'Low'},    
//     {id: '12', invid:'INV-100023987', assign: '4', status:'Complete', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML template Issue Complete',select:'Medium'},    
//     {id: '13', invid:'INV-100023852', assign: '3', status:'Testing', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Complete Admin Dashboard Project',select:'High' },    
//     {id: '14', invid:'INV-100023741', assign: '5', status:'Complete', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Create Frontend WordPress',select:'Low' },    
//     {id: '15', invid:'INV-100023963', assign: '4', status:'Pending', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML To React Convert', select:'High'}, 
// 	{id: '16', invid:'INV-100023456', assign: '3', status:'Complete', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Create Frontend WordPress', select:'High'},    
//     {id: '17', invid:'INV-100023567', assign: '4', status:'Testing', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML To React Convert', select:'Low'},    
//     {id: '18', invid:'INV-100023987', assign: '4', status:'Pending', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML template Issue Complete', select:'Medium'},    
//     {id: '19', invid:'INV-100023420', assign: '3', status:'In Progress', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Complete Admin Dashboard Project', select:'Low'},    
//     {id: '20', invid:'INV-100023436', assign: '4', status:'Testing', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Create Frontend WordPress', select:'High'},    
 
// ];




const InvoiceExpence = () => {	
    
	const {expenceEditPopup,handleOpenEditExpence,handleviewInvoice,invoiceGraph,openCustompopup,customPopup,paginationExpence,fetchexpencedata,InvoiceLoading,fetchInvoice,FetstatusInvoice,invoicedata,handleAddExpense,fetchinvoicedata,handleFinishExpence,fetchExpence,expencegraph,Loading} =useContext(InvoiceExpenceContext)
     console.log("invoiceGraph",invoiceGraph)
    const [activekey,setActivekey]=useState("Invoice")
    const [activekeyExpense,setActivekeyExpense]=useState("Salary")
    const [filter,setFilter]=useState("Year")
    const [filterExpense,setFilterExpense]=useState("Year")
	const [fileError, setFileError] = useState(false);
	const [drawerVisible, setDrawerVisible] = useState(false);

	const [attachment, setAttachment] = useState("");
	const [form] = Form.useForm();
	 
    const navigate=useNavigate()

	const handleDrawerClose = () => {
		setDrawerVisible(false);
		form.resetFields();
	  };


	  const handleAddExpenseClick = () => {
		setDrawerVisible(true);
	  };
  



	  const handleFinish = (values,form) => {
		console.log("expenceAddemployee",values)
		var formdata=new FormData()
	 
		formdata.append("expense_type",values["expense_type"])
		values["employee_id"] &&formdata.append("employee_id",values["employee_id"])
		formdata.append("expense_cost",values["expense_cost"])
		formdata.append("expense_desc",values["expense_desc"])
		formdata.append("expense_date",values["date"]?.$d)
		values["others_type"] &&formdata.append("others_type",values["others_type"])
		values["others_type_sub"] &&formdata.append("others_type_sub",values["others_type_sub"])
		formdata.append("attachment",attachment)
		handleFinishExpence(formdata,form)
		handleDrawerClose()
	   
	   
	   }


	   useEffect(() => {

		
		 
			
			fetchInvoice()
			fetchExpence()

		 
	  }, [])


	  useEffect(() => {
		 if(filter =="Year"){
            fetchinvoicedata("Year")
		
		 }
		 else if(filter =="Month"){
            fetchinvoicedata("Month")
            
		 }
		 else if(filter =="Week"){
            fetchinvoicedata("Week")
            
		 }
		 else if (filter =="Today"){
			fetchinvoicedata("Today")
		 }
		 else{
			openCustompopup()
		 }
		
	  }, [filter])

	  useEffect(() => {
		if(filterExpense =="Year"){
			fetchexpencedata("Year")
	   
		}
		else if(filterExpense =="Month"){
			fetchexpencedata("Month")
		   
		}
		else if(filterExpense =="Week"){
			fetchexpencedata("Week")
		   
		}
		else {
			fetchexpencedata("Today")
		}
	   
	 }, [filterExpense,paginationExpence?.current])
	  

	  const chartCardBlog = [
		{title:'Salary', svg: SVGICON.VisitorPerson, number:'3,569',chartTheme:'var(--primary)', cardColor: 'primary'},
		{title:'Others', svg: SVGICON.Watch, number:'8:30 PM',chartTheme:'var(--secondary)', cardColor: 'secondary'},

	];
    
	function formatIndianCurrency(amount) {
		// Convert amount to string (in case it's not already)
		const amountStr = String(amount);
	
		// Split the amount into lakhs and crores parts
		let lakhs = amountStr.slice(-5); // Last 5 characters (for lakhs)
		let crores = amountStr.slice(0, -5); // Remaining characters (for crores)
	
		// Format lakhs part with commas
		if (lakhs.length > 3) {
			lakhs = lakhs.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
		}
	
		// Combine lakhs and crores with a comma separator if crores part exists
		if (crores !== "") {
			return `${crores},${lakhs}`;
		} else {
			return lakhs;
		}
	}
	  
    
	return (
		<>
			
				<div className="container-fluid">	
				
				<div className="row">
					
					<div className="card">
            <div className="card-header border-0 pb-0 flex-wrap">
                {/* <h4 className="heading mb-0">Literary success</h4> */}
            </div>
            <div className="card-body px-0 pb-0">
                 <div>
				 {
							Loading  ?
							 <Loader/>
							:
							<>
							<div
							 className='d_f j_c_s_b'>
								 		<h4 className="heading mb-0"><div className="input-group search-area">
						<input type="text" className="form-control" placeholder="Search Invoice No/ Client..." />
						<span className="input-group-text">
							<Link to={"#"}>
							<i class="fa-solid fa-magnifying-glass text-primary"
                             style={{
                                fontSize:"16px"
                             }}></i>
							</Link>
						</span>
					</div></h4>
								 <div className='d_f a_i_c g_10'>
								
							<Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist"
							  onSelect={(key) => setFilter(key)}
							  defaultActiveKey={filter}  >
                                      <Nav.Item as="li" className="nav-item" role="presentation">
                                        <Nav.Link as="button"  type="button" eventKey="Year">Year</Nav.Link>
                                      </Nav.Item>
                                      <Nav.Item as="li" className="nav-item" >
                                        <Nav.Link as="button"  type="button" eventKey="Month">Month</Nav.Link>
                                      </Nav.Item>
									  <Nav.Item as="li" className="nav-item" >
                                        <Nav.Link as="button"  type="button" eventKey="Week">Week</Nav.Link>
                                      </Nav.Item>
									  <Nav.Item as="li" className="nav-item" >
                                        <Nav.Link as="button"  type="button" eventKey="Today">Today</Nav.Link>
                                      </Nav.Item>
									  <Nav.Item as="li" className="nav-item" >
											<Nav.Link as="button"  type="button" eventKey="Custom">Custom</Nav.Link>
										  </Nav.Item>
									 
                                  </Nav>
								  <button to className="btn btn-primary btn-sm ms-2"
                                     onClick={()=>navigate("/addinvoice")}
                                >+ Add Invoice
                                </button>
								 </div>
							</div>
							
						 
						<div className='row mt-2'>
						<div className="col-xl-3 col-sm-6">
                    <div className="card same-card p-2">
													<div className="card-body depostit-card p-0">
														<div className="depostit-card-media d-flex justify-content-between pb-0">
															<div>
																<h6>Total Invoices</h6>
																{
																	invoicedata?.all?.length>0 ?
																	<>
																	<h3>₹{formatIndianCurrency(invoicedata?.all[0]?.totalAmount)}</h3>
																	<span> No.of Invoices :{invoicedata?.all[0]?.totalInvoices}</span>
																	</>
																	:
																	<>
																											<h3>₹0</h3>

			   <span>No.of Invoices:0</span>
																	 
																	</>
																	 
																}
																
															</div>
															<div className="icon-box bg-primary">
                                                            <i className="fa-solid fa-rocket text-white m_t_15"></i>
															</div>
														</div>															
														
													</div>
												</div>
                                                
					</div>
                    <div className="col-xl-3 col-sm-6">
                    <div className="card same-card">
													<div className="card-body depostit-card p-0">
														<div className="depostit-card-media d-flex justify-content-between pb-0">
															<div>
																
																<h6>Total Paid</h6>
																{
																	invoicedata?.Paid?.length>0 ?
																	<>
																	<h3>₹{formatIndianCurrency(invoicedata?.Paid[0]?.totalAmount)}</h3>
																	<span className='mb-1'> No.of Invoices :{invoicedata?.Paid[0]?.totalInvoices}</span>
																	</>
																	:
																	<>
																											<h3>₹0</h3>

			   <span className='mb-1'>No.of Invoices:0</span>
																	 
																	</>
																	 
																}

															</div>
															<div className="icon-box bg-warning">
                                                            <i className="fa-solid fa-hand-holding-heart text-white m_t_10"></i>
															</div>
														</div>															
														{/* <TotalDeposit /> */}
													</div>
												</div>
                                                
					</div>	<div className="col-xl-3 col-sm-6">
                    <div className="card same-card">
													<div className="card-body depostit-card p-0">
														<div className="depostit-card-media d-flex justify-content-between pb-0">
															<div>
																<h6>Total Overdue</h6>
																{
																	invoicedata?.Overdue?.length>0 ?
																	<>
																	<h3>₹{formatIndianCurrency(invoicedata?.Overdue[0]?.totalAmount)}</h3>
																	<span className='mb-1'> No.of Invoices :{invoicedata?.Overdue[0]?.totalInvoices}</span>
																	</>
																	:
																	<>
																											<h3>₹0</h3>

			   <span className='mb-1'>No.of Invoices:0</span>
																	 
																	</>
																	 
																}

																{/* <h3>  {`${revenue?.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
          })}`}</h3> */}
															</div>
															<div className="icon-box bg-primary">
                                                            <i className="fa-solid fa-indian-rupee-sign text-white m_t_15"></i>
																
															</div>
														</div>															
														{/* <TotalDeposit /> */}
													</div>
												</div>
                                                
					</div>	<div className="col-xl-3 col-sm-6">
                    <div className="card same-card">
													<div className="card-body depostit-card p-0">
														<div className="depostit-card-media d-flex justify-content-between pb-0">
															<div>
																<h6>Total Draft</h6>
						                                        <h3>₹0</h3>
																 <span>No of Draft :0</span>
															</div>
															<div className="icon-box bg-warning">
															<i className="fa-regular fa-pen-to-square text-white m_t_10"></i>
                                                            {/* <i className="fa-solid fa-indian-rupee-sign text-white m_t_15"></i> */}
																
															</div>
														</div>															
														{/* <TotalDeposit /> */}
													</div>
												</div>
                                                
					</div>
					   </div>
					   <div className="col-xl-12 col-sm-12 m_t_1">
							<Tab.Container defaultActiveKey="Preview">
                                        <div className="card">
                                            <div className="card-header p-3 border-0 d_f j_c_s_b">
											<h4 className="heading mb-0">Invoice Report</h4>   

											<div>

		       

                                 {/* <Card.Title>Default Accordion</Card.Title>
                                 <Card.Text className="m-0 subtitle">
                                   Default accordion. Add <code>accordion</code> class in root
                                 </Card.Text> */}
                               </div> 
							  
								
								
                               <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                                   <Nav.Item as="li" className="nav-item" role="presentation">
                                     <Nav.Link as="button"  type="button" eventKey="Preview">All</Nav.Link>
                                   </Nav.Item>
                                   <Nav.Item as="li" className="nav-item" >
                                     <Nav.Link as="button"  type="button" eventKey="Code">Accural</Nav.Link>
                                   </Nav.Item>
                               </Nav>
                                            </div>
                                            <div className="card-body p-3 m_t_1 custome-tooltip"> 
											{/* <div className="row">
                                {chartCardBlog.map((item, ind)=>(
                                    <div className="col-xl-4 col-sm-4" key={ind}>
                                        <div className="card">
                                            <div className="card-header p-2 border-0">
												
                                                <div className="d-flex a_i_c">
                                                    <div className={`icon-box rounded-circle bg-${item.cardColor}-light`}>
                                                     {item.svg}
                                                    </div>
                                                    <div className="ms-2 add-visit">
                                                        <h6 className="mb-0">{item.title}</h6>
                                                       
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body p-0 custome-tooltip">                                            
                                                <AddVisitorLine colorTheme ={item.chartTheme} />
                                            </div>
                                        </div>
                                    </div>
                                ))}                                
                            </div>        
							                                        */}
                                                <Tab.Content className="tab-content" id="myTabContent">
                             <Tab.Pane eventKey="Preview">
					
							<InvoiceDashboard invoiceGraph={invoiceGraph} filter={filter}/>
				
                                    
                                    
                             </Tab.Pane>
							 <Tab.Pane eventKey="Code">
							<InvoiceDashboard apprial={true} invoiceGraph={invoiceGraph}/>

							 {/* <CrmMarketArea / > */}
                                    
                                    
                             </Tab.Pane>
							 </Tab.Content>
                                            </div>
                                        </div>
										
								</Tab.Container>
								
                                    </div>
					   <div className="profile-tab">
								<div className="custom-tab-1">
									<Tab.Container defaultActiveKey={"All"}
							  onSelect={(key) => FetstatusInvoice(key)}
							  >					
										<Nav as='ul' className="nav nav-tabs">
											<Nav.Item as='li' className="nav-item">
												<Nav.Link to="#my-posts" eventKey='All'>All</Nav.Link>
											</Nav.Item>
											<Nav.Item as='li' className="nav-item">
												<Nav.Link to="#about-me"  eventKey='Sent'>Sent</Nav.Link>
											</Nav.Item>
											<Nav.Item as='li' className="nav-item">
												<Nav.Link to="#about-me"  eventKey='Paid'>Paid</Nav.Link>
											</Nav.Item>
											<Nav.Item as='li' className="nav-item">
												<Nav.Link to="#profile-settings" eventKey='Overdue'>Overdue</Nav.Link>
											</Nav.Item>
											<Nav.Item as='li' className="nav-item">
												<Nav.Link to="#profile-settings" eventKey='Draft'>Draft</Nav.Link>
											</Nav.Item>
										</Nav>
										<Tab.Content>
											<Tab.Pane id="my-posts"  eventKey='All'>
     <div className='mt-2'>
	 {
		InvoiceLoading ?
		 <Loader/>
		 :
     
	 <Invoice/>
      
	 }

		</div>											   
											</Tab.Pane>
											<Tab.Pane id="about-me" eventKey='Sent'>
											{
		InvoiceLoading ?
		 <Loader/>
		 : 
	 <Invoice/>
                      }
	 
												 
											</Tab.Pane>
											<Tab.Pane id="profile-settings" eventKey='Paid'>
											{
		InvoiceLoading ?
		 <Loader/>
		 : 
	 <Invoice/>
      
	 }
												 
											</Tab.Pane>
				
				
											<Tab.Pane id="profile-settings" eventKey='Overdue'>
	
											{
		InvoiceLoading ?
		 <Loader/>
		 : 
		 <InvoiceOverdue/>

	 
	 }
	
	
												 
											</Tab.Pane>
											<Tab.Pane id="profile-settings" eventKey='Draft'>
											{
		InvoiceLoading ?
		 <Loader/>
	  : 
	  <Invoice/>

      
	 }
												 
											</Tab.Pane>
										</Tab.Content>	
									</Tab.Container>		
								</div>
							</div>	
					
						   
						</>      
						   }     
				 <Tab.Container defaultActiveKey={activekey}
							  onSelect={(key) => setActivekey(key)}
							 >
                    <Nav as="ul" className="nav nav-pills success-tab" id="pills-tab" role="tablist"
							 onChange={(e)=>console.log("eggg",e)}
					 >
                        <Nav.Item as="li" >
                            <Nav.Link as="button" eventKey={'Invoice'}
							 onChange={(e)=>console.log("eggg",e)}>
                                {SVGICON.SocialHeart}
                                <span>Invoices</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" >
                            <Nav.Link as="button" eventKey={'Expence'}>
                                {SVGICON.Folder}
                                <span>Expenses</span>
                            </Nav.Link>
                        </Nav.Item>
                       
						
                    </Nav> 
					 {/* <p>Sathish</p> */}
                    {/* <Tab.Content>
                        <Tab.Pane eventKey={'Invoice'}>   
					                
                        
                        </Tab.Pane>
                        <Tab.Pane eventKey={'Expence'}>
							 
							  
                        </Tab.Pane>
                    
                    </Tab.Content>                */}
                </Tab.Container>
				 </div>
				{/* <div>
											<CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink>
										</div> */}
            </div>
         </div>   	
					{/* <div className='col-xl-12'>
						<div className="card">            
							<div className="card-body p-0">
								<div className="table-responsive active-projects task-table">   
									<div className="tbl-caption d-flex justify-content-between align-items-center">
										<h4 className="heading mb-0">Task</h4>
										<div>
											<CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink>
										</div>
									</div>    
									<div id="task-tbl_wrapper" className="dataTables_wrapper no-footer">
										<table id="empoloyeestbl2" className="table ItemsCheckboxSec dataTable no-footer mb-2 mb-sm-0">
											<thead>
												<tr>
													<th className="sorting_asc_15" >
														<div className="form-check custom-checkbox ms-0">
															<input type="checkbox" className="form-check-input checkAllInput" required="" 																
																onClick={()=>handleCheckedAll(unchecked)}
															/>
															<label className="form-check-label" htmlFor="checkAll"></label>
														</div>
													</th>
													<th>#</th>
													<th>Name</th>
													<th>Status</th>
													<th>Start Date</th>
													<th>End Date</th>
													<th>Assigned To</th>
													<th>Tags</th>
													<th className="text-end">Priority</th>
												</tr>
											</thead>
											<tbody>
												{statusPriority.map((item, index)=>(
													<tr key={index}>
														<td className="sorting_25">
															<div className="form-check custom-checkbox">
																<input type="checkbox" className="form-check-input" 																	
																	id={`user-${item.id}`}
																	checked={item.inputchecked}
																	onChange={()=>handleChecked(item.id)}
																/>
																<label className="form-check-label" htmlFor={`user-${item.id}`}></label>
															</div>
														</td>
														<td><span>{index + 101}</span></td>
														<td>
															<div className="products">
																<div>
																	<h6>{item.title}</h6>
																	<span>{item.invid}</span>
																</div>	
															</div>
														</td>
														<td>
															<Dropdown className="task-dropdown-2">
																<Dropdown.Toggle as="div" className={item.status}>{item.status}</Dropdown.Toggle>
																<Dropdown.Menu className='task-drop-menu'>
																	<Dropdown.Item  onClick={()=>handleAction(item.id,'In Progress')}>In Progress</Dropdown.Item>
																	<Dropdown.Item onClick={()=>handleAction(item.id,'Pending')}>Pending</Dropdown.Item>
																	<Dropdown.Item onClick={()=>handleAction(item.id,'Testing')}>Testing</Dropdown.Item>
																	<Dropdown.Item onClick={()=>handleAction(item.id,'Complete')}>Complete</Dropdown.Item>
																</Dropdown.Menu>
															</Dropdown>															
														</td>
														<td><span>{item.startdate}</span></td>
														<td>
															<span>{item.enddate}</span>
														</td>
														<td>
															<div className="avatar-list avatar-list-stacked">
																{item.assign === "3" ? 																
																	<>
																		<img src={IMAGES.contact6} className="avatar avatar-md rounded-circle" alt="" />{" "}
																		<img src={IMAGES.contact5} className="avatar avatar-md rounded-circle" alt="" />{" "}
																		<img src={IMAGES.contact3} className="avatar avatar-md rounded-circle" alt="" />
																	</>
																: 
																item.assign === "4" ? 
																	<>
																		<img src={IMAGES.contact6} className="avatar avatar-md rounded-circle" alt="" />{" "}
																		<img src={IMAGES.contact5} className="avatar avatar-md rounded-circle" alt="" />{" "}
																		<img src={IMAGES.contact3} className="avatar avatar-md rounded-circle" alt="" />
																		<img src={IMAGES.contact1} className="avatar avatar-md rounded-circle" alt="" />
																	</>
																:

																	<>
																		<img src={IMAGES.contact6} className="avatar avatar-md rounded-circle" alt="" />{" "}
																		<img src={IMAGES.contact5} className="avatar avatar-md rounded-circle" alt="" />{" "}
																		<img src={IMAGES.contact3} className="avatar avatar-md rounded-circle" alt="" />{" "}
																		<img src={IMAGES.contact2} className="avatar avatar-md rounded-circle" alt="" />{" "}
																		<img src={IMAGES.contact1} className="avatar avatar-md rounded-circle" alt="" />
																	</>																	
																}
															</div>
														</td>	
														<td>
															<span className="badge badge-primary light border-0 me-1">Issue</span>
															<span className="badge badge-secondary light border-0 ms-1">HTML</span>
														</td>
														<td className="text-end">															
															<Dropdown className="task-dropdown-2">
																<Dropdown.Toggle as="div" className={item.select}>{item.select}</Dropdown.Toggle>
																<Dropdown.Menu className='task-drop-menu'>
																	<Dropdown.Item onClick={()=>handleSelect(item.id,'High')}>High</Dropdown.Item>
																	<Dropdown.Item onClick={()=>handleSelect(item.id,'Medium')}>Medium</Dropdown.Item>
																	<Dropdown.Item onClick={()=>handleSelect(item.id,'Low')}>Low</Dropdown.Item>																	
																</Dropdown.Menu>
															</Dropdown>
														</td>
													</tr>
												))}
											</tbody>
											
										</table>
										<div className="d-sm-flex text-center justify-content-between align-items-center">
											<div className='dataTables_info'>
												Showing {lastIndex-recordsPage + 1} to{" "}
												{tableData.length < lastIndex ? tableData.length : lastIndex}
												{" "}of {tableData.length} entries
											</div>
											<div
												className="dataTables_paginate paging_simple_numbers justify-content-center"
												id="example2_paginate"
											>
												<Link
													className="paginate_button previous disabled"
													to="#"                                        
													onClick={prePage}
												>
													<i className="fa-solid fa-angle-left" />
												</Link>
												<span>                                      
													{number.map((n , i )=>(
														<Link className={`paginate_button ${currentPage === n ? 'current' :  '' } `} key={i}                                            
															onClick={()=>changeCPage(n)}
														> 
															{n}                                                

														</Link>
													))}
												</span>
												<Link
													className="paginate_button next"
													to="#"                                        
													onClick={nextPage}
												>
													<i className="fa-solid fa-angle-right" />
												</Link>
											</div>
										</div> 
									</div>
								</div>
							</div>
						</div>
					</div> */}
				</div>	
			</div>		
		


<Drawer
        title="Add Expense"
        placement="right"
        closable={true}
        onClose={handleDrawerClose}
        visible={drawerVisible}
        width={600}
      >
         <ExpenceAdd setFileError={setFileError} setAttachment={setAttachment}  handleDrawerClose={handleDrawerClose} handleFinish={handleFinish}/>
      </Drawer>
  <Drawer
  title="Edit Expense"
  placement="right"
  closable={true}
  onClose={handleOpenEditExpence}
  visible={expenceEditPopup}
  width={600}
>
   <ExpenceEdit setFileError={setFileError} setAttachment={setAttachment}  handleDrawerClose={handleDrawerClose} handleFinish={handleFinish}/>
</Drawer>

<Modal
title=""
placement="right"
visible={customPopup}
onCancel={openCustompopup}
okButtonProps={{ style: { display: 'none' } }}
cancelButtonProps={{ style: { display: 'none' } }}


// open={viewInterviewDrawer}
height={50}
width={500}

>
	 <SelectRange/>
	 {/* <AddList/> */}
{/* <AddInterViewPopup status={status}/> */}
</Modal>
            
		</>



        
	);
};

export default InvoiceExpence;