import React, {useState,useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { IMAGES } from '../../../Utils/SVGICON';
import { Button, Input, Table, Select, Tooltip } from 'antd';
import LeaveContext from '../../../Providers/Leaves';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Dropdown } from 'react-bootstrap';
import dayjs from 'dayjs';

const TimelineLeave = ({ leftSideHeight }) => {
    const { requestleaves } = useContext(LeaveContext);
    const colors = ['primary', 'info', 'danger', 'success', 'warning', 'dark'];
  
    return (
      <div
        className="col-lg-4 col-md-12"
        style={{ marginLeft: '8px', height: `${leftSideHeight}px` }} 
      >
        <div className="card h-90">
          <div className="card-header border-0 pb-0">
            <h4 className="card-title">Timeline</h4>
          </div>
          <div className="card-body"  style={{
            height: 'calc(100% - 50px)', 
            overflowY: 'auto', 
            padding: '10px', 
          }}>
            <div
            //   style={{ height: '100%' }}
              id="DZ_W_TimeLine1"
              className="widget-timeline dz-scroll style-1 ps--active-y"
            >
              <ul className="timeline">
                {requestleaves.map((item, index) => {
                  const color = colors[index % colors.length];
                  return (
                    <li key={item.id || index}>
                      <div className={`timeline-badge ${color}`}></div>
                      <Link className="timeline-panel text-muted" to="/widget-basic">
                        <span>{moment(item.createdAt).fromNow()}</span>
                        <h6 className="mb-0">
                          {item.employee_id?.name}
                        </h6>
                        <span>
                          <h9>{item?.leave_id?.leave_title}</h9>
                        </span>
                        <h8 className="mb-0">
                          <strong className={`text-${color}`}>
                            From {moment(item?.startDate).format('DD-MM-YYYY')} to{' '}
                            {moment(item?.endDate).format('DD-MM-YYYY')}
                          </strong>
                        </h8>
                        {item.status == "Approved" && "Rejected" && (
                          <p className="mb-0">
                            {item.status} by {item?.approved_by?.name}
                          </p>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default TimelineLeave;




  ////////////
  <tr key={index}>
  {/* <td className="sorting_25">
      <div className="form-check custom-checkbox">
          <input type="checkbox" className="form-check-input" 																	
              id={`user-${item.id}`}
              checked={item.inputchecked}
              onChange={()=>handleChecked(item.id)}
          />
          <label className="form-check-label" htmlFor={`user-${item.id}`}></label>
      </div>
  </td> */}
  {/* <td><span>{index + 101}</span></td> */}
  <td>{dayjs(item.createdAt).format("DD-MM-YYYY")}</td>

  <td>
      <div className="products">
          <div>
              {item?.leave_id?.leave_title}
              {/* <span>{item?.job_id}</span> */}
          </div>	
      </div>
  </td>
  <td><span>{dayjs(item?.startDate).format("DD-MM-YYYY")}</span></td>
  <td><span>{dayjs(item?.startDate).format("DD-MM-YYYY")}</span></td>
  <td className='table-number'><span>{item.no_of_days}</span></td>
  <td className="pe-0">
                                         <Tooltip title={item?.reason || '-'}>
                 <span className="truncate">{item?.reason || '-'}</span>
               </Tooltip>
                                         </td> 
  <td><span>
   {
     item?.status == "Pending" ?
     <span className="badge badge-warning light border-0 me-1">{item?.status}</span>
     :
     <span className="badge badge-success light border-0 me-1">{item?.status}</span>


   }
   </span></td>
  <td><span>{item.approved_by? item?.approved_by?.name:"-"}</span></td>
  
 
  {/* <td>
      <span>{item.enddate}</span>
  </td> */}
  {/* <td>
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
  </td>	 */}

  {/* <td className="text-end">															
      <Dropdown className="task-dropdown-2">
          <Dropdown.Toggle as="div" className={item.select}>{item.select}</Dropdown.Toggle>
          <Dropdown.Menu className='task-drop-menu'>
              <Dropdown.Item onClick={()=>handleSelect(item.id,'High')}>High</Dropdown.Item>
              <Dropdown.Item onClick={()=>handleSelect(item.id,'Medium')}>Medium</Dropdown.Item>
              <Dropdown.Item onClick={()=>handleSelect(item.id,'Low')}>Low</Dropdown.Item>																	
          </Dropdown.Menu>
      </Dropdown>
  </td> */}
</tr>