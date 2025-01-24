const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { employee, workexperience, roles, admin } = require("../../utils/schemaMaster");
const crud_service = require("../../utils/crud_service");
const validateId = require('../../utils/validateId');
const { authAdmin } = require('../../middlewares/authMiddlewares');
const multer = require('multer');
const upload = require('../../utils/upload');
const crud = new crud_service();
const bcrypt = require("bcrypt");
const { generateToken } = require("../../config/jwtToken");
const { success, successToken } = require("../../utils/response");
const sendMail = require('../../utils/sendMail');
const { register } = require('../../utils/email_template');
const mongoose = require('mongoose');


const methods = { authAdmin };

// Function to generate the employee data
const generateCreateBody = async (dataBody, id) => {
  console.log("data", dataBody);

  // Generate salt for password hashing
  const salt = bcrypt.genSaltSync(10);

  // Prepare employee data with the provided _id
  let createBody = {
    _id: id, // Assign the generated _id
    ...dataBody,
    passwordHash: await bcrypt.hash(dataBody?.passwordHash, salt),
    user_role: "Employee",
    user_status: "onBoarding",
  };

  return createBody;
};

// Create Employee Route
methods.add = asyncHandler(async (req, res) => {
  // Generate a unique _id for both employee and admin collections
  const id = new mongoose.Types.ObjectId();

  // Generate employee data
  let generatedData = await generateCreateBody(req.body, id);

  // Prepare admin data with the same _id
  let admin_data = {
    _id: id, // Reuse the same _id
    name: `${generatedData["firstname"]} ${generatedData["lastname"]}`,
    email_id: generatedData["email"],
    role: generatedData["department"],
    password: generatedData["passwordHash"],
  };

  console.log("Generated Data:", generatedData);

  try {
    // Check if email already exists in the admin collection
    const existingAdmin = await crud.getDocument(admin, { email_id: generatedData.email });

    if (existingAdmin.length > 0) {
      throw new Error("Email is already registered in the admin system.");
    }

    // Insert employee data
    const create = await crud.insertOne(employee, generatedData);

    // Insert admin data
    const create_admin_login = await crud.insertOne(admin, admin_data);

    // If admin creation succeeds, assign role-based permissions
    if (create_admin_login) {
      let role = await crud.getDocument(
        roles,
        { name: create_admin_login?.role },
        { _id: 1 },
        {}
      );

      await crud.updateById(
        admin,
        create_admin_login?._id,
        { permission: role[0]?._id },
        { new: true }
      );
    }

    // Send success response if employee creation succeeds
    if (create) {
      successToken(
        res,
        201,
        true,
        "Register Successfully",
        create,
        generateToken(create?._id)
      );
    } else {
      throw new Error("Register Failed!");
    }
  } catch (err) {
    console.log("Error:", err);
    res.status(400).json({ error: err.message });
  }
});


// Define the route
router.post("/", methods.add);




//Get All Employees
methods.getAll=asyncHandler(async (req, res) => {
  try {
    success(res, 200, true, "Get Successfully", await crud.getDocument(employee, {...req.query},{},{}));
  } catch (err) {
    throw new Error(err);
  }
})
router.get('/',methods.getAll );

//Employee Table List
methods.select=asyncHandler(async (req, res) => {

  let table_projection = {
    'user_id':1,'firstname':1,
    'lastname':1,'mobile':1,
    "form_completion":1,"billing_type":1,
    'designation':1,'job_type':1,
    'user_status':1,'salary_type':1,
    'yearly_ctc':1, 'department':1,
    'employee_id':1,
  }

  console.log("req.body:",req?.body)

  let filterBody = req?.body?.direct || req?.body
  console.log("Body:",filterBody)

  try {
    success(res, 200, true, "Get Successfully", await crud.getDocument(employee, {"user_role": {$ne: 1},...filterBody},table_projection,{}));
  } catch (err) {
    console.log("err:",err)
    throw new Error(err);
  }
})
router.post("/table",methods.select)

//Select Component Employee List
methods.select=asyncHandler(async (req, res) => {
  try {
    success(res, 200, true, "Get Successfully", await crud.getDocument(employee, {},{user_id:1,firstname:1,lastname:1},{}));
  } catch (err) {
    console.log("err:",err)
    throw new Error(err);
  }
})
router.get("/select",methods.select)
methods.invoiceselect=asyncHandler(async (req, res) => {
  // await employee.collection.createIndex({ firstname: 1, lastname: 1 });

  try {
    await employee.collection.createIndex({  lastname: 1 });
    let result = await employee.find()
    .select({
      label: { $concat: ['$firstname', ' ', '$lastname'] },
      value: '$_id',
    })
   
    .lean().exec(); 
   
    success(res, 200, true, "Get Successfully", result);
  } catch (err) {
    console.log("err:",err)
    throw new Error(err);
  }
})
router.get("/invoiceselect",methods.invoiceselect)

