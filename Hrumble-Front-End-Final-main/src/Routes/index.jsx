import { useLayoutEffect, lazy, Suspense, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import {  themefuction } from "../Utils/ThemeCustomization";
import Loader from "../Utils/Loader";
import RoutesDynamic from "./Routes";
import Layouts from "../Layouts";
import Register from "../Components/CompanyRegister";
const Login = lazy(() => import("../Components/Login"));



const ProtectedRoute = lazy(() => import("../Utils/ProtectedRoutes"));
const NoPage = lazy(() => import("../Layouts/NoPage"));
const Employee = lazy(() => import("../Components/Dashboard"));
import LoadingContext from './../Providers/Loading/index';
import JobApplay from "../Components/UtlilsComponent/JobApplay";
import ApplayCandidateAdd from "../Components/UtlilsComponent/ApplayCandidateAdd";
const SignInSide = lazy(() => import( "../Components/sign-in-side/SignInSide"))
import SignUp from "../Components/sign-up/SignUp"


const MainRoutes = () => {
  
  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(500, 0);
    }, [location.pathname]);
    return children;
  };

  // const {colorprimary}= useContext(LoadingContext)
  // const componentMapping = {
  //   DashBoard,
  //   Crud,
  //   Staff,
  //   AccessSettings,
  //   Category,
  //   Product,
  // };
  let Custom =themefuction("#757b48")

  return (
    <>
      <ConfigProvider
        theme={{
          token: Custom,
        }}
      >
        <Router>
          <Wrapper>
            <Suspense
              fallback={
                <div className="suspense_wrap">
                  <Loader />
                </div>
              }
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Layouts />
                    </ProtectedRoute>
                  }
                >
                  {RoutesDynamic?.map((route, i) => {
                    return (
                      <Route
                        key={i}
                        path={route.path}
                        element={
                          <ProtectedRoute>{route.component}</ProtectedRoute>
                        }
                      />
                    );
                  })}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Employee />
                      </ProtectedRoute>
                    }
                  />
                  {/* <Route path="/employee/:id" Component={EditEmployee}/> */}

                  {/* {ttlist !== null &&
                      list?.map((item, index) => {
                        const DynamicComponent =
                          componentMapping[item?.component];
  
                        return (
                          <Route
                            key={index}
                            path={item.path}
                            element={
                              <ProtectedRoute>
                                {componentMapping[item?.component] && (
                                  <DynamicComponent
                                    title={item.name}
                                    options={item.options}
                                  />
                                )}
                              </ProtectedRoute>
                            }
                          />
                        );
                      })} */}
                  <Route
                    path="*"
                    element={
                      <ProtectedRoute>
                        <NoPage />
                      </ProtectedRoute>
                    }
                  />
                </Route>
               <Route path="/login" element={<SignInSide />} />
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/signup" element={<SignUp />} />
                {/* <Route path="/register" element={<Register />} /> */}
                <Route path="/jobapplay/:id" element={<JobApplay />} />
                <Route path="/applayCandidate/:id" element={<ApplayCandidateAdd/>} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </Suspense>
          </Wrapper>
        </Router>
      </ConfigProvider>
    </>
  );
};

export default MainRoutes;
