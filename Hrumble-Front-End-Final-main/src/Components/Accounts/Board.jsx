import React, { useContext, useEffect } from 'react'
import { Nav, Tab } from 'react-bootstrap'
import KanbanBoard from '../UtlilsComponent/KanbanBorad'
import { SVGICON } from '../../Utils/SVGICON'
import SpaceContext from '../../Providers/Space'
import { useNavigate, useParams } from 'react-router-dom';


const Board = () => {

     const {fetchListSingle,ListSingle}=useContext(SpaceContext)
     const params =useParams()
    const navigate = useNavigate()

     
     useEffect(() => {
        fetchListSingle(params?.id)
      }, [])

     
  return (
    <div className="card p_10">
    <div className="card-header border-0 pb-0 flex-wrap">
        <h4 className="heading mb-0">
        <i className="fa-solid fa-chevron-left me-2"
      onClick={()=>navigate(-1)}
     style={
        {
            cursor:"pointer"
        }
     }></i >
             {ListSingle?.list_name}</h4>
    </div>
    <div className="card-body px-0 pb-0">
         <div>
         <Tab.Container defaultActiveKey={'Board'}>
            <Nav as="ul" className="nav nav-pills success-tab" id="pills-tab" role="tablist">
                <Nav.Item as="li" >
                    <Nav.Link as="button" eventKey={'Board'}>
                        {SVGICON.SocialHeart}
                        <span>Board</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li" >
                    <Nav.Link as="button" eventKey={'Project'}>
                        {SVGICON.Folder}
                        <span>List</span>
                    </Nav.Link>
                </Nav.Item>
               
                
            </Nav> 
             {/* <p>Sathish</p> */}
            <Tab.Content>
                <Tab.Pane eventKey={'Board'}>                                
                     <KanbanBoard/>                        
                </Tab.Pane>
              
            
            </Tab.Content>               
        </Tab.Container>
         </div>
        {/* <div>
                                    <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink>
                                </div> */}
    </div>
 </div>   	
  )
}

export default Board