const renderLabel = (labelNum,labelType) => {

  let returnLabel = ""

  if(labelType==="billing")
    returnLabel = labelNum?"Billable":"Non Billable"

  if(labelType==="status"){
    switch(labelNum){
      case 0:
        returnLabel = "Terminated"
        break
      case 1:
        returnLabel = "Working"
        break
      case 2:
        returnLabel = "Releived"
        break
      case 3:
        returnLabel = "Onboarding"
        break
    }
  }

  return returnLabel
}

//Select Component Employee List
methods.graph=asyncHandler(async (req, res) => {
  try {

    let aggregateStatus = await employee.aggregate([
      { $group: {
        _id: "$user_status",
        count: { $sum: 1 }
      }}
    ]);
   

    let aggregateBilling = await employee.aggregate([
      { $group: {
        _id: "$salary_type",
        count: { $sum: 1 }
      }}
    ]);
    console.log("aggregrate",aggregateBilling)

    let totalEmployee = 0;
    let Billable=0;
    let Non_Billable=0
    let Working=0
    let Releived=0
    let Terminated=0
    let onBoarding=0

    let BillData=aggregateBilling?.forEach((label)=>{
      if(label._id =="Billable"){
        Billable+=label?.count
        totalEmployee += label?.count

        
      }
      else{
        Non_Billable+=label?.count
        totalEmployee += label?.count
      }
     
    })

    aggregateStatus?.forEach((label)=>{
      if(label?._id =="onBoarding") {onBoarding+=label.count}
      if(label?._id =="working"){
         Working+=label.count
      }
      if(label?._id =="Releived"){
        Releived+=label.count
     }
     
    })

    let chartData = {
      "status_chart":{
        Working,
        Releived,
        Terminated,
        onBoarding
      },
      "billing_chart":{
        Billable,
        Non_Billable
      },
      "totalEmployee":totalEmployee,
    }
    console.log("chart",chartData)

    success(res, 200, true, "Get Successfully", chartData);
  } catch (err) {
    console.log("err:",err)
    throw new Error(err);
  }
})
router.get("/graph",methods.graph)

const projectionGenerator  = (urlQuery) => {

  let projectionObj = {}

  if(!urlQuery || !urlQuery?.projtype){
    return {}
  }else{
    let projType = urlQuery?.projtype

    if(projType===""){
      return {}
    }else if(projType==="bank"){
      projectionObj["bankName"]=1
      projectionObj["fullname"]=1
      projectionObj["accountNumber"]=1
      projectionObj["ifscCode"]=1
      projectionObj["branchName"]=1
      projectionObj["branchAddress"]=1
      projectionObj["country"]=1
      projectionObj["state"]=1
      projectionObj["city"]=1
      projectionObj["zipcode"]=1
      projectionObj["supportingDocuments"]=1

    }else if(projType==="education"){
      projectionObj["education.ssc_file"] = 1;
      projectionObj["education.hsc_file"] = 1;
      projectionObj["education.degree_file"] = 1;
      projectionObj["education.additional_degree"] = 1;
    }else if(projType==="bgv"){

      projectionObj["authorization_form"]=1
      projectionObj["verification_form"]=1
      projectionObj["form_completion"]=1

    }else if(projType==="personal"){

      projectionObj["user_id"]=1
      projectionObj["firstname"]=1
      projectionObj["lastname"]=1
      projectionObj["email"]=1

      projectionObj["dob"]=1
      projectionObj["gender"]=1
      projectionObj["mobile"]=1
      projectionObj["marital_status"]=1
      projectionObj["blood_group"]=1

      projectionObj["aadhar_num"]=1
      projectionObj["aadhar_file"]=1
      projectionObj["pan_num"]=1
      projectionObj["pan_file"]=1

      projectionObj["uan_num"]=1
      projectionObj["uan_file"]=1
      projectionObj["esic_num"]=1
      projectionObj["esic_file"]=1

      projectionObj["present_addr"]=1
      projectionObj["present_country"]=1
      projectionObj["present_state"]=1
      projectionObj["present_district"]=1
      projectionObj["present_zipcode"]=1

      projectionObj["permanent_addr"]=1
      projectionObj["permanent_country"]=1
      projectionObj["permanent_state"]=1
      projectionObj["permanent_district"]=1
      projectionObj["permanent_zipcode"]=1

      projectionObj["display_profile_file"]=1
      projectionObj["emergencyContacts"]=1
      projectionObj["familyDetails"]=1
      projectionObj["form_completion"]=1
      projectionObj["billing_type"] = 1
      projectionObj["backgroundCheckForm"] = 1
      projectionObj["authorizationForm"] = 1
      projectionObj["_id"]=1

    }else if(projType==="edit"){
      projectionObj["firstname"] = 1
      projectionObj["lastname"] = 1
      projectionObj["billing_type"] = 1
      projectionObj["email"] = 1
      projectionObj["job_type"] = 1
      projectionObj["monthly_ctc"] = 1
      projectionObj["salary_type"] = 1
      projectionObj["designation"] = 1
      projectionObj["department"] = 1
      projectionObj["user_role"] = 1
      projectionObj["user_status"] = 1
      projectionObj["yearly_ctc"] = 1
      projectionObj["reportsTo"] = 1
      projectionObj["passwordHash"] = 1
      projectionObj["user_id"] = 1
      projectionObj["employee_id"] = 1

      
    }
  }

  return projectionObj

}

