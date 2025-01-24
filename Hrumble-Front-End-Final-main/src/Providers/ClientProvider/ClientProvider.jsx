import { useState } from "react";
import axios from "axios";
import Context from "./index";
import { notification } from "antd";
// import { BASE_URL } from "../../Utils/api";
import CookieUtil from "../../Utils/Cookies";

const BASE_URL = import.meta.env.VITE_BASE_URL; 

const ClientProvider = (props) => {
  const [clients, setClients] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [employeeselect, setEmployeeSelect] = useState("");
  const [employeejobdata, setEmployeeJobdata] = useState([]);
  const [clientbillable, setclientbillable] = useState("");
  const [clientSingle, setClientSingle] = useState([]);
  const [clientSelect, setClientSelect] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectSingle, setProjectSingle] = useState({});
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [projectemployees, setprojectEmployess] = useState([]);
  const [employees, setEmployess] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [SearchClient, setSearchClient] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerEdit, setOpenDrawerEdit] = useState(false);
  const [editDrawer, setEditDrawer] = useState(false);
  const [addbuttonClient, setAddButtonClient] = useState(false);
  const [editbuttonClient, setEditButtonClient] = useState(false);
  const [assignSingle, setAssignSingle] = useState({});
  const [assignLoading, setAssignloading] = useState(false);
  const [contactpersons, setContactPersons] = useState([]);
  const token = CookieUtil.get("admin_token");

  const fetchClient = async (refresh = false) => {
    let api = `${BASE_URL}/clients`;

    // if(refresh) setLoading(true)
    setLoading(true);
    try {
      await axios.get(api).then((resp) => {
        console.log("response: ", resp.data.data);
        setClients(resp.data.data);
        setLoading(false);
      });
    } catch (error) {
      console.log("error", error)
      setLoading(false);

    }
  };

  const handleClientTable = async () => {
   
  

    let projectapi = `${BASE_URL}/projects`;
    let clientSelectapi = `${BASE_URL}/clients/getselect`;
     setLoading(true);
    try {
    
      await axios.get(projectapi,).then((resp) => {
        setProjects(resp.data.data);
     setLoading(false);

      });
      await axios.get(clientSelectapi,).then((resp) => {
        setClientSelect(resp.data.data);
     setLoading(false);

      });
   
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleSelectChangeProject = async (status, record) => {
  
  const projectId = record.key; 
  
  let projectapi = `${BASE_URL}/projects/${projectId}`; 
  
  try {
    const resp = await axios.put(projectapi, { status });
    
    if (resp) {
      notification.success({
        message: `Status Changed Successfully`,
        duration: 1,
      });
      handleClientTable(resp?.data?.data?.client_id, false); 
    }
  } catch (error) {
    console.log("error", error);
  }
};


  const handleopenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleClickProjectTable = async (id, loading = false) => {
    let apiClientSingle = `${BASE_URL}/clients/${id}`;
    
    let projectemployeeapi = `${BASE_URL}/projectemployess`;
  
    let params = {
      client_id: id,
    };
    setLoading(true);
    try {
      await axios.get(apiClientSingle).then((resp) => {
        setProjectSingle(resp.data?.data);
      });
      await axios.get(projectemployeeapi, { params }).then((resp) => {
        setprojectEmployess(resp.data?.data);
        setLoading(false);
      });
    } catch (error) {
      console.log("error", error);
      setLoading(false);

    }
  };

  const handleAddClient = async (values, form, setActive) => {
    const apiCreate = `${BASE_URL}/clients`;
    setAddButtonClient(true);

    await axios
      .post(apiCreate, values, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Other headers if needed
        },
      })
      .then((response) => {
        if (response.status === 201) {
          notification.success({
            message: response?.data?.message,
            duration: 1,
          });
          setAddButtonClient(false);
          setOpenDrawer(false);
          fetchClient(false);
          form.resetFields();
          setActive("1");
        } else {
          setAddButtonClient(false);

          notification.error("Something Went Wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
        setAddButtonClient(false);
        notification.error("Something Went Wrong!");
      });
  };
  const handleEditClient = (values, form) => {
    const apiCreate = `${BASE_URL}/clients/${clientSingle?._id}`;
    axios
      .put(apiCreate, values, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Other headers if needed
        },
      })
      .then((response) => {
        if (response.status == 200) {
          notification.success({
            message: response?.data?.message,
            duration: 1,
          });
          setEditDrawer(false);

          setEditButtonClient(false);

          fetchClient();
          form.resetFields();
        } else {
          setEditButtonClient(false);
          notification.error({
            message: "Something Went Wrong!",
            duration: 1,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setEditButtonClient(false);
        notification.error("Something Went Wrong!");
      });
  };

  const handleEditProject = (newStatus, record) => {
    const apiUpdate = `${BASE_URL}/projects/${record._id}`; 

    axios
      .put(apiUpdate, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          notification.success({
            message: response?.data?.message || 'Status updated successfully!',
            duration: 1,
          });
          handleClientTable(); // Refresh the project list
        } else {
          notification.error({
            message: "Something Went Wrong!",
            duration: 1,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: "Something Went Wrong!",
          duration: 1,
        });
      });
  };

  const handleOpenEditDrawer = async (id) => {
    console.log("id", id);
    let apigetClient = `${BASE_URL}/clients/${id}`;
    setEditDrawer(!editDrawer);
    if (id) {
      try {
        await axios.get(apigetClient).then((resp) => {
          setClientSingle(resp.data?.data);
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleChangeSearchClient = (e) => {
    setSearchClient(e.target.value);
  };
  const handleAddProject = async (values, form) => {
    let addproject = `${BASE_URL}/projects/`;

    await axios
      .post(addproject, values, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Other headers if needed
        },
      })
      .then((response) => {
        if (response.status === 201) {
          notification.success({
            message: response?.data?.message,
            duration: 1,
          });
          setOpenDrawer(false);

          handleClientTable();
          form.resetFields();
        } 
      })
      .catch((err) => {
         console.log("Error",err)
      });
  };

  const employeeget = async () => {
    let api = `${BASE_URL}/employee/select`;

    // if(refresh) setLoading(true)
    setAssignloading(true);
    try {
      await axios.get(api).then((resp) => {
        setEmployee(resp.data.data);
        setAssignloading(false);

        // setLoading(false);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlechangeEmployee = async (e) => {
    let api = `${BASE_URL}/clients/jobget`;
    setEmployeeSelect(e);
    try {
      let params = {
        candidate_id: e,
      };
      await axios.get(api, { params }).then((resp) => {
        setEmployeeJobdata(resp.data.data);
        // setLoading(false);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlechangeJob = async (e, id) => {
    let api = `${BASE_URL}/clients/clientbillable/${e}`;
    let params = {
      job_id: e,
      _id: employeeselect || id,
    };
    try {
      await axios.get(api, { params }).then((resp) => {
        console.log("clientbillable", resp.data.data);
        setclientbillable(resp.data.data);
        // setLoading(false);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleopenDrawerEdit = () => {
    setOpenDrawerEdit(false);
  };

  // const handleAssignEmployees = async (projectId, employees, form) => {
  //   let assignEmployeesUrl = `${BASE_URL}/projects/${projectId}/assignemployees`;
  
  //   await axios
  //     .patch(assignEmployeesUrl, { employees }, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         // Other headers if needed
  //       },
  //     })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         notification.success({
  //           message: "Employees assigned successfully",
  //           duration: 1,
  //         });
  //         setOpenDrawer(false);
  //         handleClientTable();
  //         form.resetFields();
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error", err);
  //       notification.error({
  //         message: "Failed to assign employees",
  //         description: err.response?.data?.message || err.message,
  //       });
  //     });
  // };
  
  const handleAssignEmployees = async ({ projectId, employees }) => {
    let assignEmployeesUrl = `${BASE_URL}/projects/${projectId}/assignemployees`;
  
    try {
      const response = await axios.patch(assignEmployeesUrl, { employees }, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Other headers if needed
        },
      });
  
      if (response.status === 200) {
        notification.success({
          message: "Employees assigned successfully",
          duration: 1,
        });
        // Add any additional actions needed on success
        setOpenDrawer(false);
          handleClientTable();
          form.resetFields();
      }
    } catch (err) {
      console.log("Error", err);
      notification.error({
        message: "Failed to assign employees",
        description: err.response?.data?.message || err.message,
      });
    }
  };
  
  const handleEditAssignedEmployee = async ({ projectId, employeeId, status }) => {
    try {
      const editEmployeeUrl = `${BASE_URL}/projects/${projectId}/editAssignedEmployee/${employeeId}`;
      
      const response = await axios.patch(
        editEmployeeUrl, 
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        notification.success({
          message: "Assigned employee updated successfully",
          duration: 1,
        });
        setOpenDrawer(false);
        handleClientTable();  // Reload table data if necessary
      }
    } catch (err) {
      console.log("Error", err);
      notification.error({
        message: "Failed to update assigned employee",
        description: err.response?.data?.message || err.message,
      });
    }
  };
  
  
  
  const handleAssignEmployeeEdit = async (values, form, prams) => {
    let apiAssign = `${BASE_URL}/projectemployess/${assignSingle?._id}`;
    try {
      await axios.put(apiAssign, {values}).then((resp) => {
        console.log("clientbillable", resp.data.data);

        notification.success({
          message: resp?.data?.message,
          duration: 1,
        });
        form.resetFields();
        handleopenDrawerEdit();
        handleClickProjectTable(prams);

        // setLoading(false);
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleAssignDelete = async (id) => {
    let apiAssign = `${BASE_URL}/projectemployess/${id}`;
    try {
      await axios.delete(apiAssign).then((resp) => {
        console.log("clientbillable", resp.data.data);

        notification.success({
          message: resp?.data?.message,
          duration: 1,
        });
        handleClickProjectTable(projectSingle?._id,false)
    

        // setLoading(false);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleAssignEdit = async (id) => {
    let assignemployee = `${BASE_URL}/projectemployess/${id}`;
    try {
      await axios.get(assignemployee).then((resp) => {
        console.log("clientbillable", resp.data.data);
        setAssignSingle(resp.data.data);
        setOpenDrawerEdit(true);
        // setLoading(false);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchContactPersons = async () => {
    let contactpersons = `${BASE_URL}/To-select`;
    try {
      await axios.get(contactpersons).then((resp) => {
        console.log("clientbillable", resp.data.data);
        setContactPersons(resp.data.data);

        // setLoading(false);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  // useEffect(() => {
  //   fetchClient(true);
  // }, []);

  return (
    <Context.Provider
      value={{
        ...props,
        clients,
        ongoingProjects,
        projects,
        clientSingle,
        Loading,
        projectSingle,
        employees,
        projectemployees,
        openDrawer,
        editDrawer,
        SearchClient,
        handleChangeSearchClient,
        handleOpenEditDrawer,
        handleClickProjectTable,
        handleClientTable,
        handleSelectChangeProject,
        handleopenDrawer,
        handleAddClient,
        addbuttonClient,
        editbuttonClient,
        handleEditClient,
        fetchClient,
        fetchContactPersons,
        contactpersons,

        setEditButtonClient,
        handleAddProject,
        employeeget,
        employee,
        handlechangeEmployee,
        employeejobdata,
        clientbillable,
        handlechangeJob,
      
        setLoading,
        handleAssignEdit,
        assignSingle,
        openDrawerEdit,
        handleopenDrawerEdit,
        handleAssignEmployeeEdit,
        assignLoading,
        handleAssignDelete,
        clientSelect,
        handleEditProject,
        handleAssignEmployees,
        handleEditAssignedEmployee,
      
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ClientProvider;
