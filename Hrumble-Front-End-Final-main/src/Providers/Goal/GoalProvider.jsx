import React, { useEffect, useState} from 'react';
import axios from 'axios';
// import { FaqApi } from '../../api';
import Context from './index';
import { BASE_URL } from '../../Utils/api';
import CookieUtil from '../../Utils/Cookies';
import { notification } from 'antd';



const GoalProvider =(props) => {
    const [comapnyDetails, setComapnyDetails] = useState([]);
    const [goalTypes, setGoalTypes] = useState([]);
    const [user_id, setuser_id] = useState("");
    const [users,setUsers]=useState([]);
    const [teamSelect, setTeamsselect] = useState([]);
    const [goals, setGoals] = useState([]);
    const [teamsingle,setTeamSingle ] = useState({});
    const [goalsingle,setGoalSingle ] = useState({});
    const [teams, setTeams] = useState([]);
    const [teamsusers, setTeamsusers] = useState([]);
    const [visible, setvisible] = useState(false);
    const [visiblesub, setvisiblesub] = useState(false);
    const [visiblecondition, setvisiblecondition] = useState(false);
    const [visiblegoal, setvisibleGoal] = useState(false);
    const [buttonLodainggoal, setButtonloadingGoal] = useState(false);
    const [buttonLodaing, setButtonloading] = useState(false);
    const [openSettingsEdit, setOpenSettingsEditDrawer] = useState(false);
    const [Loading, setLoading] = useState(false);



    const token =CookieUtil.get("admin_token")

    const fethTeams = async () => {
 
        let api=`${BASE_URL}/team`
        // let piecharthapi=`${BASE_URL}/expense/piechart`
         setLoading(true)
        try {
            await axios.get(api).then( async(resp) => {
                setTeams(resp.data.data)
         setLoading(false)

             
               
            });
         
          
        } catch (error) {
            console.log('error', error);
        // setLoading(false)
 
        }
    };

    const FetcTeamAdd = async () => {
 
      let api=`${BASE_URL}/usermangmentroles`
      // let piecharthapi=`${BASE_URL}/expense/piechart`
      //  setLoading(true)
      try {
          await axios.get(api).then( async(resp) => {
              setUsers(resp.data.data)
      //  setLoading(false)

           
             
          });
       
        
      } catch (error) {
          console.log('error', error);
      // setLoading(false)

      }
  };
    const fethGoals = async () => {
 
        let api=`${BASE_URL}/team/goal`
        let apicaluctaions=`${BASE_URL}/team/calculations`
        // let piecharthapi=`${BASE_URL}/expense/piechart`
         setLoading(true)
        try {
            await axios.get(api).then( async(resp) => {
                setGoals(resp.data.data)
         setLoading(false)

               
            });
            await axios.get(apicaluctaions).then( async(resp) => {
                console.log(resp.data.data)
         setLoading(false)

             
               
            });
         
          
        } catch (error) {
            console.log('error', error);
         setLoading(false)

        // setLoading(false)
 
        }
    };
    const fetchteamSelect = async () => {
 
        let api=`${BASE_URL}/team/teamselect`
        //  let teamusers=`${BASE_URL}/team/teamusers`
        // let piecharthapi=`${BASE_URL}/expense/piechart`
        //  setLoading(true)
        try {
            await axios.get(api).then( async(resp) => {
                setTeamsselect(resp.data.data)
             
                 
            });
          

        
          
        } catch (error) {
            console.log('error', error);
        // setLoading(false) 
 
        }
    };
    const handleSelectMenu = async (id) => {
 
        let api=`${BASE_URL}/team/${id}`
         let teamusers=`${BASE_URL}/team/teamusers/${id}`
        // let piecharthapi=`${BASE_URL}/expense/piechart`
        setLoading(true)
        try {
            await axios.get(api).then( async(resp) => {
                setTeamSingle(resp.data.data)
             
               
            });
            await axios.get(teamusers).then((resp) => {
                setTeamsusers(resp.data.data);
         setLoading(false)

            });
          
        } catch (error) {
            console.log('error', error);
        setLoading(false)
 
        }
    };
    const handleSelectMenuGoal = async (id) => {
 
        let api=`${BASE_URL}/team/goaltype/${id}`
          let teamusers=`${BASE_URL}/team/goaltypes/${id}`
        // let piecharthapi=`${BASE_URL}/expense/piechart`
        setLoading(true)
        try {
            await axios.get(api).then( async(resp) => {
                setGoalSingle(resp.data.data)
        //  setLoading(false)

             
               
            });
            await axios.get(teamusers).then((resp) => {
                setGoalTypes(resp.data.data);
         setLoading(false)

            });
          
        } catch (error) {
            console.log('error', error);
        setLoading(false)
 
        }
    };

 
    const handleClickAddTeam = async (id) => {
        try {
      

          await axios 
            .put(`${BASE_URL}/team/add/${id}`, {parent_id:teamsingle?._id})
            .then((res) => {
              notification.success({
                message: res?.data?.message,
                duration: 1,
              });
           
              handleSelectMenu(teamsingle?._id)
              
            });
        } catch (err) {
          console.log(err);
          setLoading(false);  
        }
      };
      const handleRemove = async (id) => {
        try {
      

          await axios 
            .put(`${BASE_URL}/team/add/${id}`, {parent_id:null})
            .then((res) => {
              notification.success({
                message: res?.data?.message,
                duration: 1,
              })
              
           
              handleSelectMenu(teamsingle?._id)
              
            });
        } catch (err) {
          console.log(err);
          setLoading(false);  
        }
      };

    const fetchGoalTypes = async () => {
 
        let api=`${BASE_URL}/goaltypes`
      
        setLoading(true)
        try {
            await axios.get(api).then((resp) => {
                setGoalTypes(resp.data.data);
            });
          
        } catch (error) {
            console.log('error', error);
        setLoading(false)
 
        }
    };

    const handleopen =()=>{
        setvisible(!visible)
    }
    const onClose =()=>{
        setvisible(!visible)
    }
 
    const handleopenSub =()=>{
        setvisiblesub(!visiblesub)
    }
    const onClosesub =()=>{
        setvisiblesub(!visiblesub)
    }
    const handleopengoaltype =()=>{
        setvisibleGoal(!visiblegoal)
    }
    const onCloseGoaltype =()=>{
        setvisibleGoal(!visiblegoal)
    }
    const handleopencodnition =()=>{
        setvisiblecondition(!visiblecondition)
    }
    const onCloseconditon =()=>{
        setvisiblecondition(!visiblecondition)
    }

    // useEffect(() => {
    //     console.log('Component rendered');
    //     fetchEmploy();
    // },[]);
    const onFinishTeam = async (values,form) => {
        try {
          await axios
            .post(`${BASE_URL}/team`, values)
            .then((res) => {
              notification.success({
                message: res?.data?.message,
                duration: 1,
              });
              onClose();
    form.resetFields()

              fethTeams();
            });
        } catch (err) {
          console.log(err);
          setLoading(false);  
        }
      };

      const onFinishGoaltype = async (values,form) => {
         setButtonloadingGoal(true)
        try {
          await axios
            .post(`${BASE_URL}/team/goaltype`, values)
            .then((res) => {
              notification.success({
                message: res?.data?.message,
                duration: 1,
              });
         setButtonloadingGoal(false)
         handleSelectMenuGoal(goalsingle?._id)

              onCloseGoaltype();
    form.resetFields()

            //   fethTeams();
            });
        } catch (err) {
          console.log(err);
          setButtonloadingGoal(false)
          
        }
      };
      const onFinishTeamsub = async (values,form) => {
        try {
          await axios
            .post(`${BASE_URL}/team`, values)
            .then((res) => {
              notification.success({
                message: res?.data?.message,
                duration: 1,
              });
              onClosesub();
    form.resetFields()
              
              fethTeams();
            });
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      }
      const onFinishcondition = async (values,form) => {
        try {
          await axios
            .put(`${BASE_URL}/team/goalcondition/${user_id}`, values)
            .then((res) => {
              notification.success({
                message: res?.data?.message,
                duration: 1,
              });
              onCloseconditon();
    form.resetFields()
    handleSelectMenuGoal(goalsingle?._id)

              
            //   fethTeams();
            });
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      };


    return (
        <Context.Provider
            value={{
                ...props,
              
             
                fetchGoalTypes,
                visible,
                handleopen,
                onFinishTeam,
                onClose,
                teamsusers,
                teams,
                fethTeams,
                handleSelectMenu,
                Loading,
                teamsingle,
                visiblesub,
                onClosesub,
                handleopenSub,
                fetchteamSelect,
                handleClickAddTeam,
                teamSelect,
                onFinishTeamsub,
                handleRemove,
                fethGoals,
                goals,
                goalsingle,
                handleSelectMenuGoal,
                handleopengoaltype,
                onCloseGoaltype,
                visiblegoal,
                buttonLodainggoal,
                buttonLodaing,
                onFinishGoaltype,
                goalTypes,
                onCloseconditon,
                visiblecondition,
                setvisiblecondition,
                handleopencodnition,
                onFinishcondition,
                setuser_id,
                FetcTeamAdd,
                users
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default GoalProvider;