//Get Employee By Id
methods.getOne=asyncHandler(async (req, res) => {
  const { user_id } = req.params;

  let generatedProjection = projectionGenerator(req.query)

  const check = await crud.getDocument(employee,{"_id":user_id}, {...generatedProjection}, {});

  if(!check || !check?.length) throw new Error('Data not Found!')
  try{
    if(req.query.projtype && req.query.projtype==="edit"){
      check[0]["passwordHash"] = ""
    }
    success(res, 200, true, "Get Successfully", check[0] );
  }catch(err) {
    throw new Error(err);
  }
})
router.get('/:user_id', methods.getOne)

const generateCompleteObject = (employeeObj,mapObj) => {

  let objReturn = {}

  //console.log("employee:",employeeObj)
  //console.log("mapObj:",mapObj)

  for(let key in mapObj){
    objReturn[key] = employeeObj[key]
  }

  //console.log("obj return:",objReturn)
  return objReturn

}

//Get Employee By Id for detailed expansion view
///
methods.getOneComplete = asyncHandler(async (req, res) => {
  const { user_id } = req.params;

  let responseBody = {};

  // Define projections for different details
  let bankDetailsProj = projectionGenerator({ "projtype": "bank" });
  let bgvDetailsProj = projectionGenerator({ "projtype": "bgv" });
  let personalDetailsProj = projectionGenerator({ "projtype": "personal" });
  let educationDetailsProj = projectionGenerator({ "projtype": "education" });

  // Add specific fields to personal details projection
  personalDetailsProj["job_type"] = 1;
  personalDetailsProj["designation"] = 1;
  personalDetailsProj["employee_id"] = 1;
  personalDetailsProj["department"] = 1;
  personalDetailsProj["user_status"] = 1;

  // Combine projections for basic details
  let basicProj = { ...bankDetailsProj, ...bgvDetailsProj, ...personalDetailsProj,"experience": 1 };
  let eduProj = educationDetailsProj;

  // Fetch employee document
  const check = await crud.getDocument(employee, { "_id": user_id }, { ...basicProj, ...eduProj }, {});


  // Check if employee data is found
  if (!check || !check.length) {
    return error(res, 404, "Data not Found!");
  }

  // Extract the first employee document
  const employeeDoc = check[0];

  // Construct response body
  responseBody["basic"] = generateCompleteObject(employeeDoc, basicProj);

  if (Array.isArray(employeeDoc.experience)) {
    responseBody["experience"] = employeeDoc.experience.map(exp => ({
      _id: exp._id,
      designation: exp.designation,
      company: exp.company,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
      jobType: exp.jobType,
      location: exp.location,
      offer_letter: exp.offer_letter,
      separation_letter: exp.separation_letter,
      pay_slip_01: exp.pay_slip_01,
      pay_slip_02: exp.pay_slip_02,
      pay_slip_03: exp.pay_slip_03,
      hike_letter: exp.hike_letter,
      separation_reason: exp.separation_reason,
      payslip_reason: exp.payslip_reason,
      internship_certificate:exp.internship_certificate,
      stipend:exp.stipend
    }));
  } else {
    responseBody["experience"] = []; // Default to empty array if no experience data
  }


  // Check if education exists and is an array
  if (Array.isArray(employeeDoc.education)) {
    responseBody["education"] = employeeDoc.education.map(edu => ({
      ssc_file: edu.ssc_file,
      hsc_file: edu.hsc_file,
      degree_file: edu.degree_file,
      additional_degree: edu.additional_degree // Include the entire array of additional degrees
    }));
  } else {
    responseBody["education"] = []; // Default to an empty array if no education data
  }



  // Extract bank details separately
  const bankDetails = {
    name_as_in_bank: employeeDoc.name_as_in_bank,
    bankName: employeeDoc.bankName,
    fullname: employeeDoc.fullname,
    accountNumber: employeeDoc.accountNumber,
    ifscCode: employeeDoc.ifscCode,
    branchName: employeeDoc.branchName,
    branchAddress: employeeDoc.branchAddress,
    country: employeeDoc.country,
    state: employeeDoc.state,
    city: employeeDoc.city,
    zipcode: employeeDoc.zipcode,
    supportingDocuments: employeeDoc.supportingDocuments,
  };

  responseBody["bankDetails"] = bankDetails; // Add bank details to the response

  try {
    success(res, 200, true, "Get Successfully", responseBody);
  } catch (err) {
    return error(res, 500, err.message);
  }
});
router.get('/complete/:user_id', methods.getOneComplete)

