import { useEffect, useState } from "react";
import axios from "axios";
// import { FaqApi } from '../../api';
import Context from "./index";
import CookieUtil from "../../Utils/Cookies";
import { BASE_URL } from "../../Utils/api";
import { notification } from "antd";

const UserManagementProvider = (props) => {
  const [userList, setuserList] = useState([]);
  const [permission, setPermission] = useState([]);
  const [RollList, setRollList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rollUsers, SetRollUsers] = useState([]);
  const [rollSingle, setRollsingle] = useState({});
  const [selectRoles, setSelectRoles] = useState([]);
  const [reportmanagers, setReportManagers] = useState([]);
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);
  const [departmentDrawerOpen, setDepartmentDrawer] = useState(false);
  const [openEditDrawer, setopenEdit] = useState(false);
  const [assignEdit, setAssignEdit] = useState({});
  const [editbutton, setEditbutton] = useState(false);
  const [openDrawer,setOpenDrawer] = useState(false);
  // const [userList, setUserList] = useState([]);
  const [roles, setRoles] = useState([]);

  const [assignButtion, setAssignButton] = useState(false);

  const admin = JSON.parse(CookieUtil.get("admin"));
  const role = CookieUtil.get("role");
  const token = CookieUtil.get("admin_token");

  const fethPermission = async () => {
    let api = `${BASE_URL}/menues`;

    try {
      //  setLoading(true)
      if (token) {
        await axios
          .get(api, {
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers if needed
            },
          })
          .then((resp) => {
            setPermission(resp.data.data);
            //  setLoading(false)
          });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchUsers = async () => {
    let apiFectUsers = `${BASE_URL}/allRoles/`;
    try {
      setLoading(true);
      await axios.get(apiFectUsers).then((resp) => {
        setuserList(resp.data.data);
        setLoading(false);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchRollList = async () => {
    let api = `${BASE_URL}/roles`;
    try {
      setLoading(true);
      await axios.get(api).then((resp) => {
        setRollList(resp.data.data);
        fetchMenuClick(resp?.data?.data[0]?._id);
        setLoading(false);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchMenuClick = async (id) => {
    let apiFectRollsingle = `${BASE_URL}/roles/${id}`;
    let userRoleSingle = `${BASE_URL}/roles/userget/`;

    let params = {
      permission: id,
    };
    try {
      await axios.get(apiFectRollsingle).then((resp) => {
        setRollsingle(resp.data.data);
      });
      await axios.get(userRoleSingle, { params }).then((resp) => {
        SetRollUsers(resp.data.data);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const FetchSelectUsers = async () => {
    let apiFectSelect = `${BASE_URL}/usermangmentroles`;
    let apiCC = `${BASE_URL}/Ccselect/`;

    try {
      await axios.get(apiFectSelect).then((resp) => {
        setSelectRoles(resp.data.data);
      });
      await axios.get(apiCC).then((resp) => {
        setReportManagers(resp.data.data);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleFinishAssign = async (values, form) => {
    let apiAssign = `${BASE_URL}/assign/${rollSingle?._id}`;

    setAssignButton(true);

    try {
      await axios.put(apiAssign, values).then((response) => {
        if (response) {
          notification.success({
            message: response?.data?.message,
            duration: 1,
          });
          setAssignButton(false);
          setUserDrawerOpen(false);
          fetchMenuClick(rollSingle?._id);
          form.setFieldsValue({
            employees: [{}],
          });
        } else {
          setUserDrawerOpen(false);

          notification.error("Something Went Wrong!");
        }
      });
    } catch (error) {
      setAssignButton(false),
        notification.error({
          message: error?.response?.data?.message?.split(":")[1],
          duration: 1,
        });
    }
  };
  const handleFinishAssignEdit = async (values) => {
    let apiAssignEdit = `${BASE_URL}/assignedit/${rollSingle?._id}`;

    setEditbutton(true);

    try {
      await axios.put(apiAssignEdit, values).then((response) => {
        if (response) {
          notification.success({
            message: response?.data?.message,
            duration: 1,
          });
          setEditbutton(false);

          setopenEdit(false);
          fetchMenuClick(rollSingle?._id);
        } else {
          setEditbutton(false);

          notification.error("Something Went Wrong!");
        }
      });
    } catch (error) {
      setEditbutton(false);

      notification.error({
        message: error?.response?.data?.message?.split(":")[1],
        duration: 1,
      });
    }
  };

  const handleFinishPermission = async (values) => {
    let apiAssign = `${BASE_URL}/roles/${rollSingle?._id}`;

    try {
      await axios.put(apiAssign, values).then((response) => {
        if (response) {
          notification.success({
            message: response?.data?.message,
            duration: 1,
          });

          fetchMenuClick(rollSingle?._id);
        } else {
          notification.error("Something Went Wrong!");
        }
      });
    } catch (error) {
      setAssignButton(false),
        notification.error({
          message: error?.response?.data?.message?.split(":")[1],
          duration: 1,
        });
    }
  };
  const handleAddRole = async (values) => {
    let apiAddRole = `${BASE_URL}/roles/`;

    try {
      await axios.post(apiAddRole, values).then((response) => {
        if (response) {
          notification.success({
            message: response?.data?.message,
            duration: 1,
          });

          fetchRollList();
        } else {
          notification.error("Something Went Wrong!");
        }
      });
    } catch (error) {
      setAssignButton(false),
        notification.error({
          message: error?.response?.data?.message?.split(":")[1],
          duration: 1,
        });
    }
  };

  const handelOpenEdit = async (id) => {
    let apiAssignGet = `${BASE_URL}/roles/assign/${id}`;

    try {
      let res = await axios.get(apiAssignGet);
      setAssignEdit(res.data.data);
      setopenEdit(!openEditDrawer);
    } catch (error) {
      notification.error({
        message: error?.response?.data?.message?.split(":")[1],
        duration: 1,
      });
    }
  };

  const handleCloseEdit = () => {
    setopenEdit(false);
  };


  const fetchroles = async()=>{
    let apifetchRoles =`${BASE_URL}/roles/companyselect`
   

    
  
    try {
        await axios.get(apifetchRoles).then((resp) => {
            setRoles(resp.data.data);
     

        });
       

       

    } catch (error) {
        console.log('error', error);
     setLoading(false)

    }
 }


const handleOpen=()=>{
setOpenDrawer(!openDrawer)
}

  useEffect(() => {
    fethPermission();
  }, []);

   
  const handleSend= async(values,form)=>{
    let send ={
       ...values,
       company_id:admin?.company_id||null
    }
   const api=`${BASE_URL}/register`

   try {
       await axios.post(api,send).then((resp) => {
           notification.success({
               message: "User Created",
               duration:1,
             });
             setOpenDrawer(false)
           form.resetFields();
           fetchUsers()
           
             
            
             
           // setLeave(resp.data.data);
       });
   } catch (error) {
       console.log('error', error);
   }
}

 
  return (
    <Context.Provider
      value={{
        ...props,

        loading,
        fetchRollList,
        fetchMenuClick,
        RollList,
        rollSingle,
        rollUsers,
        selectRoles,
        FetchSelectUsers,
        userDrawerOpen,
        setUserDrawerOpen,
        handleFinishAssign,
        fetchUsers,
        userList,
        handleFinishPermission,
        handleAddRole,
        permission,
        reportmanagers,
        handelOpenEdit,
        openEditDrawer,
        assignEdit,
        handleCloseEdit,
        setEditbutton,
        handleFinishAssignEdit,
        editbutton,
        handleOpen,
        fetchroles,
        roles,
        openDrawer,
        departmentDrawerOpen,
        setDepartmentDrawer,
        handleSend,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default UserManagementProvider;
