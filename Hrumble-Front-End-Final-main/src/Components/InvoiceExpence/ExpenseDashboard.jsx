import Expence from "./Expence"
import {Link, useNavigate,} from 'react-router-dom';
import { Tab, Nav } from 'react-bootstrap';
import Loader from './../../Utils/Loader';
import { useContext, useEffect, useState } from "react";
import InvoiceExpenceContext from "../../Providers/InvoiceExpence";
import TrafficBarChart from "../UtlilsComponent/TrafficBarChart";
import CrmMarketArea from "../UtlilsComponent/CrmMarketArea";
import { SVGICON } from "../../Utils/SVGICON";
import { Drawer,Modal } from "antd";
import ExpenceAdd from "./ExpenceAdd";
import ExpenceEdit from './ExpenceEdit';
import ExpenseOthersTable from "./ExpenceOthersTable";
import SelectRange from './SelectRange';



const ExpenseDashboard = () => {
	const {paginationExpenceOthers,expenceEditPopup,handleOpenEditExpence,handleviewInvoice,invoiceGraph,openCustompopup,customPopup,paginationExpence,fetchexpencedata,InvoiceLoading,fetchInvoice,FetstatusInvoice,invoicedata,handleAddExpense,fetchinvoicedata,handleFinishExpence,fetchExpence,expencegraph,Loading} =useContext(InvoiceExpenceContext)
    const [filterExpense,setFilterExpense]=useState("Year")
    const [filter,setFilter]=useState("Year")
    const [activekey,setActivekey]=useState("Invoice")
	const [fileError, setFileError] = useState(false);

	const [attachment, setAttachment] = useState("");

	const [drawerVisible, setDrawerVisible] = useState(false);


    const handleFinish = (values,form) => {
		console.log("expenceAddemployee",values)
		var formdata=new FormData()

    const expenseCost =Number( values["expense_cost"]?.replace(/,/g, '') || 0);
    const taxCost = Number(values["tax_cost"]?.replace(/,/g, '')) || 0;
	 
		formdata.append("expense_type",values["expense_type"])
		values["employee_id"] &&formdata.append("employee_id",values["employee_id"])
		values["tax_cost"] &&formdata.append("tax_cost",Number(values["tax_cost"]?.replace(/,/g, '')))
    formdata.append("expense_cost",expenseCost+taxCost)
    formdata.append("expense_salary",expenseCost)
		formdata.append("expense_desc",values["expense_desc"])
		formdata.append("expense_date",values["date"]?.$d)
		values["others_type"] &&formdata.append("others_type",values["others_type"])
		values["others_type_sub"] &&formdata.append("others_type_sub",values["others_type_sub"])
		formdata.append("attachment",attachment)
		handleFinishExpence(formdata,form)
		handleDrawerClose()
	   
	   
	   }
     const handleFinishEdit = (values,form) => {
      console.log("expenceAddemployee",values)
      var formdata=new FormData()
      const expenseCost = values["expense_cost"] || 0;
      const taxCost = values["tax_cost"] || 0;
      formdata.append("expense_type",values["expense_type"])
      values["employee_id"] &&formdata.append("employee_id",values["employee_id"])
      values["tax_cost"] &&formdata.append("tax_cost",values["tax_cost"])
      formdata.append("expense_cost",expenseCost+taxCost)
      formdata.append("expense_salary",expenseCost)
      formdata.append("expense_desc",values["expense_desc"])
      formdata.append("expense_date",values["date"]?.$d)
      values["others_type"] &&formdata.append("others_type",values["others_type"])
      values["others_type_sub"] &&formdata.append("others_type_sub",values["others_type_sub"])
      formdata.append("attachment",attachment)
      handleFinishExpence(formdata,form,true,handleDrawerClose)
      handleOpenEditExpence()


     
       
       
       }
    useEffect(() => {
        if(filterExpense == "Custom"){
           openCustompopup()
        }
        else{
        fetchexpencedata(filterExpense)
               
        }
	 
	   
	 }, [filterExpense,paginationExpence?.current,paginationExpenceOthers.current])


     
	  const handleAddExpenseClick = () => {
		setDrawerVisible(true);
	  };


      const handleDrawerClose = () => {
		setDrawerVisible(false);
		
	  };
    return (
        
            Loading  ?
             <Loader/>
            :
            <>
            <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="heading mb-0">Expense</h4>
           
        </div>
            
                 
                     <div className="card ">
                <div className="card-body px-1 pb-0">

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
                                <span>Salary</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" >
                            <Nav.Link as="button" eventKey={'Expence'}>
                                {SVGICON.Folder}
                                <span>Others</span>
                            </Nav.Link>
                        </Nav.Item>
                       
						
                    </Nav> 
					 {/* <p>Sathish</p> */}
                    <Tab.Content>
                        <Tab.Pane eventKey={'Invoice'}>   
                        <>
                        <div className='d_f a_i_c g_10 j_c_s_b mb-1'>
                
                <div>
                {/* <h4 class="heading mb-0">Total Salary Amount :$ 50000</h4> */}
                    
                </div>
                  <div className='d_f a_i_c'>
                  <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist"
                 onSelect={(key) => setFilterExpense(key)}
                 defaultActiveKey={filterExpense}  >
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
                        onClick={handleAddExpenseClick}
                   >+ Add Expense
                   </button>
                  </div>
                    </div>
                                 
                                 <div className="col-xl-12 col-sm-12 m_t_1 mt_20">	
                                 {
                                 !Loading   &&
                                 
                                                         <div className="card">
                                                             <div className="card-header p-3 border-0 d_f j_c_s_b">
                                                             <h4 className="heading mb-0">Employee Wise Salary Report</h4>   
                                 
                                                             <div>
                                 
                                 
                                 
                                                  {/* <Card.Title>Default Accordion</Card.Title>
                                                  <Card.Text className="m-0 subtitle">
                                                    Default accordion. Add <code>accordion</code> class in root
                                                  </Card.Text> */}
                                                </div> 
                                               
                                                 
                                                 
                                              
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
                                                            <div className="chart-legend">
                                 <ul className = "d_f g_10 j_c_c">
                                 <li><span className="legend-color" style={{ backgroundColor: "var(--primary)" }}></span>Salary</li>
                                 {/* <li><span className="legend-color" style={{ backgroundColor: "var(--secondary)"}}></span>Others</li> */}
                                 {/* <li><span className="legend-color" style={{ backgroundColor: '#2ca02c' }}></span> Label 3</li> */}
                                 </ul>
                                 </div>   
                                              <TrafficBarChart filter={filter} / >
                                                             </div>
                                                         </div>
                                                         
                                                 
                                 }
                                              
                                             
                                                 
                                                     </div>
                                 <div className='mt-2'>
                                 
                                 {
                                 
                                 
                                 
                                 
                                 
                                 <Expence type ="Salary"/>
                                 
                                 }
                                 
                                 </div>			
                                                            </>	        
                        
                        </Tab.Pane>
                        <Tab.Pane eventKey={'Expence'}>
                                <div className='d_f a_i_c j_c_f_e m-3'>
                  <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist"
                 onSelect={(key) => {
                  console.log("ggggg",key)

                   if(key === 'Custom'){
                     console.log("ggggg",key)
                    openCustompopup()
                    setFilterExpense(key)
                        
                   }
                   else{
                    setFilterExpense(key)
                   }
                  }
                }
                 defaultActiveKey={filterExpense}  >
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
                        onClick={handleAddExpenseClick}
                   >+ Add Expense
                   </button>
                  </div>
							     <div className="col-xl-12 col-sm-12 m_t_1 mt_20">	
            <Tab.Container defaultActiveKey="Preview">
                        <div className="card">
                            <div className="card-header p-3 border-0 d_f j_c_s_b">
                            <h4 className="heading mb-0">Employee Wise Salary Report</h4>   

                            <div>



                 {/* <Card.Title>Default Accordion</Card.Title>
                 <Card.Text className="m-0 subtitle">
                   Default accordion. Add <code>accordion</code> class in root
                 </Card.Text> */}
               </div> 
              
                
                
             
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
                           <div className="chart-legend">
<ul className = "d_f g_10 j_c_c">
<li><span className="legend-color" style={{ backgroundColor: "var(--primary)" }}></span>Salary</li>
{/* <li><span className="legend-color" style={{ backgroundColor: "var(--secondary)"}}></span>Others</li> */}
{/* <li><span className="legend-color" style={{ backgroundColor: '#2ca02c' }}></span> Label 3</li> */}
</ul>
</div>   
             <CrmMarketArea filter={filter} / >
                            </div>
                        </div>
                        
                </Tab.Container>
                
                    </div>

                    <ExpenseOthersTable/>
   
							  
                        </Tab.Pane>
                    
                    </Tab.Content>               
                </Tab.Container>
                   		
                </div>
            </div>	
            {/* <Expence/> */}


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
   <ExpenceEdit setFileError={setFileError} setAttachment={setAttachment}  handleDrawerClose={handleDrawerClose} handleFinishEdit={handleFinishEdit}/>
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
	 <SelectRange filter="Expense"/>
	 {/* <AddList/> */}
{/* <AddInterViewPopup status={status}/> */}
</Modal>

            </>
      
            
              
    )


  
}


 export default ExpenseDashboard;