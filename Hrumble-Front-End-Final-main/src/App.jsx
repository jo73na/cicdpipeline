
import { lazy } from "react";


import './assets/Css/Style.css'
import './assets/Css/MasterCss.css'
import './assets/Css/Responsive.css'
import MainRoutes from './Routes'
import FAQProvider from './Providers/Faq/FaqProvider'
import JobProvider from './Providers/JobProvider/JobProvider'
import LoginProvider from './Providers/Login/LoginProvider'
import ViewJobProvider from './Providers/ViewJob/ViewJobProvider'
import ClientProvider from './Providers/ClientProvider/ClientProvider'
import CandidateProvider from './Providers/Candidate/CandidateProvider'
import DashboardProvider from './Providers/DashboardProvider/DashboardProvider'
import EmployeeProvider from './Providers/EmployeeProvider/EmployeeProvider'
import LeaveProvider from './Providers/Leaves/LeaveProvider'
import FileManagerProvider from './Providers/FileManagerProvider/FileProvider'

import '@fortawesome/fontawesome-free/css/all.css';


import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-schedule/styles/material.css";
import '../node_modules/@syncfusion/ej2-notifications/styles/material.css';
import "../node_modules/@syncfusion/ej2-react-grids/styles/material.css";

 import '../node_modules/@syncfusion/ej2-richtexteditor/styles/material.css';
import "../node_modules/@syncfusion/ej2-icons/styles/material.css";
import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
import '../node_modules/@syncfusion/ej2-notifications/styles/material.css';  
import "../node_modules/@syncfusion/ej2-react-kanban/styles/material.css";


// import { registerLicense } from '@syncfusion/ej2-base';
import PBFProvider from './Providers/PBFReports/PBFProvider'
import InvoiceExpenceProvider from './Providers/InvoiceExpence/InvoiceExpenceProvider'

import UserManagementProvider from './Providers/UserMangement/UserMangementProvider'
// import LoadingProvider from './Providers/Loading/LoadingProvider'
import SettingProvider from './Providers/Settings/SettingProvider'
import CompanyProvider from "./Providers/Company/CompanyProvider";
import GoalProvider from "./Providers/Goal/GoalProvider";
import SalesandMargettingProvider from './Providers/SalesandMargetting/SalesandMargettingProvider';
import SpaceProvider from "./Providers/Space/SpaceProvider";
// registerLicense('Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWX5feHRWQ2lcWUZ1V0c=');



function App() {
  


  

  return (
    <>
  
    
    {/* <LoadingProvider> */}
     <SpaceProvider>
     <SalesandMargettingProvider>
       <GoalProvider>
      <SettingProvider>
      <FileManagerProvider>
      <UserManagementProvider>
 <InvoiceExpenceProvider>
   <PBFProvider>
   <LeaveProvider>
  <LoginProvider>
      <EmployeeProvider>
      <DashboardProvider>
      <ClientProvider>
      <JobProvider>
      <ViewJobProvider>
      <CandidateProvider>
      
      <CompanyProvider>
         
      <FAQProvider>
           <MainRoutes/>
     </FAQProvider>
      </CompanyProvider>
      
  
 
      </CandidateProvider>
      </ViewJobProvider>
      </JobProvider> 
    
    </ClientProvider>
      </DashboardProvider>
      </EmployeeProvider>
    
   
    </LoginProvider>
    </LeaveProvider>   
   </PBFProvider>
   </InvoiceExpenceProvider>
 </UserManagementProvider>
      </FileManagerProvider>

      </SettingProvider>
      </GoalProvider>
       </SalesandMargettingProvider>
     </SpaceProvider>
    {/* </LoadingProvider> */}


    
    
    
     
   
      
 
     
    </>
  )
}

export default App