const checkFileBody = (fileBody,fieldName) => {
  if(!fileBody?.length)
    return false
  else{
    let flagData = false
    fileBody.forEach(file  => {
      if(file.fieldname === fieldName)
        flagData = file
    })
    return flagData
  }
}

const fileUpdateMngr = (dataBody,fileBody,fieldArr) => {

  for(let fieldName in fieldArr){
    let keyName = fieldArr[fieldName]
    let fileExist = checkFileBody(fileBody,keyName)
    if(fileExist){
      dataBody[keyName] = fileExist
    }else if(dataBody[keyName]){
      dataBody[keyName] = JSON.parse(dataBody[keyName])
    }else{
      dataBody[keyName] = null
    }
  }

}

const additionalEducationMngr = (dataBody,fileBody,exceptionArr) => {

  let additionalObjects = {}

  for(let feildKey in dataBody){
    if(!exceptionArr.includes(feildKey)){
      additionalObjects[feildKey] = JSON.parse(dataBody[feildKey])
    }
  }

  fileBody.forEach(file => {
    if(!exceptionArr.includes(file.fieldname)){
      additionalObjects[file.fieldname] = file
    }
  });

  console.log("add-dataBody:",dataBody)
  console.log("add-fileBody:",fileBody)
  console.log("exceptionArr",exceptionArr)
  console.log("additionalObjects",additionalObjects)

  return Object. keys(additionalObjects).length?additionalObjects:undefined;

}

methods.profile = asyncHandler(async (req, res) => {

  const { user_id } = req.params;
  console.log("req.body",req.body)
  console.log("req.files",req.files)

  let filesArr = req.files
  let reqObj = req.body

  reqObj["display_profile_file"] = filesArr[0]

  const check = await crud.getDocument(employee,{"user_id":user_id},{},{});
  if (!check) throw new Error('Data not Found!')
  try{
    success(res, 200, true, 'Update Successfully', await crud.updateOne(employee, {"user_id":user_id}, reqObj, {}));
  }catch(err) {
    console.log("profile pic err:",err)
    throw new Error(err);
  }

})
router.post('/:user_id',upload.any(),methods.profile )

const updateFormCompletion = async (user_id) => {

  let projectionObj = {}
  projectionObj["aadhar_num"]=1
  projectionObj["authorization_form"]=1
  projectionObj["account_num"]=1
  projectionObj["hsc_file"]=1

  const check = await crud.getDocument(employee,{"_id":user_id}, {...projectionObj}, {});
  let user_data = check[0]
  let form_percentage = 0
  if(user_data["aadhar_num"]){
    form_percentage+=20
  }
  if(user_data["present_addr"]){
    form_percentage+=5
  }
  if(user_data["emergencyContacts"]){
    form_percentage+=5
  }
  if(user_data["familyDetails"]){
    form_percentage+=5
  }
  if(user_data["authorization_form"]){
    form_percentage+=25
  }
  if(user_data["account_num"]){
    form_percentage+=25
  }
  if(user_data["hsc_file"]){
    form_percentage+=25
  }
  console.log("user-data:",user_data)
  console.log("form%",form_percentage)
  await crud.updateOne(employee, {"_id":user_id}, {"form_completion":form_percentage}, {})
}

