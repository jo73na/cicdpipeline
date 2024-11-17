import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components';
import { Button, Row, Col, Steps, message, Radio, Form, Input, Select,Upload,Modal } from "antd";
import { CheckCircleOutlined,PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import okey from '/images/ok.png';
 import okeyactive from '/images/okey.png';
import logo2 from '/images/MicrosoftTeams-image.png';

import { Country,  }  from 'country-state-city-slim';
import { BASE, BASE_URL } from './../../Utils/api';

import axios from 'axios';
import LoadingContext from '../../Providers/Loading';





 let colorprimary ="green"

const Register = () => {

  const Navigate=useNavigate()
  const [current, setCurrent] = useState(0);
  const [data, senddata] = useState({});
  const [form] = Form.useForm();
  
  let countryList=Country.getAllCountries()
  let countrydata  =[]


countryList?.map((item)=>{
countrydata.push({
   label:item?.name,
   value:`${item?.name},${item?.isoCode}`
})
})

  //New Register
  const [value, setValue] = useState();
  const [valuePlan, setValuePlan] = useState(1);
  const [valueType, setValueType] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passWord, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [inEmailAddress, setInEmailAddress] = useState("");
  const [inPhoneNumber, setInphoneNumber] = useState("");
  const [inPassWord, setInPassWord] = useState("");
  
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [logo, setLogo] = useState();


  //New Register Update
  const [resUpdateLoad, setResUpdateLoad] = useState(false);
  const [valuePlanEdit, setValuePlanEdit] = useState();
  const [valueEdit, setValueEdit] = useState("");
  const [valueTypeEdit, setValueTypeEdit] = useState("");
  const [companyNameEdit, setCompanyNameEdit] = useState("");
  const [gstNumberEdit, setGstNumberEdit] = useState("");
  const [emailAddressEdit, setEmailAddressEdit] = useState("");
  const [phoneNumberEdit, setPhoneNumberEdit] = useState("");
  const [passWordEdit, setPasswordEdit] = useState("");
  const [firstNameEdit, setFirstNameEdit] = useState("");
  const [lastNameEdit, setLastNameEdit] = useState("");
  const [inEmailAddressEdit, setInEmailAddressEdit] = useState("");
  const [inPhoneNumberEdit, setInphoneNumberEdit] = useState("");
  const [inPassWordEdit, setInPassWordEdit] = useState("");
  const [totalAmt, setTotalAmt] = useState(0);
  const [totalAmtTitle, setTotalAmtTitle] = useState([]);

  //Redux

  const user = JSON.parse(localStorage.getItem("persist:root"))?.register;
  const isAuthenticatedRegister = user && JSON.parse(user);
  const isToken = isAuthenticatedRegister?.isRegister === true && isAuthenticatedRegister?.registeraction[1];
  const paymentDetails = isAuthenticatedRegister?.isRegister === true && JSON.parse(isAuthenticatedRegister?.registeraction[1]);
  const userupdate = JSON.parse(localStorage.getItem("persist:root"))?.registerupdate;
  const isAuthenticatedRegisterUpdate = userupdate && JSON.parse(userupdate);
  const paymentDetailsUpdate = isAuthenticatedRegisterUpdate?.isRegisterUpdate === true && JSON.parse(isAuthenticatedRegisterUpdate?.registerupdateaction[1]);
  const industryselect =[{
    label:"Agency or Sales House",
    value:"Agency or Sales House",
   },
   {
    label:"Agriculture",
    value:"Agriculture",
   },
   {
    label:"Art and Design",
    value:"Art and Design",
   },
   {
    label:"Automotive",
    value:"Automotive",
   },
   {
    label:"Construction",
    value:"Construction",
   },
   {
    label:"Consulting",
    value:"Consulting",
   },
   {
    label:"Consumer Pakaged Goods ",
    value:"Consumer Pakaged Goods",
   },
   {
    label:"Education ",
    value:"Education",
   },
   {
    label:"Engineering",
    value:"Engineering",
   },
   {
    label:"Entertainment",
    value:"Entertainment",
   },
   {
    label:"Financial Services",
    value:"Financial Services",
   },
   {
    label:"Food Services",
    value:"Food Services",
   },
   {
    label:"Gaming",
    value:"Gaming",
   },
   {
    label:"Services",
    value:"Services",
   },
   {
    label:"Technology",
    value:"Technology",
   },
   {
    label:"Telecommunication",
    value:"Telecommunication",
   },
   {
    label:"Travel/Hospitality",
    value:"Travel/Hospitality",
   },
   {
    label:"Web design",
    value:"Web design",
   },
   {
    label:"Web Development",
    value:"Web Development",
   },
   {
    label:"Manufacturing",
    value:"Manufacturing",
   },
  ]
  //Radio Button
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onChangeEdit = (e) => {
    setValueEdit(e.target.value);
  };
  const onChangePlan = (e) => {
    setValuePlan(e.target.value);
  };
  const onChangePlanEdit = (e) => {
    setValuePlanEdit(e.target.value);
  };
  const onChangeType = (e) => {
    setValueType(e.target.value);
  };

  const onChangeTpyeEdit = (e) => {
    setValueTypeEdit(e.target.value);
  };








  useEffect(() => {
    setResUpdateLoad(true)
    if (isAuthenticatedRegister?.isRegister === true) {
      setCurrent(2)
    } else {
      setCurrent(0)
    }
    editCheckout();
    setResUpdateLoad(false)
  }, []);


  //Form Step1 & Step 2
  const onFinishStepOne = () => {
    let data = [];
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let n_date = date + ' ' + time;
    let dd = new Date();
    let validfrom = dd.toLocaleDateString();
    let currentTime;
    let validto;
    let planamt;
    const email = valueType === 1 ? emailAddress : inEmailAddress;
    const phone = valueType === 1 ? phoneNumber : inPhoneNumber;
    const password = valueType === 1 ? passWord : inPassWord;
    const planmode = valuePlan === 1 ? "monthly" : "annual";
    const type_of_registration = valueType === 1 ? "company" : "individual";


    if (valuePlan === 1 && value === 1) {
      planamt = 0;
      currentTime = new Date().getTime();
      validto = new Date(currentTime + 15 * 24 * 60 * 60 * 1000);
    } else if (valuePlan === 1 && value === 2) {
      planamt = 4999;
      currentTime = new Date().getTime();
      validto = new Date(currentTime + 30 * 24 * 60 * 60 * 1000);
    } else if (valuePlan === 1 && value === 3) {
      planamt = 6999;
      currentTime = new Date().getTime();
      validto = new Date(currentTime + 30 * 24 * 60 * 60 * 1000);
    } else if (valuePlan === 1 && value === 4) {
      planamt = 10999;
      currentTime = new Date().getTime();
      validto = new Date(currentTime + 30 * 24 * 60 * 60 * 1000);
    } else if (valuePlan === 1 && value === 5) {
      planamt = 12999;
      currentTime = new Date().getTime();
      validto = new Date(currentTime + 30 * 24 * 60 * 60 * 1000);
    } else if (valuePlan === 2 && value === 1) {
      planamt = 0;
      currentTime = new Date().getTime();
      validto = new Date(currentTime + 15 * 24 * 60 * 60 * 1000);
    } else if (valuePlan === 2 && value === 2) {
      planamt = 4999 * 12;
      currentTime = new Date().getTime();
      validto = new Date(currentTime + 365 * 24 * 60 * 60 * 1000);
    } else if (valuePlan === 2 && value === 3) {
      planamt = 6999 * 12;
      currentTime = new Date().getTime();
      validto = new Date(currentTime + 365 * 24 * 60 * 60 * 1000);
    } else if (valuePlan === 2 && value === 4) {
      planamt = 10999 * 12;
      currentTime = new Date().getTime();
      validto = new Date(currentTime + 365 * 24 * 60 * 60 * 1000);
    } else if (valuePlan === 2 && value === 5) {
      planamt = 12999 * 12;
      currentTime = new Date().getTime();
      validto = new Date(currentTime + 365 * 24 * 60 * 60 * 1000);
    }
    if (valueType == 1) {
      data = {
        "companyname": companyName,
        "gstin": gstNumber,
        "emailid": email,
        "contactno": phone,
        "password": password,
        "createddate": n_date,
        "type_of_registration": type_of_registration,
        "selectedplan": value,
        "selectedplanamount": Number(planamt),
        "planmode": planmode,
        "validfrom": validfrom,
        "validto": validto ? validto.toLocaleDateString() : "",
      }

    } else if (valueType == 2) {
      data = {
        "firstname": firstName,
        "lastname": lastName,
        "gstin": gstNumber,
        "emailid": email,
        "contactno": phone,
        "password": password,
        "createddate": n_date,
        "type_of_registration": type_of_registration,
        "selectedplan": value,
        "selectedplanamount": Number(planamt),
        "planmode": planmode,
        "validfrom": validfrom,
        "validto": validto ? validto.toLocaleDateString() : "",
      }
    }

    if ((valueType === 1 ? companyName == "" : firstName == "") || (valueType === 1 ? gstNumber == "" : firstName == "") || (valueType === 1 ? emailAddress == "" : inEmailAddress == "") || (valueType === 1 ? phoneNumber == "" : inPhoneNumber == "") || (valueType === 1 ? passWord == "" : inPassWord == "")) {
      message.error("Please fill all required field")
      return;
    } else {
      api.stepOne(dispatch, data).then((res) => {
        let resdata = res.data;
        if (resdata.success === true) {
          setCurrent(2);
          editCheckout();
          window.location.reload(true);
        } else {
          message.error(resdata.msg ? resdata.msg : "Something went wrong!. please try again later");
        }
      }).catch((err) => {
        message.error(err.data.msg ? err.data.msg : "Please try again later!");
      })
    }
  }


  //From Step3

  const onFinishStepTwo = () => {
    setResUpdateLoad(true)
    let dataEdit = [];
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let n_date = date + ' ' + time;
    let dd = new Date();
    let validfrom = dd.toLocaleDateString();
    let currentTime;
    let validto;
    let planamt;
    const email = valueTypeEdit === 1 ? emailAddressEdit : inEmailAddressEdit;
    const phone = valueTypeEdit === 1 ? phoneNumberEdit : inPhoneNumberEdit;
    const password = valueTypeEdit === 1 ? passWordEdit : inPassWordEdit;
    const planmode = valuePlanEdit === 1 ? "monthly" : "annual";
    const type_of_registration = valueTypeEdit === 1 ? "company" : "individual";



    if (valuePlanEdit === 1 && valueEdit === 1) {
      planamt = 0;
      currentTime = new Date().getTime();
      validto = new Date(currentTime + 15 * 24 * 60 * 60 * 1000);
    } else if (valuePlanEdit === 1 && valueEdit === 2) {
      planamt = 4999;
      currentTime = new Date().getTime();
      validto = new Date(currentTime + 30 * 24 * 60 * 60 * 1000);
    } else if (valuePlanEdit === 1 && valueEdit === 3) {
      planamt = 6999;
      currentTime = new Date().getTime();
      validto = new Date(currentTime + 30 * 24 * 60 * 60 * 1000);
    } else if (valuePlanEdit === 1 && valueEdit === 4) {
      planamt = 10999;
      currentTime = new Date().getTime();
      validto = new Date(currentTime + 30 * 24 * 60 * 60 * 1000);
    } else if (valuePlanEdit === 1 && valueEdit === 5) {
      planamt = 12999;
      currentTime = new Date().getTime();
      validto = new Date(currentTime + 30 * 24 * 60 * 60 * 1000);
    } else if (valuePlanEdit === 2 && valueEdit === 1) {
      planamt = 0;
      currentTime = new Date().getTime();
      validto = new Date(currentTime + 15 * 24 * 60 * 60 * 1000);
    } else if (valuePlanEdit === 2 && valueEdit === 2) {
      planamt = 4999 * 12;
      currentTime = new Date().getTime();
      validto = new Date(currentTime + 365 * 24 * 60 * 60 * 1000);
    } else if (valuePlanEdit === 2 && valueEdit === 3) {
      planamt = 6999 * 12;
      currentTime = new Date().getTime();
      validto = new Date(currentTime + 365 * 24 * 60 * 60 * 1000);
    } else if (valuePlanEdit === 2 && valueEdit === 4) {
      planamt = 10999 * 12;
      currentTime = new Date().getTime();
      validto = new Date(currentTime + 365 * 24 * 60 * 60 * 1000);
    } else if (valuePlanEdit === 2 && valueEdit === 5) {
      planamt = 12999 * 12;
      currentTime = new Date().getTime();
      validto = new Date(currentTime + 365 * 24 * 60 * 60 * 1000);
    }
    setTotalAmt(planamt ? planamt : 0)

    setTotalAmtTitle([valueEdit ? (valueEdit === 1 ? "Free" : valueEdit === 2 ? "Basic" : valueEdit === 3 ? "Premium" : valueEdit === 4 ? "Standard" : valueEdit === 5 ? "Enterprise" : "") : "", planmode ? (planmode == "monthly" ? " / Month" : planmode == "annual" ? " / Year" : "") : ""])

    if (valueTypeEdit == 1) {
      dataEdit = {
        "companyname": companyNameEdit,
        "gstin": gstNumberEdit,
        "emailid": email,
        "contactno": phone,
        "password": password,
        "createddate": n_date,
        "type_of_registration": type_of_registration,
        "selectedplan": valueEdit,
        "selectedplanamount": Number(planamt),
        "planmode": planmode,
        "validfrom": validfrom,
        "validto": validto ? validto.toLocaleDateString() : "",
        "companyid": isAuthenticatedRegister?.registeraction[0] ? isAuthenticatedRegister?.registeraction[0]?.companyid : "",
      }

    } else if (valueTypeEdit == 2) {
      dataEdit = {
        "firstname": firstNameEdit,
        "lastname": lastNameEdit,
        "emailid": email,
        "contactno": phone,
        "password": password,
        "createddate": n_date,
        "type_of_registration": type_of_registration,
        "selectedplan": valueEdit,
        "selectedplanamount": Number(planamt),
        "planmode": planmode,
        "validfrom": validfrom,
        "validto": validto ? validto.toLocaleDateString() : "",
        "companyid": isAuthenticatedRegister?.registeraction[0] ? isAuthenticatedRegister?.registeraction[0]?.companyid : "",
      }
    }

    // message.success("step2")
    if ((valueTypeEdit === 1 ? (companyNameEdit == undefined || companyNameEdit == "") : (firstNameEdit == undefined || firstNameEdit == "")) || (valueTypeEdit === 1 ? (gstNumberEdit == undefined || gstNumberEdit == "") : (firstNameEdit == undefined || firstNameEdit == "")) || (valueTypeEdit === 1 ? (emailAddressEdit == undefined || emailAddressEdit == "") : (inEmailAddressEdit == undefined || inEmailAddressEdit == "")) || (valueTypeEdit === 1 ? (phoneNumberEdit == undefined || phoneNumberEdit == "") : (inPhoneNumberEdit == undefined || inPhoneNumberEdit == "")) || (passWordEdit == "" || passWordEdit == undefined && inPassWordEdit == "" || inPassWordEdit == undefined)) {
      message.error("Please fill all required field")
      setResUpdateLoad(false)
      return;
    } else {

      api.stepTwo(dispatch, dataEdit).then((res) => {

        let resdata = res.data;
        if (resdata.success === true) {
          message.success("Updated Successfully")
        } else {
          message.error("Updated Failed")
        }
        setResUpdateLoad(false)
      }).catch((err) => {

      })
    }

  }



  const editCheckout = () => {

    if (isAuthenticatedRegisterUpdate?.isRegisterUpdate === true) {
      setValueEdit(paymentDetailsUpdate ? paymentDetailsUpdate.selectedplan : "")
      setCompanyNameEdit(paymentDetailsUpdate ? paymentDetailsUpdate.companyname : "")
      setPhoneNumberEdit(paymentDetailsUpdate ? paymentDetailsUpdate.contactno : "")
      setInphoneNumberEdit(paymentDetailsUpdate ? paymentDetailsUpdate.contactno : "")
      setEmailAddressEdit(paymentDetailsUpdate ? paymentDetailsUpdate.emailid : "")
      setInEmailAddressEdit(paymentDetailsUpdate ? paymentDetailsUpdate.emailid : "")
      setPasswordEdit(paymentDetailsUpdate ? paymentDetailsUpdate.password : "")
      setInPassWordEdit(paymentDetailsUpdate ? paymentDetailsUpdate.password : "")
      setGstNumberEdit(paymentDetailsUpdate ? paymentDetailsUpdate.gstin : "")
      setValueTypeEdit(paymentDetailsUpdate ? (paymentDetailsUpdate.type_of_registration == "individual" ? 2 : 1) : "")
      setFirstNameEdit(paymentDetailsUpdate ? paymentDetailsUpdate.firstname : "")
      setLastNameEdit(paymentDetailsUpdate ? paymentDetailsUpdate.lastname : "")
      setValuePlanEdit(paymentDetailsUpdate.planmode == "monthly" ? 1 : 2)
      setTotalAmt(paymentDetailsUpdate ? paymentDetailsUpdate.selectedplanamount : "")
      setTotalAmtTitle([paymentDetailsUpdate ? (paymentDetailsUpdate.selectedplan === 1 ? "Free" : paymentDetailsUpdate.selectedplan === 2 ? "Basic" : paymentDetailsUpdate.selectedplan === 3 ? "Premium" : paymentDetailsUpdate.selectedplan === 4 ? "Standard" : paymentDetailsUpdate.selectedplan === 5 ? "Enterprise" : "") : "", paymentDetailsUpdate ? (paymentDetailsUpdate.planmode == "monthly" ? " / Month" : paymentDetailsUpdate.planmode == "annual" ? " / Year" : "") : ""])
      form.setFieldsValue({
        planmodeedit: paymentDetailsUpdate ? (paymentDetailsUpdate.planmode == "monthly" ? 1 : 2) : "",
        plantype: paymentDetailsUpdate ? (paymentDetailsUpdate.type_of_registration == "company" ? 1 : 2) : "",
        selectedplanedit: paymentDetailsUpdate ? paymentDetailsUpdate.selectedplan : "",
        companyname: paymentDetailsUpdate ? paymentDetailsUpdate.companyname : "",
        gstin: paymentDetailsUpdate ? paymentDetailsUpdate.gstin : "",
        emailid: paymentDetailsUpdate ? paymentDetailsUpdate.emailid : "",
        contactno: paymentDetailsUpdate ? paymentDetailsUpdate.contactno : "",
        password: paymentDetailsUpdate ? paymentDetailsUpdate.password : "",
        firstname: paymentDetailsUpdate ? paymentDetailsUpdate.firstname : "",  //con
        lastname: paymentDetailsUpdate ? paymentDetailsUpdate.lastname : "",  //con
        inemailid: paymentDetailsUpdate ? paymentDetailsUpdate.emailid : "",  //con
        incontactno: paymentDetailsUpdate ? paymentDetailsUpdate.contactno : "", //con
        inpassword: paymentDetailsUpdate ? paymentDetailsUpdate.password : "", //con
      })
    } else {
      setValueEdit(paymentDetails ? paymentDetails.selectedplan : "")
      setCompanyNameEdit(paymentDetails ? paymentDetails.companyname : "")
      setPhoneNumberEdit(paymentDetails ? paymentDetails.contactno : "")
      setInphoneNumberEdit(paymentDetails ? paymentDetails.contactno : "")
      setEmailAddressEdit(paymentDetails ? paymentDetails.emailid : "")
      setInEmailAddressEdit(paymentDetails ? paymentDetails.emailid : "")
      setPasswordEdit(paymentDetails ? paymentDetails.password : "")
      setInPassWordEdit(paymentDetails ? paymentDetails.password : "")
      setGstNumberEdit(paymentDetails ? paymentDetails.gstin : "")
      setValueTypeEdit(paymentDetails ? (paymentDetails.type_of_registration == "individual" ? 2 : 1) : "")
      setFirstNameEdit(paymentDetails ? paymentDetails.firstname : "")
      setLastNameEdit(paymentDetails ? paymentDetails.lastname : "")
      setValuePlanEdit(paymentDetails.planmode == "monthly" ? 1 : 2)
      setTotalAmt(paymentDetails ? paymentDetails.selectedplanamount : "")
      setTotalAmtTitle([paymentDetails ? (paymentDetails.selectedplan === 1 ? "Free" : paymentDetails.selectedplan === 2 ? "Basic" : paymentDetails.selectedplan === 3 ? "Premium" : paymentDetails.selectedplan === 4 ? "Standard" : paymentDetails.selectedplan === 5 ? "Enterprise" : "") : "", paymentDetails ? (paymentDetails.planmode == "monthly" ? " / Month" : paymentDetails.planmode == "annual" ? " / Year" : "") : ""])
      form.setFieldsValue({
        planmodeedit: paymentDetails ? (paymentDetails.planmode == "monthly" ? 1 : 2) : "",
        plantype: paymentDetails ? (paymentDetails.type_of_registration == "company" ? 1 : 2) : "",
        selectedplanedit: paymentDetails ? paymentDetails.selectedplan : "",
        companyname: paymentDetails ? paymentDetails.companyname : "",
        gstin: paymentDetails ? paymentDetails.gstin : "",
        emailid: paymentDetails ? paymentDetails.emailid : "",
        contactno: paymentDetails ? paymentDetails.contactno : "",
        password: paymentDetails ? paymentDetails.password : "",
        firstname: paymentDetails ? paymentDetails.firstname : "",  //con
        lastname: paymentDetails ? paymentDetails.lastname : "",  //con
        inemailid: paymentDetails ? paymentDetails.emailid : "",  //con
        incontactno: paymentDetails ? paymentDetails.contactno : "", //con
        inpassword: paymentDetails ? paymentDetails.password : "", //con
      })
    }

  }


  //From Step4

  const paynow = () => {
    message.success("paynow")
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let n_date = date + ' ' + time;
    const paynow = {
      "standardtoken": isAuthenticatedRegister?.registeraction[0] ? isAuthenticatedRegister?.registeraction[0]?.standardtoken : "",
      "companyid": isAuthenticatedRegister?.registeraction[0] ? isAuthenticatedRegister?.registeraction[0]?.companyid : "",
      "createddate": n_date,
      "selectedplan": paymentDetails ? paymentDetails?.selectedplan : "",
      "selectedplanamount": paymentDetails ? paymentDetails?.selectedplanamount : "",
      "planmode": paymentDetails ? paymentDetails?.planmode : "",
      "validfrom": paymentDetails ? paymentDetails?.validfrom : "",
      "validto": paymentDetails ? paymentDetails?.validto : "",
      "paynowstatus": 1,
    }
    if (isAuthenticatedRegister?.registeraction[0]?.standardtoken != "" && isAuthenticatedRegister?.registeraction[0]?.companyid != "" && isToken?.selectedplan != "" && isToken?.selectedplanamount != "" && isToken?.planmode != "" && isToken?.validfrom != "" && isToken?.validto != "") {
       return;
    } else {
      message.error("Please try again later")
    }




  }

  //Cancel Payment

  const cancelPayment = () => {
    setResUpdateLoad(true)
    // api.cancelPayment(dispatch);
    // api.cancelPayment1(dispatch);
    setTimeout(function () {
      window.location.reload(true);
    }, 500)
    setResUpdateLoad(false)
  }

  const getBase64 = (file) =>
   new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => resolve(reader.result);
     reader.onerror = (error) => reject(error);
   });

    

     

      const [fileList, setFileList] = useState([
       
      ]);

      const handleCancel = () => setPreviewOpen(false);
      const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
      };
      const handleChange = (info) =>{
         setLogo(info.file.originFileObj)
      setFileList(info.fileList)
      };
      const uploadButton = (
        <button
          style={{
            border: 0,
            background: 'none',
          }}
          type="button"
        >
          <PlusOutlined/>
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </button>
      );
  const steps = [
    {
      title: 'Plan',
      content:
        <>
          {
            // isAuthenticatedRegister?.isRegister === true && current === 2 ? "" :
              <>
                <div className='plan_option_ym'>
                  <Form.Item
                    name="planmode"
                  >
                    <Radio.Group onChange={onChangePlan} value={valuePlan} className="plan_option_ym_radio">
                      <Button className={`${valuePlan === 1 ? "active" : ""}`} checked={true}><Radio className='plan_option_ym_radio_style' value={1}></Radio>Monthly</Button>
                      <Button className={`${valuePlan === 2 ? "active" : ""}`}><Radio className='plan_option_ym_radio_style' value={2}></Radio>Annual</Button>
                    </Radio.Group>
                  </Form.Item>
                </div>

                <div className='your_plan'>
                  <Form.Item
                    name="selectedplan"
                    rules={[
                      {
                        required: true,
                        message: 'Please choose your plan',
                      },
                    ]}
                  >
                    <Radio.Group onChange={onChange} value={value} className="step_content_radio">
                      <div className='plan_box_align'>

                        <div className={`plan_box free ${value === 1 ? "active" : ""}`}>
                          <Radio value={1} className="radio_style"></Radio>
                          <h4>Free 15 days</h4>
                          <h5>INR 0  <span>/ Only for 15 days</span></h5>
                          <ul>
                            <li>10GB of Cloud Storage</li>
                            <li>100 GB Bandwidth</li>
                            <li>-</li>
                            <li>-</li>
                            <li>Free SSL Certificate</li>
                            {/* <li>Payment Gateway Integration*</li> */}
                            <li>Core Features</li>
                            <li>Invoicing facility</li>
                            {/* <li>Frontend Template - 1 Nos</li> */}
                            {/* <li>Online Support 10 AM to 5 PM</li>
                            <li>-</li>
                            <li>Free Online Training Session - 2</li> */}
                          </ul>
                          <Button type='button'>{value === 1 ? <><CheckCircleOutlined /> Choosed</> : "Choose Plan"}</Button>
                        </div>


                        <div className={`plan_box basic ${value === 2 ? "active" : ""}`}>
                          <Radio value={2} className="radio_style"></Radio>
                          <h4>Basic</h4>
                          <h5>INR {valuePlan === 1 ?  <span>{(Number(4999 * 1))}Month</span> : <span> {(Number(4999 * 12))} Year</span> }</h5>
                          <ul>
                            <li>10GB of Cloud Storage</li>
                            <li>100 GB Bandwidth</li>
                            <li>-</li>
                            <li>-</li>
                            <li>Free SSL Certificate</li>
                            {/* <li>Payment Gateway Integration*</li> */}
                            <li>Core Features</li>
                            <li>Invoicing facility</li>
                            {/* <li>Frontend Template - 1 Nos</li> */}
                            {/* <li>Online Support 10 AM to 5 PM</li> */}
                            {/* <li>-</li> */}
                            {/* <li>Free Online Training Session - 2</li> */}
                          </ul>
                          <Button type='primary' className='btn'>{value === 2 ? <><CheckCircleOutlined /> Choosed</> : "Choose Plan"}</Button>
                        </div>


                        <div className={`plan_box premium ${value === 3 ? "active" : ""}`}>
                          <Radio value={3} className="radio_style"></Radio>
                          <h4>Premium</h4>
                          <h5>INR {valuePlan === 1 ? `${(Number(6999 * 1))}` : `${(Number(6999 * 12))}`} <span>/ Month</span></h5>
                          <ul>
                            <li>20GB of Cloud Storage</li>
                            <li>200 GB Bandwidth</li>
                            <li>-</li>
                            <li>-</li>
                            <li>Free SSL Certificate</li>
                            {/* <li>Payment Gateway Integration*</li> */}
                            <li>Core Features</li>
                            <li>Invoicing facility</li>
                            {/* <li>Frontend Template - 3 Nos</li>
                            <li>Online Support 10 AM to 5 PM</li>
                            <li>-</li>
                            <li>Free Online Training Session - 3</li> */}
                          </ul>
                          <Button type='button'>{value === 3 ? <><CheckCircleOutlined /> Choosed</> : "Choose Plan"}</Button>
                        </div>


                        <div className={`plan_box standard ${value === 4 ? "active" : ""}`}>
                          <Radio value={4} className="radio_style"></Radio>
                          <h4>Standard</h4>
                          <h5>INR {valuePlan === 1 ? `${(Number(10999 * 1))}` : `${(Number(10999 * 12))}`} <span>/ Month</span></h5>
                          <ul>
                            <li>40GB of Cloud Storage</li>
                            <li>400 GB Bandwidth</li>
                            <li>1 .com / .in 1 year Free</li>
                            <li>1 dedicated IP</li>
                            <li>Free SSL Certificate</li>
                            {/* <li>Payment Gateway Integration*</li> */}
                            <li>Core Features</li>
                            <li>Invoicing facility</li>
                            {/* <li>Frontend Template - 5 Nos</li>
                            <li>Online Support 10 AM to 5 PM</li>
                            <li>Priority Support</li>
                            <li>Free Online Training Session - 4</li> */}
                          </ul>
                          <Button type='button'>{value === 4 ? <><CheckCircleOutlined /> Choosed</> : "Choose Plan"}</Button>
                        </div>


                        <div className={`plan_box enterprise ${value === 5 ? "active" : ""}`}>
                          <Radio value={5} className="radio_style"></Radio>
                          <h4>Enterprise</h4>
                          <h5>INR {valuePlan === 1 ? `${(Number(12999 * 1))}` : `${(Number(12999 * 12))}`} <span>/ Month</span></h5>
                          <ul>
                            <li>50GB of Cloud Storage</li>
                            <li>1000 GB Bandwidth</li>
                            <li>1 .com / .in 1 year Free</li>
                            <li>1 dedicated IP</li>
                            <li>Free SSL Certificate</li>
                            {/* <li>Payment Gateway Integration*</li> */}
                            <li>Core Features</li>
                            <li>Invoicing facility</li>
                            {/* <li>Frontend Template - 10 Nos</li>
                            <li>Online Support 10 AM to 5 PM</li>
                            <li>Priority Support</li>
                            <li>Free Online Training Session - 5</li> */}
                          </ul>
                          <Button type='primary' cla>{value === 5 ? <><CheckCircleOutlined /> Choosed</> : "Choose Plan"}</Button>
                        </div>
                      </div>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </>}
        </>,
    },
    {
      title: 'Register',
      content:
        <>
          {
             current === 2 ? "" :
              <Row gutter={20}>
                <Col className="gutter-row" xxl={{ span: 24 }} xl={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                  <Form.Item name="type_of_registration">
                    <div className='plan_option_ym'>
                      <Radio.Group onChange={onChangeType} value={valueType} className="plan_option_ym_radio">
                        <Button className={`${valueType === 1 ? "active" : ""}`}><Radio className='plan_option_ym_radio_style' value={1}></Radio>Company</Button>
                        {/* <Button className={`${valueType === 2 ? "active" : ""}`}><Radio className='plan_option_ym_radio_style' value={2}></Radio>Individual</Button> */}
                      </Radio.Group>

                    </div>

                  </Form.Item>
                </Col>

                {
                  valueType === 1 ?
                    <>

                      <Col className="gutter-row" xxl={{ span: 8 }} xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                        <Form.Item
                          label="Company Name"
                          name="companyname"
                          onChange={(e) => setCompanyName(e.target.value)}
                          rules={[
                            {
                              required: true,
                              message: 'Company name is required!',
                            },
                            {
                              max: 50,
                              message: "Company name must be less than 50 character",
                            },
                            {
                              min: 3,
                              message: "Company name must be minimum 3 character",
                            },
                          ]}
                        >
                          <Input name="companyname" />
                        </Form.Item>
                      </Col>
                      <Col className="gutter-row" xxl={{ span: 8 }} xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                        <Form.Item
                          label="GST Number"
                          name="gstin"
                          onChange={(e) => setGstNumber(e.target.value)}
                          rules={[
                            {
                              required: true,
                              message: 'GST number is required!',
                            }
                          ]}
                        >
                          <Input name="gstin" />
                        </Form.Item>
                      </Col>
                      <Col className="gutter-row" xxl={{ span: 8 }} xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                      <Form.Item label="Industry" name="industry">
                      <Select
               placeholder="Select Industry"
               options={industryselect}
             showSearch
             optionFilterProp="children"
filterOption={(input, option) =>
(option?.label.toLowerCase()?? "").includes(input.toLowerCase())
}
filterSort={(optionA, optionB) =>
(optionA?.label ?? "")
.toLowerCase()
.localeCompare((optionB?.label ?? "").toLowerCase())
}
           
              />
          </Form.Item>
                      </Col>
                      <Col className="gutter-row" xxl={{ span: 8 }} xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                      <Form.Item label="Oraganization Location" name="location">
              <Select placeholder='Address' 
               options={countrydata} />
          </Form.Item>
                      </Col>
                      <Col className="gutter-row" xxl={{ span: 8 }} xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                      <Form.Item
     className="m_t_2"
        label="Organization Logo"
       name="logo"
      
     >
    
     <Upload
        action={`${BASE}test`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
   
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
     </Form.Item>
                      </Col>

                    </>
                    :
                    <>
                      <Col className="gutter-row" xxl={{ span: 8 }} xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                        <Form.Item
                          label="First Name"
                          onChange={(e) => setFirstName(e.target.value)}
                          name="firstname"
                          rules={[
                            {
                              required: true,
                              message: 'First name is required!',
                            },
                            {
                              max: 50,
                              message: "First name should be less than 50 character",
                            },
                            {
                              min: 3,
                              message: "First name should be minimum 3 character",
                            },
                          ]}
                        >
                          <Input name="firstname" />
                        </Form.Item>
                      </Col>
                      <Col className="gutter-row" xxl={{ span: 8 }} xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                        <Form.Item
                          label="Last Name"
                          onChange={(e) => setLastName(e.target.value)}
                          name="lastname"
                        >
                          <Input name="lastname" />
                        </Form.Item>
                      </Col>
                      

                      <Col className="gutter-row" xxl={{ span: 8 }} xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                      <Form.Item label="Industry" name>
              <Input placeholder='Enter Industry'  />
          </Form.Item>
                      </Col>
                      <Col className="gutter-row" xxl={{ span: 8 }} xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                        <Form.Item
                          label="Phone Number"
                          onChange={(e) => setInphoneNumber(e.target.value)}
                          name="incontactno"
                          rules={[
                            {
                              required: true,
                              message: 'Phone number is required!',
                            },
                            {
                              min: 10,
                              message: "Phone number must be in 10 digits.",
                            }
                          ]}
                        >
                          <Input name="incontactno" />
                        </Form.Item>
                      </Col>
                      <Col className="gutter-row" xxl={{ span: 8 }} xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                        <Form.Item
                          label="Password"
                          onChange={(e) => setInPassWord(e.target.value)}
                          name="inpassword"
                          rules={[
                            {
                              required: true,
                              message: 'Password is required!',
                            },
                            {
                              min: 6,
                              message: "Password must be in 6 character.",
                            }
                          ]}
                        >
                          <Input.Password name="inpassword" />
                        </Form.Item>
                      </Col>

                    </>
                }


              </Row>
          }
        </>,
    },
    {
      title: 'Checkout',
      content:
        <>
          <div className='checkout_section'>
            <h4>Checkout</h4>
            <div className='checkout_section_align'>
              <div className='checkout_section_left'>
                <h4>Billing details</h4>
                <Row gutter={[16, 16]}>
                  <Col className="gutter-row" xxl={{ span: 24 }} xl={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                    <Form.Item
                      name="selectedplanedit"
                      label="Select Plan"
                      rules={[
                        {
                          required: true,
                          message: 'Select plan is required!',
                        },

                      ]}
                    >
                      <Radio.Group onChange={onChangeEdit} value={valueEdit} className="plan_option_ym_radio type_selectplan">
                        <Button className={`${valueEdit === 1 ? "active" : ""}`}>
                          <Radio className='plan_option_ym_radio_styleselectplan' value={1}></Radio>
                          <h4>Free Trail</h4>
                          <h5>INR 0</h5>
                          <h6>(For 15days only)</h6>
                        </Button>
                        <Button className={`${valueEdit === 2 ? "active" : ""}`}>
                          <Radio className='plan_option_ym_radio_styleselectplan' value={2}></Radio>
                          <h4>Basic</h4>
                          <h5>INR 4999</h5>
                          <h6>(Per month)</h6>
                        </Button>
                        <Button className={`${valueEdit === 3 ? "active" : ""}`}>
                          <Radio className='plan_option_ym_radio_styleselectplan' value={3}></Radio>
                          <h4>Premium</h4>
                          <h5>INR 6999</h5>
                          <h6>(Per month)</h6>
                        </Button>
                        <Button className={`${valueEdit === 4 ? "active" : ""}`}>
                          <Radio className='plan_option_ym_radio_styleselectplan' value={4}></Radio>
                          <h4>Standard</h4>
                          <h5>INR 10999</h5>
                          <h6>(Per month)</h6>
                        </Button>
                        <Button className={`${valueEdit === 5 ? "active" : ""}`}>
                          <Radio className='plan_option_ym_radio_styleselectplan' value={5}></Radio>
                          <h4>Enterprise</h4>
                          <h5>INR 12999</h5>
                          <h6>(Per month)</h6>
                        </Button>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xxl={{ span: 12 }} xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                    <Form.Item
                      name="planmodeedit"
                      label="Plan Mode"
                      rules={[
                        {
                          required: true,
                          message: 'Plan mode is required!',
                        },

                      ]}
                    >
                      <Radio.Group onChange={onChangePlanEdit} value={valuePlanEdit} className="plan_option_ym_radio_edit type_planmode">
                        <Button className={`${valuePlanEdit === 1 ? "active" : ""}`} checked={true}><Radio className='plan_option_ym_radio_style_edit' value={1}>Monthly</Radio></Button>
                        <Button className={`${valuePlanEdit === 2 ? "active" : ""}`}><Radio className='plan_option_ym_radio_style_edit' value={2}>Annual</Radio></Button>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xxl={{ span: 12 }} xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                    <Form.Item
                      name="plantype"
                      label="Customer Type"
                      rules={[
                        {
                          required: true,
                          message: 'Customer type is required!',
                        },

                      ]}
                    >
                      <Radio.Group onChange={onChangeTpyeEdit} value={valueTypeEdit} className="plan_option_ym_radio_edit type_planmode">
                        <Button className={`${valueTypeEdit === 1 ? "active" : ""}`} checked={true}><Radio className='plan_option_ym_radio_style_edit' value={1}>Company</Radio></Button>
                        <Button className={`${valueTypeEdit === 2 ? "active" : ""}`}><Radio className='plan_option_ym_radio_style_edit' value={2}>Individual</Radio></Button>
                      </Radio.Group>
                    </Form.Item>
                  </Col>


                  {
                    valueTypeEdit === 1 ?
                      <>

                        <Col className="gutter-row" xxl={{ span: 12 }} xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                          <Form.Item
                            label="Company Name"
                            name="companyname"
                            onChange={(e) => setCompanyNameEdit(e.target.value)}
                            rules={[
                              {
                                required: true,
                                message: 'Company name is required!',
                              },
                              {
                                max: 50,
                                message: "Company name must be less than 50 character",
                              },
                              {
                                min: 3,
                                message: "Company name must be minimum 3 character",
                              },
                            ]}
                          >
                            <Input name="companyname" />
                          </Form.Item>
                        </Col>
                        <Col className="gutter-row" xxl={{ span: 12 }} xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                          <Form.Item
                            label="GST Number"
                            name="gstin"
                            onChange={(e) => setGstNumberEdit(e.target.value)}
                            rules={[
                              {
                                required: true,
                                message: 'GST number is required!',
                              }
                            ]}
                          >
                            <Input name="gstin" />
                          </Form.Item>
                        </Col>
                        <Col className="gutter-row" xxl={{ span: 12 }} xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                          <Form.Item
                            label="Industry"
                            onChange={(e) => setEmailAddressEdit(e.target.value)}
                            name="industry"
                           
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col className="gutter-row" xxl={{ span: 12 }} xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                        <Form.Item label="Oraganization Location" name="location">
              <Select placeholder='Address' 
               options={countrydata} />
                </Form.Item>
                        </Col>
                        {/* <Col className="gutter-row" xxl={{ span: 24 }} xl={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                          <Form.Item
                            label="Password"
                            onChange={(e) => setPasswordEdit(e.target.value)}
                            name="password"
                            rules={[
                              {
                                required: true,
                                message: 'Password is required!',
                              },
                              {
                                min: 6,
                                message: "Password must be in 6 character.",
                              }
                            ]}
                          >
                            <Input.Password name="password" />
                          </Form.Item>
                        </Col> */}

                      </>
                      :
                      <>
                        <Col className="gutter-row" xxl={{ span: 12 }} xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                          <Form.Item
                            label="First Name"
                            onChange={(e) => setFirstNameEdit(e.target.value)}
                            name="firstname"
                            rules={[
                              {
                                required: true,
                                message: 'First name is required!',
                              },
                              {
                                max: 50,
                                message: "First name should be less than 50 character",
                              },
                              {
                                min: 3,
                                message: "First name should be minimum 3 character",
                              },
                            ]}
                          >
                            <Input name="firstname" />
                          </Form.Item>
                        </Col>
                        <Col className="gutter-row" xxl={{ span: 12 }} xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                          <Form.Item
                            label="Last Name"
                            onChange={(e) => setLastNameEdit(e.target.value)}
                            name="lastname"
                          >
                            <Input name="lastname" />
                          </Form.Item>
                        </Col>

                        <Col className="gutter-row" xxl={{ span: 12 }} xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                          <Form.Item
                            label="Email Address"
                            onChange={(e) => setInEmailAddressEdit(e.target.value)}
                            name="inemailid"
                            rules={[
                              {
                                type: 'email',
                                message: 'Email address is not valid!',
                              },
                              {
                                required: true,
                                message: 'Email address is required!',
                              }
                            ]}
                          >
                            <Input name="inemailid" />
                          </Form.Item>
                        </Col>
                        <Col className="gutter-row" xxl={{ span: 12 }} xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                          <Form.Item
                            label="Phone Number"
                            onChange={(e) => setInphoneNumberEdit(e.target.value)}
                            name="incontactno"
                            rules={[
                              {
                                required: true,
                                message: 'Phone number is required!',
                              },
                              {
                                min: 10,
                                message: "Phone number must be in 10 digits.",
                              }
                            ]}
                          >
                            <Input name="incontactno" />
                          </Form.Item>
                        </Col>
                        <Col className="gutter-row" xxl={{ span: 24 }} xl={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                          <Form.Item
                            label="Password"
                            onChange={(e) => setInPassWordEdit(e.target.value)}
                            name="inpassword"
                            rules={[
                              {
                                required: true,
                                message: 'Password is required!',
                              },
                              {
                                min: 6,
                                message: "Password must be in 6 character.",
                              }
                            ]}
                          >
                            <Input.Password name="inpassword" />
                          </Form.Item>
                        </Col>

                      </>
                  }
                  <Col className="gutter-row" xxl={{ span: 12 }} xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                    <Button type="primary" htmlType="submit" onClick={onFinishStepTwo} className="btn_success" loading={resUpdateLoad}>
                      Update Cart
                    </Button>
                  </Col>

                  <Col className="gutter-row" xxl={{ span: 12 }} xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                    <Button type="primary" htmlType="submit" onClick={cancelPayment} className="btn_danger">
                      Cancel Payment
                    </Button>
                  </Col>
                </Row>
              </div>
              <div className='checkout_section_right'>
                <h4>Your order</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Plan</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{totalAmtTitle}</td>
                      <td>{totalAmt}</td>
                    </tr>

                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Total</th>
                      <th>INR {totalAmt} /-</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </>,
    },
    {
      title: "Payment Process",
      content: "paymeny success"
    },
    {
      title: 'Terms & Conditions',
      content: 'accept',
    },
  ];



  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));


 
   

 console.log("current",current)

   const onFinish=(values)=>{
   
      if(current == 0 || current == 2 || current == 3  ){
         console.log("values",values)
        senddata({...data,...values})
    setCurrent(current + 1);


      }
      if(current ==1){
    setCurrent(current + 1);
    console.log("values",values)
    senddata({...data,...values})
    
       
    setCurrent(current + 1);

      }
      if(current == 4){
        console.log("current == 4",data)
    var formdata= new FormData()
     formdata.append("organization",data?.companyname)
     formdata.append("industry",data?.industry)
     formdata.append("location",data?.location)
     formdata.append("logo",logo)

        axios.post(`${BASE_URL}/company`,formdata).then((res)=>{
            if(res){
        Navigate("/login")


            }
        })
        .catch((err)=>{
            console.log("err",err)
        })
      }

   }

  return (
    //  <div>Hiiii</div>
    <React.Fragment>
      <RegisterSection>
        <div className="login_header">
          <div className="login_header_align">
            <div className="login_header_left">
              <img src={logo2} alt="Technoladders" />
            </div>
            <div className="login_header_right">
              <span>I have an account? </span><Link to="/login"><Button type='primray' className='btn btn_cancel'>Sign in</Button></Link>
            </div>
          </div>
        </div>
        <div className="login_section">
          <Form
            name="country_edit"
            layout="vertical"
             onFinish={onFinish}
            form={form}
          >
            <div className='step_align'>

              <Steps current={current} items={items} />
            </div>

            <div className='step_content'>{steps[current].content}</div>
            <div
        style={{
          margin: "10px",
          display: "flex",
          gap: "10px",
          justifyContent: "flex-end",
        }}
      >
        {current >0  &&<Button style={{width:"100px"}}className="btn_cancel" onClick={prev}>Back</Button>}
        {
            current  >= 4 ?
            <Button style={{width:"100px"}} type="primary" className="btn" htmlType='submit'>
              Save
          </Button> :
             <Button style={{width:"100px"}} type="primary" className="btn" htmlType='submit'>
             Next
           </Button> 

        }
        {/* <Button style={{width:"100px"}} type="primary" className="btn" onClick={next}>
          Next
        </Button>  */}
      </div>
            {/* <div className='steps_btn'>
              {current > 0 && (

                 current === 2 ?
                  <Button
                    style={{
                      margin: '0 8px',
                    }}
                    className="step_previous"
                    disabled
                  >
                    Previous
                  </Button>

                  :
                  <Button
                    style={{
                      margin: '0 8px',
                    }}
                    className="step_previous"
                    onClick={() => prev()}
                  >
                    Previous
                  </Button>
              )}
              {current < steps.length - 1 && (
                valuePlan === undefined || value === undefined ?

                  isAuthenticatedRegister?.isRegister === true ?

                    <Button type="primary" onClick={() => paynow()}>
                      PayNow
                    </Button>

                    :

                    <Button type="primary" htmlType="submit" onClick={onFinishStepOne}>
                      Next
                    </Button>


                  :
                  current === 1 ?

                 

                      <Button type="primary" htmlType="submit" onClick={onFinishStepOne}>
                        Next
                      </Button>

                    :
                    <Button type="primary" onClick={() => next()}>
                      Next
                    </Button>


              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                  Done
                </Button>
              )}

            </div> */}
          </Form>
        </div>
      </RegisterSection>
    </React.Fragment>
  )
}

export default Register;



const RegisterSection = styled.section`

/* Works for Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Works for Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.checkout_section {
  width: 100%;
  display: inline-block;
}
.checkout_section h4 {
  margin: 0 0 40px;
  font-size: 22px;
  font-family: "q_bold";
  text-align: left;
}

.checkout_section_align {
  display: inline-block;
  width: 100%;
  position: relative;
}
.checkout_section_align h4 {
  margin: 0 0 20px;
  font-size: 20px;
}
.checkout_section_align .checkout_section_left {
  width: 66%;
  display: block;
  position: relative;
  float: left;
  border: 1px solid #f0f0f0;
  padding: 30px 24px;
  border-radius: 5px;
}
.checkout_section_align .checkout_section_left .ant-input {
  padding: 6px 11px;
}
.checkout_section_align .checkout_section_left input#country_edit_password {
  padding: 0;
}
.checkout_section_align .checkout_section_right {
  width: 30%;
  display: block;
  position: relative;
  float: right;
  border: 1px solid #f0f0f0;
  padding: 30px 24px;
  border-radius: 5px;
}

.checkout_section_align .checkout_section_right table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 4px;
}
.checkout_section_align .checkout_section_right table, .checkout_section_align .checkout_section_right tr, .checkout_section_align .checkout_section_right table td, .checkout_section_align .checkout_section_right table th {
  border: 0px solid #e9e9e9;
}
.checkout_section_align .checkout_section_right table th {
  padding: 0 !important;
  text-align: left;
}
.checkout_section_align .checkout_section_right table thead {
  border-bottom: 1px solid #e9e9e9;
  padding: 0 0 15px !important;
  
}
.checkout_section_align .checkout_section_right table tfoot {
  border-top: 1px solid #e9e9e9;
  padding: 0 0 15px !important;
  
}
.checkout_section_align .checkout_section_right table thead th {
  padding: 0 0 8px !important;
  font-size: 15px;
  font-family: "q_bold";
  
}
.checkout_section_align .checkout_section_right table tfoot th {
  padding: 8px 0 0 !important;
  font-size: 15px;
  font-family: "q_bold";
  
}
.checkout_section_align .checkout_section_right table thead th:nth-child(1) {
  text-align: left;
}
.checkout_section_align .checkout_section_right table thead th:nth-child(2) {
  text-align: right;
}
.checkout_section_align .checkout_section_right table tfoot th:nth-child(1) {
  text-align: left;
}
.checkout_section_align .checkout_section_right table tfoot th:nth-child(2) {
  text-align: right;
}
.checkout_section_align .checkout_section_right table tbody {
  min-height: 150px;
}
.checkout_section_align .checkout_section_right table tbody td {
  padding: 15px 0 !important;
}
.checkout_section_align .checkout_section_right table tbody td:nth-child(1) {
  text-align: left;
}
.checkout_section_align .checkout_section_right table tbody td:nth-child(2) {
  text-align: right;
}
.checkout_section_align .checkout_section_left .ant-form-item-label label {
  font-size: 15px;
  color: #000;
  font-family: "q_bold";
}
.checkout_section_align .checkout_section_left .plan_option_ym_radio_edit.type_planmode {
display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
}
.checkout_section_align .checkout_section_left .plan_option_ym_radio_edit.type_planmode button, .checkout_section_align .checkout_section_left .plan_option_ym_radio_edit.type_planmode button:hover {
  background: transparent !important;
    color: #000;
    padding: 0;
    margin: 0;
    border: 0;
    box-shadow: inherit;
    width: fit-content;
    position: relative;
}
.checkout_section_align .checkout_section_left .plan_option_ym_radio_edit.type_planmode button span, .checkout_section_align .checkout_section_left .plan_option_ym_radio_edit.type_planmode button:hover span {
  color: #888;
  font-family: "q_regular";
  font-size: 13px;
}
.ant-radio-wrapper .ant-radio-checked .ant-radio-inner {
  border-color: var(${colorprimary});
  background-color: var(${colorprimary});
}
.checkout_section_align .checkout_section_left .plan_option_ym_radio.type_selectplan {
  display: grid;
  grid-template-columns: repeat(5,1fr);
  gap: 15px;
}
.checkout_section_align .checkout_section_left .plan_option_ym_radio.type_selectplan button {
  background: transparent !important;
  position: relative;
  padding: 22px 7px;
}
.checkout_section_align .checkout_section_left .plan_option_ym_radio.type_selectplan button::before {
  content: "";
  background: url(${okeyactive});
  background-repeat: no-repeat;
    height: 15px;
    width: 15px;
    border-radius: 100%;
    position: absolute;
    background-size: contain;
    background-color: #fff;
    top: 7px;
    right: 7px;
    opacity: 0;
}
.checkout_section_align .checkout_section_left .plan_option_ym_radio.type_selectplan button.active::before {
  opacity: 1;
}

.checkout_section_align .checkout_section_left .plan_option_ym_radio.type_selectplan button label {
  position: absolute;
  height: 100%;
  width: 100%;
  top:0;
  left: 0;
  opacity: 0;
}
.daoeOl .checkout_section_align .checkout_section_left .plan_option_ym_radio_edit.type_planmode button span {
  font-family: "q_light" !important;
  font-size: 13px;
}

.checkout_section_align .checkout_section_left .plan_option_ym_radio.type_selectplan button h4 {
  margin: 0;
  font-size: 12px;
  font-family: "q_regular";
  text-align: center;
  margin: 0 0 5px;
}
.checkout_section_align .checkout_section_left .plan_option_ym_radio.type_selectplan button h5 {
  margin: 0;
  font-size: 16px;
  color: #000;
  text-align: center;
  margin: 0 0 0px;
}
.checkout_section_align .checkout_section_left .plan_option_ym_radio.type_selectplan button h6 {
  margin: 0;
  font-size: 10px;
  font-family: "q_light";
  font-style: italic;
}

.checkout_section_align .checkout_section_left .plan_option_ym_radio.type_selectplan button.active {
  border: 1px solid var(${colorprimary});
}
.checkout_section_align .checkout_section_left .plan_option_ym_radio.type_selectplan button.active h4, .checkout_section_align .checkout_section_left .plan_option_ym_radio.type_selectplan button.active h5, .checkout_section_align .checkout_section_left .plan_option_ym_radio.type_selectplan button.active h6 {
  color: var(${colorprimary});
}

.checkout_section_align .checkout_section_left .plan_option_ym_radio.type_selectplan button:hover h5 {
  color: #5fa5ff;
}
.checkout_section_align .checkout_section_left .plan_option_ym_radio.type_selectplan button.active:hover h5 {
  color: var(${colorprimary});
}







.plan_option_ym .ant-form-item-explain-error {
  text-align: center;
}
.your_plan .ant-form-item-explain-error {
  margin: 6px 0 0 0;
  text-align: center;
}

.ant-steps .ant-steps-item-finish>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-title::after {
  background-color: var(${colorprimary});
}
.ant-steps .ant-steps-item-finish .ant-steps-item-icon {
    background-color: rgb(244 145 9 / 10%);
    border-color: rgb(243 145 10 / 10%);
}
.step_previous {
  background: #fff;
  color: var(${colorprimary});
  border: 1px solid var(${colorprimary});
}
.step_previous span {
  color: var(${colorprimary});
}
.step_previous:hover span {
  color: #fff;
}
.step_previous:hover {
  border: 1px solid #000;
}

.plan_option_ym {
  width:100%;
  display: inline-block;
  position: relative;
  margin: 0 0 45px;
}
.plan_option_ym .plan_option_ym_radio  {
  width: fit-content;
  margin: auto;
  display: flex;
  border:1px solid #e1e1e1;
  border-radius: 30px;
  overflow: hidden;
}
.plan_option_ym .plan_option_ym_radio .button_style_plan {
  padding: 5px 20px;
  position: relative;
}
.plan_option_ym .plan_option_ym_radio button .plan_option_ym_radio_style {
  position: absolute;
  height: 100%;
  width: 100%;
  top:0;
  left:0;
  opacity: 0;
  z-index: 10;
}
.plan_option_ym .plan_option_ym_radio button {
  width:fit-content;
  margin: 0;
  position: relative;
  background: #fff;
  border: 0;
  outline: none;
  color: #000;
  font-size: 13px;
  width: 100px;
  border-radius: 0;
}
.plan_option_ym .plan_option_ym_radio button:hover {
  background: #fff !important;
}
.plan_option_ym .plan_option_ym_radio button span {
  color: #000;
}

.plan_option_ym .plan_option_ym_radio button.active {
  background: #2e2e2e !important;
  color: #fff;
}
.plan_option_ym .plan_option_ym_radio button.active span {
  color: #fff;
}

  .plan_box_align {
    display: grid;
    grid-template-columns: repeat(5,1fr);
    gap: 14px;
  }
  .plan_box_align .plan_box {
    width: 100%;
    display: inline-block;
    background: #fff;
    box-shadow: 0 0 12px rgb(0 0 0 / 10%);
    border-radius: 3px;
    border: 0;
    border-top: 4px solid #000;
    padding: 20px 15px;
    position:relative;
    transition: all 0.4s ease-in-out;
  }

  .plan_box_align .plan_box h4 {
      text-align: center;
      margin: 0;
      font-size: 16px;
      font-family: "q_semibold";
      /* text-transform: uppercase; */
  }
  .plan_box_align .plan_box h5 {
    margin: 12px 0;
    text-align: center;
    color: #000;
    font-size: 16px;
    font-family: "q_bold";
  }
  .plan_box_align .plan_box h5 span {
    font-size: 11px;
    color: #888;
    font-family: "q_light";
}
  .plan_box_align .plan_box ul {
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 13px;
    color: #000;
    font-family: "q_regular";
  }
  .plan_box_align .plan_box ul li {
    position: relative;
    line-height: 1.5;
    padding: 0 0 0 17px;
    margin: 0 0 3px;
    font-size: 11px;
    color: #888;
}
  .plan_box_align .plan_box ul li::before {
    content: "";
    background: url(${okey});
    background-repeat: no-repeat;
    position: absolute;
    top: 5px;
    left: 0;
    background-size: contain;
    height: 10px;
    width: 10px;
}
  .plan_box_align .plan_box button {
    background: ${colorprimary};
    font-size: 14ox;
    padding: 5px 10px;
    margin: 20px 0 0 0;
  }

  .plan_box_align .plan_box.free {
    border-top: 5px solid #5b5b5b;
}
  .plan_box_align .plan_box.basic {
    border-top: 5px solid #f8c552;
}
  .plan_box_align .plan_box.premium {
    border-top: 5px solid #f05b5f;
}
  .plan_box_align .plan_box.standard {
    border-top: 5px solid #546cf0;
}
  .plan_box_align .plan_box.enterprise {
    border-top: 5px solid #198754;
  }
  .plan_box_align .plan_box.free h5 {
    color: #5b5b5b;
  }
  .plan_box_align .plan_box.basic h5 {
    color: #f8c552;
  }
  .plan_box_align .plan_box.premium h5 {
    color: #f05b5f;
  }
  .plan_box_align .plan_box.standard h5 {
    color: #546cf0;
  }
  .plan_box_align .plan_box.enterprise h5 {
    color: #198754;
  }

  .plan_box_align .plan_box.active {
    transform: translateY(-15px);
    transition: all 0.4s ease-in-out;
}

.plan_box_align .plan_box.active button {
  background: var(${colorprimary});
  color: #000;
}

.radio_style {
  opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    display: inline-block;
    z-index: 100;
}

.steps_btn {
  margin: 40px 0 0 0;
  width: 100%;
  display: inline-block;
  text-align: end;
}
.steps_btn button {
  width:auto;
  padding: 4px 20px;
}

.step_content {
  width: 100%;
  display: inline-block;
  min-height: 350px;
}
.step_content_radio {
  width: 100%;
  display: inline-block;
}






  

  

  .login_section {
    width: 1180px;
    background: #fff;
    box-shadow: 0 24px 64px #26214a1a;
    border-radius: 12px;
    padding: 25px 30px;
    position: relative;
    z-index: 10;
    margin: 130px 0 50px 100px;
}

h1 {
  font-family: 'q_bold';
    margin: 0 0 20px;
    text-align: center;
    font-size: 25px;
}
  label {
    color: #292d34 !important;
    font-family: 'q_medium';
  }
  .ant-form-item-label {
    padding: 0 0 7px !important;
  }
  button span svg {
    color: black !important;
  }



  span.ant-input-affix-wrapper {
    padding: 6px 11px !important;
  }
  span.ant-input-affix-wrapper:hover, span.ant-input-affix-wrapper:focus {
    border-color: var(${colorprimary}) !important;
  }

  .ant-form-item {
    margin-bottom: 13px !important;
  }

  button {

    margin: 9px 0 0 0;
    width: 100%;
    padding: 7px 15px;
    height: auto;
   
   
 }


.login_with_otp {
  width: 100%;
  display: inline-block;
  margin: 17px 0 0 0;
}
.login_with_otp span {
  color: #292d34;
  font-family: "q_bold";
  text-align: center;
  width: 100%;
  display: inline-block;
  font-style: italic;
  font-size: 14px;

}
.login_with_otp p {
  font-size: 12px;
  font-family: "q_medium";
  
  color: var(${colorprimary}) !important;
  text-align: center;
  margin: 10px 0 0 0;
  cursor: pointer;
}
.login_with_otp p:hover {
  color: #000 !important;
}import { axios } from 'axios';


.login_header {
  position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 11;
    padding: 15px 22px 10px 22px;
    background: #fafbfc;
}
.login_header_align {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.login_header_left {
  width:fit-content;
  img {
    height: 45px;
  }
}
.login_header_right {
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  span {
    display: inline-block;
    font-family: 'q_medium';
    font-size: 14px;
  }
  button {
    width: fit-content;
    margin: 0;
    box-shadow: 0 10px 25px rgb(245 146 9 / 30%);
    border-color: var(${colorprimary});
    padding: 5px 13px;
}


}

.plan_option_ym .plan_option_ym_radio button {
  padding: 6px 20px;
}


.step_align {
  margin: 0 0 50px;
  padding: 0 50px;
}



@media screen and (max-width:580px) {

  ::before {
    background: #f9fafb;
  }
  .login_header_right span {
    display: none;
  }

  .login_header {
    padding: 13px 15px 0 15px;
  }
  .login_header_left img {
    height: 40px;
}
.login_section {
    width: 90%;
    padding: 30px 25px;
    margin: auto;
    display: flex;
    flex-direction: column;
}



}



  
`;