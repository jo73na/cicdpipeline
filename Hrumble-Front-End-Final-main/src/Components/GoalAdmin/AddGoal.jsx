import { LeftOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router";
import { DownOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Modal, Spin, Tabs, Tree } from 'antd';
import AssignedTarget from "./AssignedTarget";
import Search from "antd/es/input/Search";
import { useContext } from "react";
import GoalContext from "../../Providers/Goal";
import AddTeam from "./AddTeam";
import { useEffect } from "react";
import Loader from "../../Utils/Loader";
import AddsubTeam from "./AddsubTeam";
import Teamstab from "./Teamstab";


const AddGoal = () => {
    const navigate=useNavigate();

     const {visiblesub,handleopenSub,onClosesub,teamsingle,Loading,onClose,visible,handleopen,fethTeams,teams,teamsusers,handleSelectMenu}=useContext(GoalContext)
    console.log("Loading",Loading)
    const items = [
      {
        key: "1",
        label: "Members",
         children:<Teamstab/> 
      },
    ]


    const menuThree = (parent, menu) => {
      const filter = menu?.filter((e) => {
        return String(e?.parent_id||null) === String(parent) });
        console.log(filter,("filter"));
        const list = filter?.map((e) => {
          return {
            title: e?.team_name,
            key: e?._id,
            children: menuThree(e?._id, menu)
             
          }})
          return list
          
       
      ;}
    const treeData = menuThree(null,teams)
    const onSelect = (selectedKeys, info) => {
      console.log('selected', selectedKeys, info);
       handleSelectMenu(selectedKeys[0])
    };

    useEffect(() => {
      fethTeams()
    }, [])
    
  return (
    <>
   
    <p className='heading_text'><LeftOutlined className='back' onClick={()=>navigate(-1)}/>Team</p>

    <div className="d_f a_i_f_s j_c_s_b f_d_c_xs m_b_5 m_t_5 g_5 f_d_c_sm">
        <Search
          className="input_search"
          allowClear
          placeholder="Search by Team"
          enterButton
          // onChange={handleChangeSearch}
          // value={searchjob}
        />
        <div className="d_f a_i_c g_5">
          {/* {filter?.options?.includes("Create Job") && ( */}
            <button
             
              className="btn btn-primary btn-sm"
               onClick={handleopen}
            >
              + Add Team
            </button>
            <button
            
              className="btn btn-warning btn-sm"
               onClick={()=>navigate("/goal")}
            >
              Goals
            </button>
       
        </div>
      </div>

     <div className="d_f ">
       <div className="m_10 card "
        style={{
         width: "280px"
        }}
        >
        <h4 className=" m_l_10 m_t_20">Total Created Teams {treeData?.length}</h4>
        <p className="m_l_10 m_t_5">This includes all the teams and child Teams</p>
      
       <Tree
        className="m_30"
      showLine
      switcherIcon={<DownOutlined />}
      defaultExpandedKeys={['0-0']}
      onSelect={onSelect}
      treeData={treeData}
    />
       </div>
       {
      
         <div className="card m_10"
         style={{
          width:"700px",
         }}>
      <div className=" m_t_10 m_b_10 p_10 responsive_table">
         <div className="d_f j_c_s_b">
       <p className="heading_text">{teamsingle?.team_name}</p>
       <h6 className="c_primary"
       onClick={handleopenSub}
        style={{
          marginRight:"10px",
          cursor: "pointer"
        }}>+ Add Sub Team</h6>

          </div>
      { Loading ?
          <Loader/>
         :
       <Tabs
         items={items}
         defaultActiveKey="1"
         // tabBarExtraContent={filtericon}
       />
      }
     </div>
      </div>
       }
       {/* <div className="card m_10"
          style={{
           width:"700px",
          }}>
       <div className=" m_t_10 m_b_10 p_10 responsive_table">
        <p className="heading_text">Shabnam</p>
        <Tabs
          items={items}
          defaultActiveKey="1"
          // tabBarExtraContent={filtericon}
        />
      </div>
       </div> */}

     </div>


     < Modal
        title="Add Team"
        width={500}
        onCancel={onClose}
        open={visible}
        closable={visible}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        // bodyStyle={{ paddingBottom: 80 }}
      >
        <AddTeam/>
      </Modal>
      <Modal
        title="Add Sub Team"
        width={500}
        onCancel={onClosesub}
        open={visiblesub}
        // closable={visiblesub}
      
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        // bodyStyle={{ paddingBottom: 80 }}
      >
        <AddsubTeam/>
      </Modal>
     </>
  )
}

export default AddGoal