methods.edit = asyncHandler(async (req, res) => {
  const { user_id } = req.params;

  if (req?.files?.length > 0) {
    req.files.forEach((file) => {
      req.body[file.fieldname] = file.path;
    });
  }

  // Parse education data
  if (req.body.education) {
    const educationData = JSON.parse(req.body.education)[0];
    req.body.education = [{
      ssc_file: req.body.ssc_file || educationData.ssc_file,
      hsc_file: req.body.hsc_file || educationData.hsc_file,
      degree_file: req.body.degree_file || educationData.degree_file,
      additional_degree: educationData.additional_degree.map((degree, index) => ({
        exam: degree.exam,
        additional_certificate: req.body[`additional_certificate_${index}`] || degree.additional_certificate
      }))
    }];
  }
  

  const check = await crud.getDocument(employee, { "user_id": user_id }, {}, {});
  if (!check) throw new Error('Data not Found!');

  try {
    let updateResponse = await crud.updateOne(employee, { "_id": user_id }, req.body, {});
    await updateFormCompletion(user_id);
    success(res, 200, true, 'Update Successfully', updateResponse);
  } catch (err) {
    throw new Error(err);
  }
});

router.put('/:user_id', upload.any(), methods.edit);

methods.addExperience = asyncHandler(async (req, res) => {
  console.log(req.body); // Log the entire request body
  console.log(req.files); // Log the uploaded files

  const { user_id } = req.params;

  // Access experience data from req.body.experience
  const experienceData = {
    designation: req.body.experience.designation,
    company: req.body.experience.company,
    startDate: req.body.experience.startDate,
    endDate: req.body.experience.endDate,
    jobType: req.body.experience.jobType,
    location: req.body.experience.location,
    offer_letter: req.body.experience.offer_letter,
    separation_letter: req.body.experience.separation_letter,
    pay_slip_01: req.body.experience.pay_slip_01,
    pay_slip_02: req.body.experience.pay_slip_02,
    pay_slip_03: req.body.experience.pay_slip_03,
    description: req.body.experience.description,
    hike_letter: req.body.experience.hike_letter,
    internship_certificate: req.body.experience.internship_certificate,
    separation_reason: req.body.experience.separation_reason,
    payslip_reason: req.body.experience.payslip_reason,
    stipend:req.body.experience.payslip_stipend,

  };

  console.log('Experience Data:', experienceData); // Log the experience data

  const updateResponse = await crud.updateOne(
    employee,
    { "_id": user_id },
    { $push: { experience: experienceData } },
    {}
  );

  if (updateResponse.modifiedCount === 1) {
    success(res, 201, true, 'Experience Added Successfully', updateResponse);
  } else {
    throw new Error('Experience update failed');
  }
});


router.post('/:user_id/experience', upload.fields([{ name: 'experience[offer_letter]' }, { name: 'experience[separation_letter]' },{ name: 'experience[hike_letter]' },{ name: 'experience[pay_slip_01]' },{ name: 'experience[pay_slip_02]' },{ name: 'experience[pay_slip_03]' },{name:'experience[internship_certificate]'}]), methods.addExperience);



methods.editExperience = asyncHandler(async (req, res) => {
  const { user_id, experience_id } = req.params; // Get user_id and experience_id from request parameters
  const updateData = req.body; // Get the updated data from the request body

  // Find the employee by user_id and update the specific experience entry
  const updatedEmployee = await employee.findOneAndUpdate(
    { _id: user_id, "experience._id": experience_id },
    { $set: { "experience.$": updateData } }, // Use positional operator to update the specific experience
    { new: true } // Return the updated document
  );

  // Check if the employee was found and updated
  if (!updatedEmployee) {
    return error(res, 404, "Employee or Experience not found!");
  }

  success(res, 200, true, "Experience updated successfully", updatedEmployee.experience);
});

router.put('/:user_id/experience/:experience_id', methods.editExperience);



methods.deleteExperience = asyncHandler(async (req, res) => {
  const { user_id, experience_id } = req.params; // Get user_id and experience_id from request parameters

  // Find the employee by user_id and remove the specific experience entry
  const updatedEmployee = await employee.findOneAndUpdate(
    { _id: user_id },
    { $pull: { experience: { _id: experience_id } } }, // Use $pull to remove the experience entry
    { new: true } // Return the updated document
  );

  // Check if the employee was found and updated
  if (!updatedEmployee) {
    return error(res, 404, "Employee not found!");
  }

  success(res, 200, true, "Experience deleted successfully", updatedEmployee.experience);
});

router.delete('/:user_id/experience/:experience_id', methods.deleteExperience);


module.exports = router;