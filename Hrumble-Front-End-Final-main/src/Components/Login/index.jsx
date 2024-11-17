import { useContext } from 'react'
import { Button, Form, Input } from 'antd'
import LoginContext from '../../Providers/Login'
import { Link, useNavigate } from 'react-router-dom';
import HrIcon from "/images/hr-icon.svg"
import rainbow from '../Login/rainbow.gif';

function Login() {
const [form] = Form.useForm();
 const {login,Loading}=useContext(LoginContext)

 const onFinish =async values => {
     await login(values,form)
     form.resetFields();
    
  };

 

  return (
    <div>
      
      {/* <div className="login-page">
      <div className="login-box"> */}
       
        

<div className="page-wraper">			
			<div className="login-account">
				<div className="row h-100">
					<div className="col-lg-6">
						<div className="account-info-area" style={{backgroundImage: "url("+ rainbow +")"}}>
							<div className="login-content">
								{/* <p className="sub-title">Log in to your admin dashboard with your credentials</p> */}
								{/* <h1 className="login-company-text">Hrumbles</h1> */}
                <img src={HrIcon}/>
								{/* <h3 className="login-company-subTitle p_t_10">A Step towards Productivity</h3> */}
							</div>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="login-form p_t_70">
							<div className="login-head">
								<h3 className="login-welcome">Welcome Back</h3>
							</div>
							<h6 className="login-title"><span>Login</span></h6>
														
              <Form
        form={form}
          name=""
         
          initialValues={{ remember: true }}
          onFinish={onFinish}
          
        >
								<Form.Item
            name="email_id"
            rules={[
                { required: true, message: 'Please input your email!' },
                { type:'email', message: 'Please input  valid email!' }
            ]}
          >
            <Input
              placeholder="demo@gmail.com"
              className='form-input'
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              placeholder="Password"
              className=''
            />
          </Form.Item>
								<div className="form-row d_f j_c_s_b mt-4 mb-2">
									<div className="mb-4">
										<div className="form-check custom-checkbox mb-3">
											<input type="checkbox" className="form-check-input" id="customCheckBox1" required="" />
											<label className="form-check-label" htmlFor="customCheckBox1">Remember my preference</label>
										</div>
									</div>									
								</div>
								<div className="text-center mb-4">
                <Form.Item>
                  <Button htmlType="submit" className="login-form-button-zive"
                  loading={Loading}> Login </Button>
                </Form.Item>
								</div>
								<p className="text-center">Not registered ?  
									<Link to={"/page-register"} className="btn-link text-primary"> Register</Link>
								</p>								
                </Form>
						</div>
					</div>
				</div>
			</div>
		</div>    
          
        
        {/* <div className="illustration-wrapper">
          <img src={logo} alt="Login"/>
        </div> */}
      </div>
    // </div>

    // </div>
  )
}

export default Login


{/* <p className="form-title">Employee Central Portal</p>
          <p className='form-title-login'>Login</p>
          <Form.Item
            name="email_id"
            rules={[
                { required: true, message: 'Please input your email!' },
                { type:'email', message: 'Please input  valid email!' }
            ]}
          >
            <Input
              placeholder="Example@gmail.com"
              className='form-input'
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              placeholder="Password"
              className='form-input'
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className='login-form-checkbox'>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="login-form-button"
            loading={Loading}>
              Login
            </Button>
          </Form.Item> */}