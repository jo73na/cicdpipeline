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
import AddGoalType from "./AddGoalType";
import Addgoalcondition from "./Addgoalcondition";
import { Breadcrumb } from "../UtlilsComponent/Breadcrumb";
import { Link } from "react-router-dom";



const Goal = () => {
    const navigate=useNavigate();

     const {visiblecondition,onCloseconditon,goalsingle,visiblegoal,handleSelectMenuGoal,goals,visiblesub,handleopenSub,onClosesub,teamsingle,Loading,onCloseGoaltype,visible,handleopengoaltype,fethGoals,teams,teamsusers,handleSelectMenu}=useContext(GoalContext)
    console.log("Loading",Loading)
    const items = [
      {
        key: "1",
        label: "Goal Types",
         children:<AssignedTarget/> 
      },
    ]


    const menuThree = (parent, menu) => {
      const filter = menu?.filter((e) => {
        return String(e?.parent_id||null) === String(parent) });
        console.log(filter,("filter"));
        const list = filter?.map((e) => {
          
            if(e?.email_id){
                return {title: e?.name,
                    key: e?._id,
                    disabled: false,
                    children:
                    e.children?.length>0 ?
                    menuThree(e?._id,e.children):
                     menuThree(e?._id, menu)
                    }
            }
            else{

            
            return {title: e?.name,
            key: e?._id,
            disabled: false,
            children:
            e.children?.length>0 ?
            menuThree(e?._id,e.children):
             menuThree(e?._id, menu)
            }
             
     } })
          return list
          
       
      ;}
    const treeData = menuThree(null,goals)
    const onSelect = (selectedKeys, info) => {
      console.log('selected', selectedKeys, info);
       handleSelectMenuGoal(selectedKeys[0])
    };

    useEffect(() => {
         fethGoals()
    }, [])

  //   let breadcrumb =[ {
  //     title: <Link to="/">Home</Link> ,
  //   },
  //   {
  //     title: <Link to="/teams">Team</Link> ,
  //   },
  //   {
  //     title:  <Link to="/goal">Goals</Link> ,
  //     active:true
  //   },
  // ]
    
  return (
    <>
     {/* <div className="d_f j_c_s_b a_i_f_s">
    <p className='heading_text'>Goals</p>
    <Breadcrumb breadcrumb={breadcrumb}/>

     </div> */}

    <div className="d_f a_i_f_s  j_c_s_b f_d_c_xs m_b_5 m_t_5 g_5 f_d_c_sm">
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
              type="button"
              className="btn btn-primary btn-sm"
               onClick={handleopengoaltype}
            >
              + Add Goal
            </button>
            {/* <Button
              type="primary"
              className="btn create_btn"
               onClick={handleopen}
            >
              Goals
            </Button> */}
       
        </div>
      </div>

     <div className="d_f ">
       <div className="m_10 card "
        style={{
         width: "280px"
        }}
        >
        <h4 className=" m_l_10 m_t_20">Teams {treeData?.length}</h4>
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
       <p className="heading_text">{goalsingle?.name}</p>
       <h6 className="c_primary"
       onClick={handleopengoaltype}
        style={{
          marginRight:"10px",
          cursor: "pointer"
        }}>+ Add Goal Type</h6>

          </div>
      { Loading ?
          <Loader/>
         :
         <>
        
       <Tabs
         items={items}
         defaultActiveKey="1"
         // tabBarExtraContent={filtericon}
       />
        </>
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
        title="Add Goal Type"
        width={500}
        onCancel={onCloseGoaltype}
        open={visiblegoal}
        closable={visiblegoal}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        // bodyStyle={{ paddingBottom: 80 }}
      >
        <AddGoalType/>
      </Modal>
      <Modal
        // title="Add"
        width={500}
        onCancel={onCloseconditon}
        open={visiblecondition}
         closable={visiblecondition}
      
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        // bodyStyle={{ paddingBottom: 80 }}
      >
        <Addgoalcondition/>
      </Modal>
     </>
  )
}

export default Goal