const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const { admin, employee, roles, clients, company, job, totallogs, contacts, accounts, candidatelog, invoice, expense, teams } = require('../../utils/schemaMaster');
const { generateToken } = require("../../config/jwtToken");
const { success, successToken } = require("../../utils/response");
const sendMail = require('../../utils/sendMail');
const { register} = require('../../utils/email_template');
const mongoose = require('mongoose');
const crud_service = require('../../utils/crud_service');
const validateId = require('../../utils/validateId');
const { authAdmin } = require('../../middlewares/authMiddlewares');
const crud = new crud_service();
const upload = require("../../utils/upload");
const admin_schema = require('../../models/admin_login');

const INACTIVITY_TIMEOUT= 10 * 60 * 1000;


//create admin


router.post('/register', asyncHandler(async (req, res) => {
  const check_phone = await crud.getOneDocument(admin,{ phone_number: req?.body?.phone_number },{},{});
  const check_email = await crud.getOneDocument(admin,{ email_id: req?.body?.email_id },{},{});
  const salt = bcrypt.genSaltSync(10);
  req.body.password = await bcrypt.hash(req?.body?.password, salt);
  
  try {
     req.body.phone_number=654444444444444
 
    const create = await crud.insertOne(admin, req.body);


    if (create) {
      let role = await crud.getDocument(roles, {name:create?.role},{_id:1},{})
      let updatepermission= await crud.updateById(admin, create?._id, {permission:role[0]?._id}, { new: true })
       successToken(res, 201, true, "Register Successfully",create,generateToken(create?._id));
        
      }
    
      // sendMail(options);
   
  } catch (error) {
    throw new Error(error);
  }
}))
//admin login
router.post('/login', asyncHandler(async (req, res) => {
  const { email_id, password } = req.body;

  try {
    const find_admin = await crud.getOneDocument(admin, { email_id }, {}, { populate: "company_id" });

    if (!find_admin) {
      throw new Error("Invalid Username Or Password!");
    }

    const userStatus = find_admin.userstatus || 'active';
    if (userStatus === 'blocked' || userStatus === 'disabled') {
      const message = `Account is ${userStatus}. Please contact the administrator.`;
      return res.status(403).json({ success: false, message });
    }

    const password_match = await bcrypt.compare(password, find_admin.password);
    if (!password_match) {
      throw new Error("Invalid Username Or Password!");
    }

    const sessionDuration = 9 * 60 * 60 * 1000; // 9 hours
    const sessionExpiresAt = new Date(Date.now() + sessionDuration);
    const lastActivityAt = new Date();

    await admin.findByIdAndUpdate(
      find_admin._id,
      { sessionExpiresAt, lastActivityAt },
      { new: true }
    );

    const token = generateToken(find_admin._id);

    res.cookie('session_token', token, {
      httpOnly: true,
      maxAge: sessionDuration, 
    });

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      token,
      data: {
        admin_data: find_admin,
        session_data: { sessionExpiresAt, lastActivityAt }
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred during login."
    });
  }
}));


///Session Alive status
router.post('/keep-alive', (req, res) => {
  const token = req.cookies['session_token'];
  const sessionData = req.cookies['session_data'] ? JSON.parse(req.cookies['session_data']) : null;

  if (!token || !sessionData) {
    return res.status(401).json({ error: 'Session expired. Please log in again.' });
  }

  const now = new Date();
  const lastActivityAt = new Date(sessionData.lastActivityAt);

  if (now - lastActivityAt > 15 * 60 * 1000) { // 15 minutes inactivity
    res.clearCookie('session_token');
    res.clearCookie('session_data');
    return res.status(401).json({ error: 'Session expired due to inactivity.' });
  }

  const updatedLastActivityAt = new Date();
  sessionData.lastActivityAt = updatedLastActivityAt;

  res.cookie('session_data', JSON.stringify(sessionData), {
    httpOnly: true,
    secure: true,
    maxAge: 10 * 60 * 60 * 1000, // 10 hours
  });

  res.status(200).json({ message: 'Session refreshed.' });
});





// getAllHR

router.get('/HR/:query', authAdmin, asyncHandler(async (req, res) => {
 console.log("req.user?.company_id",req.user?.company_id)
  let query=req.params.query;
  let aggregateweekQuery=[]
  if(query =="Week"){
    // const startOfWeek = new Date();
    // startOfWeek.setHours(0, 0, 0, 0);
    // startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    // const endOfWeek = new Date();
    // endOfWeek.setHours(23, 59, 59, 999);
    // endOfWeek.setDate(startOfWeek.getDate() + 6 - startOfWeek.getDay());
     aggregateweekQuery = [
      {
        $match: {
        company_id: req.user?.company_id?new mongoose.Types.ObjectId(req.user?.company_id):null,
         
                        
          ...(req.query.hr ?{_id:new mongoose.Types.ObjectId(req.query.hr)}:{role: "HR"}) ,
        },
      },
      {
        $lookup: {
          from: "totallogs",
          let: { hr_id: "$_id" },
          pipeline: [
            {
              $match: {
                ...(req.query.no_of_days == 1 ?
                  {$expr: {
                    $and: [
                      { $eq: ["$created_by", "$$hr_id"] },
                      { $eq: [{ $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, req.query.startOfWeek] } // Assuming req.query.today contains today's date in the format "YYYY-MM-DD"
                    ]
                  }}
                  :
                  {$expr: { $eq: ["$created_by", "$$hr_id"] },
                  // Assuming your totallogs documents have a 'date' field
                  createdAt: { $gte: new Date(req.query.startOfWeek), $lte: new Date(req.query.endOfWeek) }

                }
                  
                  
                  )
               
              }
            }
          ],
          as: "totallogs",
        },
      },
      {
        $unwind: "$totallogs", // Unwind the array for easier grouping
      },
      {
        $group: {
          _id: {
            _id: "$_id",
            name: "$name",
          },
      
          OverallSubmission: {
            $sum: { $cond: [{ $eq: ["$totallogs.status", "Submitted"] }, 1, 0] },
          },
          L1Noshow: {
            $sum: { $cond: [{ $eq: ["$totallogs.status", "L1 No show"] }, 1, 0] },
          },
          Offered: {
            $sum: { $cond: [{ $eq: ["$totallogs.status", "Offered"] }, 1, 0] },
          },
          clientScreenReject: {
            $sum: { $cond: [{ $eq: ["$totallogs.status", "Client screen Reject"] }, 1, 0] },
          },
          clientSubmission: {
            $sum: { $cond: [{ $eq: ["$totallogs.status", "Client submission"] }, 1, 0] },
          },
          Interview: {
            $sum: { $cond: [{ $eq: ["$totallogs.status", "L1 schedule"] }, 1, 0] },
          },
          joined: {
            $sum: { $cond: [{ $eq: ["$totallogs.status", "Joined"] }, 1, 0] },
          },
        },
      },
      {
        $sort: {
          clientSubmission: -1, // Sort by clientSubmission count in descending order
        }
      },
      {
        $project: {
          _id:0,
           data1:{
            x:"$_id.name",
            y:"$OverallSubmission"
           },
           data2:{
            x:"$_id.name",
            y:"$clientSubmission"
           },
            data3:{
            x:"$_id.name",
            y:"$clientScreenReject"
           }, 
           data4:{
            x:"$_id.name",
            y:"$Interview"
           }, 
           data5:{
            x:"$_id.name",
            y:"$L1Noshow"
           },
           data6:{
            x:"$_id.name",
            y:"$Offered"
           },
            data7:{
            x:"$_id.name",
            y:"$joined"
           },
        
          
          //    "$L1Noshow","$clientSubmission","$clientScreenReject","$Interview","$Offered","$joined",
          // ],
          // _id: "$_id._id",
          // name: "$_id.name",
          // Offered: 1,
          // clientSubmission: 1,
          // Interview: 1,
          // joined: 1,
        },
      },
   
    ];
 ;}
 if(query =="Month"){
  const startOfMonth = new Date();
  startOfMonth.setHours(0, 0, 0, 0);
  startOfMonth.setDate(1);
  
  const endOfMonth = new Date();
  endOfMonth.setHours(23, 59, 59, 999);
  endOfMonth.setMonth(startOfMonth.getMonth() + 1);
  endOfMonth.setDate(0);
   aggregateweekQuery = [
    {
      $match: {
        company_id: req.user?.company_id?new mongoose.Types.ObjectId(req.user?.company_id):null,

        ...(req.query.hr ?{_id:new mongoose.Types.ObjectId(req.query.hr)}:{role: "HR"}) ,
       
      },
    },
    {
      $lookup: {
        from: "totallogs",
        let: { hr_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$created_by", "$$hr_id"] },
              // Assuming your totallogs documents have a 'date' field
              createdAt: { $gte: startOfMonth, $lte: endOfMonth }
            }
          }
        ],
        as: "totallogs",
      },
    },
    {
      $unwind: "$totallogs", // Unwind the array for easier grouping
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          name: "$name",
        },
    

        OverallSubmission: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "Submitted"] }, 1, 0] },
        },
        L1Noshow: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "L1 No show"] }, 1, 0] },
        },
        Offered: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "Offered"] }, 1, 0] },
        },
        clientScreenReject: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "Client screen Reject"] }, 1, 0] },
        },
        clientSubmission: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "Client submission"] }, 1, 0] },
        },
        Interview: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "L1 schedule"] }, 1, 0] },
        },
        joined: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "Joined"] }, 1, 0] },
        },
      },
    },
    {
      $sort: {
        clientSubmission: -1, // Sort by clientSubmission count in descending order
      }
    },
    {
      $project: {
        _id:0,
         data1:{
          x:"$_id.name",
          y:"$OverallSubmission"
         },
         data2:{
          x:"$_id.name",
          y:"$clientSubmission"
         },
          data3:{
          x:"$_id.name",
          y:"$clientScreenReject"
         }, 
         data4:{
          x:"$_id.name",
          y:"$Interview"
         }, 
         data5:{
          x:"$_id.name",
          y:"$L1Noshow"
         },
         data6:{
          x:"$_id.name",
          y:"$Offered"
         },
          data7:{
          x:"$_id.name",
          y:"$joined"
         },
      
        
        //    "$L1Noshow","$clientSubmission","$clientScreenReject","$Interview","$Offered","$joined",
        // ],
        // _id: "$_id._id",
        // name: "$_id.name",
        // Offered: 1,
        // clientSubmission: 1,
        // Interview: 1,
        // joined: 1,
      },
    },
  ];
;}

if(query =="Year"){
  const startOfYear = new Date();
  startOfYear.setHours(0, 0, 0, 0);
  startOfYear.setMonth(0, 1); // Set to the first day of the current year
  
  const endOfYear = new Date();
  endOfYear.setHours(23, 59, 59, 999);
  endOfYear.setMonth(11, 31); 
   aggregateweekQuery = [
    {
      $match: {
        role: "HR",
      },
    },
    {
      $lookup: {
        from: "totallogs",
        let: { hr_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$created_by", "$$hr_id"] },
              // Assuming your totallogs documents have a 'date' field
              createdAt: { $gte: startOfYear, $lte: endOfYear }
            }
          }
        ],
        as: "totallogs",
      },
    },
    {
      $unwind: "$totallogs", // Unwind the array for easier grouping
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          name: "$name",
        },
        OverallSubmission: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "Submitted"] }, 1, 0] },
        },
        L1Noshow: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "L1Noshow"] }, 1, 0] },
        },
        Offered: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "Offered"] }, 1, 0] },
        },
        clientScreenReject: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "Client screen Reject"] }, 1, 0] },
        },
        clientSubmission: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "Client submission"] }, 1, 0] },
        },
        Interview: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "L1 schedule"] }, 1, 0] },
        },
        joined: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "Joined"] }, 1, 0] },
        },
      },
    },
    {
      $sort: {
        clientSubmission: -1, // Sort by clientSubmission count in descending order
      }
    },
    {
      $project: {
        _id:0,
         data1:{
          x:"$_id.name",
          y:"$OverallSubmission"
         },
         data2:{
          x:"$_id.name",
          y:"$clientSubmission"
         },
          data3:{
          x:"$_id.name",
          y:"$clientScreenReject"
         }, 
         data4:{
          x:"$_id.name",
          y:"$Interview"
         }, 
         data5:{
          x:"$_id.name",
          y:"$L1Noshow"
         },
         data6:{
          x:"$_id.name",
          y:"$Offered"
         },
          data7:{
          x:"$_id.name",
          y:"$joined"
         },
        
        //    "$L1Noshow","$clientSubmission","$clientScreenReject","$Interview","$Offered","$joined",
        // ],
        // _id: "$_id._id",
        // name: "$_id.name",
        // Offered: 1,
        // clientSubmission: 1,
        // Interview: 1,
        // joined: 1,
      },
    },
  ];
;}


  let dataWeek = await admin.aggregate(aggregateweekQuery);
  console.log("dataWeek", dataWeek)

    let total=[]
    let Allsubmissions=[]
    let  ClientSubmission=[]
    let  ClientScreenReject=[]
    let Interview=[]
    let L1noshow=[]
    let Offered=[]
    let Joined=[]
   
  

  // Dynamically merge all data1 arrays in each object
  const mergedData1 = dataWeek?.map((item,i) => {
    total =[...total,item?.data1?.y]
    Allsubmissions=[...Allsubmissions,item.data2.x]
    ClientSubmission=[...ClientSubmission,item.data2?.y]
    ClientScreenReject=[...ClientScreenReject,item.data3?.y]
    Interview=[...Interview,item.data4?.y]
    L1noshow=[...L1noshow,item.data5?.y]
    Offered=[...Offered,item.data6?.y]
    Joined=[...Joined,item.data7?.y]
  //  dataWeek?.map((item)=>{
  //   senddata.push(item.data)
  //  })
  })
  // Dynamically merge all data1 arrays in each object
  
  let senddata={
  label:Allsubmissions,
  ClientSubmission,
  ClientScreenReject,
  Interview,
  L1noshow,
  Offered,
  Joined,
  total
  
  }

  try {
    success(res, 200, true, "Get Successfully",senddata);
    }
   catch (error) {
    throw new Error(error);
  }
}))
router.get('/chart/test', authAdmin, asyncHandler(async (req, res) => {
  const today = new Date();
  const { timeframe } = req.query;
  let start, end;
  switch (timeframe) {
    case 'Year':
      start = new Date(new Date().getFullYear(), 0, 1); // Start of the current year
      end = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999); // End of the current year
      break;
    case 'Month':
      const currentDate = new Date();
      start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Start of the current month
      end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999); // End of the current month
      break;
    case 'Week':
      const today = new Date();
      const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Start of the current week (Monday)
      firstDayOfWeek.setHours(0, 0, 0, 0); // Set time to start of the day
  
      const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7)); // End of the current week (Sunday)
      lastDayOfWeek.setHours(23, 59, 59, 999); // Set time to end of the day
  
      start = firstDayOfWeek;
      end = lastDayOfWeek;
      break;
    case 'Custom':
      if (req.query.range === "Monthly Wise") {
        const [year, month] = req.query.date.split('-').map(Number);
        start = new Date(year, month - 1, 1); // Start of the specified month
        end = new Date(year, month, 0, 23, 59, 59, 999); // End of the specified month
      } else if (req.query.range === "Weekly Wise" && req.query.date) {
        const [year, weekStr] = req.query.date.split('-');
        const week = parseInt(weekStr.replace('th', ''), 10);
        const firstDayOfYear = new Date(year, 0, 1);
        const daysOffset = (week - 1) * 7; // Start of the week
  
        const startOfWeek = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + daysOffset));
        const dayOfWeek = startOfWeek.getDay();
        start = new Date(startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek + 1)); // Set to Monday
        start.setHours(0, 0, 0, 0); // Set to the start of the day
  
        end = new Date(start);
        end.setDate(start.getDate() + 6); // End of the week (Sunday)
        end.setHours(23, 59, 59, 999); // Set to the end of the day
      } else if (req.query.range === "Yearly Wise" && req.query.date) {
        const year = parseInt(req.query.date, 10);
        start = new Date(year, 0, 1); // Start of the specified year
        end = new Date(year, 11, 31, 23, 59, 59, 999); // End of the specified year
      } else {
        start = new Date(req.query.startDate); // Custom start date
        end = new Date(req.query.endDate); // Custom end date
      }
      break;
    default:
      return res.status(400).json({ success: false, message: "Invalid filter type" });
  }
  // Determine start and end dates based on the timeframe

let AllsubmissionsTeam= [
  {
    $match: {
      created_by:new mongoose.Types.ObjectId(req.user?._id),
      createdAt: { 
        $gte: new Date(new Date().getFullYear(), 0, 1), // Start of the current year
        $lte: new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999), // End of the current year
      },
      status: "Client submission"
    }
  },
  {
    $group: {
      _id: { $month: "$createdAt" },
      monthSubmissionCount: { $sum: 1 }
    }
  },
  {
    $sort: { "_id": 1 }
  },
  {
    $group: {
      _id: null,
      data: {
        $push: {
          dayOfWeek: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "Jan" },
                { case: { $eq: ["$_id", 2] }, then: "Feb" },
                { case: { $eq: ["$_id", 3] }, then: "Mar" },
                { case: { $eq: ["$_id", 4] }, then: "Apr" },
                { case: { $eq: ["$_id", 5] }, then: "May" },
                { case: { $eq: ["$_id", 6] }, then: "Jun" },
                { case: { $eq: ["$_id", 7] }, then: "Jul" },
                { case: { $eq: ["$_id", 8] }, then: "Aug" },
                { case: { $eq: ["$_id", 9] }, then: "Sep" },
                { case: { $eq: ["$_id", 10] }, then: "Oct" },
                { case: { $eq: ["$_id", 11] }, then: "Nov" },
                { case: { $eq: ["$_id", 12] }, then: "Dec" }
              ],
              default: "Unknown"
            }
          },
          clientSubmissionCount: "$monthSubmissionCount"
        }
      }
    }
  },

  {
    $project: {
      _id: 0,
      data: {
        $map: {
          input: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          as: "day",
          in: {
            $cond: [
                      { $in: ["$$day", "$data.dayOfWeek"] },
                       { $arrayElemAt: ["$data.clientSubmissionCount", { $indexOfArray: ["$data.dayOfWeek", "$$day"] }] },
                          0
                       ]
          }
        }
      }
    }
  },
];


let Allsubmissions= [
  {
    $match: {
      created_by:new mongoose.Types.ObjectId(req.user?._id),

      createdAt: { $gte: start, $lte: end },
      status: "Submitted"
    }
  },
  {
    $group: {
      _id: { $dayOfWeek: "$createdAt" },
      clientSubmissionCount: { $sum: 1 }
    }
  },
  {
    $group: {
      _id: null,
      data: {
        $push: {
          dayOfWeek: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "Sun" },
                { case: { $eq: ["$_id", 2] }, then: "Mon" },
                { case: { $eq: ["$_id", 3] }, then: "Tue" },
                { case: { $eq: ["$_id", 4] }, then: "Wed" },
                { case: { $eq: ["$_id", 5] }, then: "Thu" },
                { case: { $eq: ["$_id", 6] }, then: "Fri" },
                { case: { $eq: ["$_id", 7] }, then: "Sat" }
              ],
              default: ""
            }
          },
          clientSubmissionCount: "$clientSubmissionCount"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      data: {
        $map: {
          input: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          as: "day",
          in: {
            $cond: [
                      { $in: ["$$day", "$data.dayOfWeek"] },
                       { $arrayElemAt: ["$data.clientSubmissionCount", { $indexOfArray: ["$data.dayOfWeek", "$$day"] }] },
                          0
                       ]
          }
        }
      }
    }
  },
];
let aggregateweekQuery ;
let aggregateweekQuery2 ;
 let aggregateweekQuery1;
 let aggregateweekQuery3; 
 let aggregateweekQuery4;

if(timeframe == "Year"){
  aggregateweekQuery =[
    {
      $match: {
        created_by:new mongoose.Types.ObjectId(req.user._id),
        createdAt: { 
          $gte: new Date(new Date().getFullYear(), 0, 1), // Start of the current year
          $lte: new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999), // End of the current year
        },
        status: "Client submission"
      }
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        monthSubmissionCount: { $sum: 1 }
      }
    },
    {
      $sort: { "_id": 1 }
    },
    {
      $group: {
        _id: null,
        data: {
          $push: {
            dayOfWeek: {
              $switch: {
                branches: [
                  { case: { $eq: ["$_id", 1] }, then: "Jan" },
                  { case: { $eq: ["$_id", 2] }, then: "Feb" },
                  { case: { $eq: ["$_id", 3] }, then: "Mar" },
                  { case: { $eq: ["$_id", 4] }, then: "Apr" },
                  { case: { $eq: ["$_id", 5] }, then: "May" },
                  { case: { $eq: ["$_id", 6] }, then: "Jun" },
                  { case: { $eq: ["$_id", 7] }, then: "Jul" },
                  { case: { $eq: ["$_id", 8] }, then: "Aug" },
                  { case: { $eq: ["$_id", 9] }, then: "Sep" },
                  { case: { $eq: ["$_id", 10] }, then: "Oct" },
                  { case: { $eq: ["$_id", 11] }, then: "Nov" },
                  { case: { $eq: ["$_id", 12] }, then: "Dec" }
                ],
                default: "Unknown"
              }
            },
            clientSubmissionCount: "$monthSubmissionCount"
          }
        }
      }
    },
  
    {
      $project: {
        _id: 0,
        data: {
          $map: {
            input: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            as: "day",
            in: {
              $cond: [
                        { $in: ["$$day", "$data.dayOfWeek"] },
                         { $arrayElemAt: ["$data.clientSubmissionCount", { $indexOfArray: ["$data.dayOfWeek", "$$day"] }] },
                            0
                         ]
            }
          }
        }
      }
    },
  ];
  aggregateweekQuery1 =[
    {
      $match: {
        created_by:new mongoose.Types.ObjectId(req.user._id),
        createdAt: { 
          $gte: new Date(new Date().getFullYear(), 0, 1), // Start of the current year
          $lte: new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999), // End of the current year
        },
        status: "Client screen Reject"
      }
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        monthSubmissionCount: { $sum: 1 }
      }
    },
    {
      $sort: { "_id": 1 }
    },
    {
      $group: {
        _id: null,
        data: {
          $push: {
            dayOfWeek: {
              $switch: {
                branches: [
                  { case: { $eq: ["$_id", 1] }, then: "Jan" },
                  { case: { $eq: ["$_id", 2] }, then: "Feb" },
                  { case: { $eq: ["$_id", 3] }, then: "Mar" },
                  { case: { $eq: ["$_id", 4] }, then: "Apr" },
                  { case: { $eq: ["$_id", 5] }, then: "May" },
                  { case: { $eq: ["$_id", 6] }, then: "Jun" },
                  { case: { $eq: ["$_id", 7] }, then: "Jul" },
                  { case: { $eq: ["$_id", 8] }, then: "Aug" },
                  { case: { $eq: ["$_id", 9] }, then: "Sep" },
                  { case: { $eq: ["$_id", 10] }, then: "Oct" },
                  { case: { $eq: ["$_id", 11] }, then: "Nov" },
                  { case: { $eq: ["$_id", 12] }, then: "Dec" }
                ],
                default: "Unknown"
              }
            },
            clientSubmissionCount: "$monthSubmissionCount"
          }
        }
      }
    },
  
    {
      $project: {
        _id: 0,
        data: {
          $map: {
            input: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            as: "day",
            in: {
              $cond: [
                        { $in: ["$$day", "$data.dayOfWeek"] },
                         { $arrayElemAt: ["$data.clientSubmissionCount", { $indexOfArray: ["$data.dayOfWeek", "$$day"] }] },
                            0
                         ]
            }
          }
        }
      }
    },
  ];
  aggregateweekQuery3 =[
    {
      $match: {
        created_by:new mongoose.Types.ObjectId(req.user._id),
        createdAt: { 
          $gte: new Date(new Date().getFullYear(), 0, 1), // Start of the current year
          $lte: new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999), // End of the current year
        },
        status: "L1Noshow"
      }
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        monthSubmissionCount: { $sum: 1 }
      }
    },
    {
      $sort: { "_id": 1 }
    },
    {
      $group: {
        _id: null,
        data: {
          $push: {
            dayOfWeek: {
              $switch: {
                branches: [
                  { case: { $eq: ["$_id", 1] }, then: "Jan" },
                  { case: { $eq: ["$_id", 2] }, then: "Feb" },
                  { case: { $eq: ["$_id", 3] }, then: "Mar" },
                  { case: { $eq: ["$_id", 4] }, then: "Apr" },
                  { case: { $eq: ["$_id", 5] }, then: "May" },
                  { case: { $eq: ["$_id", 6] }, then: "Jun" },
                  { case: { $eq: ["$_id", 7] }, then: "Jul" },
                  { case: { $eq: ["$_id", 8] }, then: "Aug" },
                  { case: { $eq: ["$_id", 9] }, then: "Sep" },
                  { case: { $eq: ["$_id", 10] }, then: "Oct" },
                  { case: { $eq: ["$_id", 11] }, then: "Nov" },
                  { case: { $eq: ["$_id", 12] }, then: "Dec" }
                ],
                default: "Unknown"
              }
            },
            clientSubmissionCount: "$monthSubmissionCount"
          }
        }
      }
    },
  
    {
      $project: {
        _id: 0,
        data: {
          $map: {
            input: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            as: "day",
            in: {
              $cond: [
                        { $in: ["$$day", "$data.dayOfWeek"] },
                         { $arrayElemAt: ["$data.clientSubmissionCount", { $indexOfArray: ["$data.dayOfWeek", "$$day"] }] },
                            0
                         ]
            }
          }
        }
      }
    },
  ];
  aggregateweekQuery4 =[
    {
      $match: {
        created_by:new mongoose.Types.ObjectId(req.user._id),
        createdAt: { 
          $gte: new Date(new Date().getFullYear(), 0, 1), // Start of the current year
          $lte: new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999), // End of the current year
        },
        status: "Joined"
      }
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        monthSubmissionCount: { $sum: 1 }
      }
    },
    {
      $sort: { "_id": 1 }
    },
    {
      $group: {
        _id: null,
        data: {
          $push: {
            dayOfWeek: {
              $switch: {
                branches: [
                  { case: { $eq: ["$_id", 1] }, then: "Jan" },
                  { case: { $eq: ["$_id", 2] }, then: "Feb" },
                  { case: { $eq: ["$_id", 3] }, then: "Mar" },
                  { case: { $eq: ["$_id", 4] }, then: "Apr" },
                  { case: { $eq: ["$_id", 5] }, then: "May" },
                  { case: { $eq: ["$_id", 6] }, then: "Jun" },
                  { case: { $eq: ["$_id", 7] }, then: "Jul" },
                  { case: { $eq: ["$_id", 8] }, then: "Aug" },
                  { case: { $eq: ["$_id", 9] }, then: "Sep" },
                  { case: { $eq: ["$_id", 10] }, then: "Oct" },
                  { case: { $eq: ["$_id", 11] }, then: "Nov" },
                  { case: { $eq: ["$_id", 12] }, then: "Dec" }
                ],
                default: "Unknown"
              }
            },
            clientSubmissionCount: "$monthSubmissionCount"
          }
        }
      }
    },
  
    {
      $project: {
        _id: 0,
        data: {
          $map: {
            input: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            as: "day",
            in: {
              $cond: [
                        { $in: ["$$day", "$data.dayOfWeek"] },
                         { $arrayElemAt: ["$data.clientSubmissionCount", { $indexOfArray: ["$data.dayOfWeek", "$$day"] }] },
                            0
                         ]
            }
          }
        }
      }
    },
  ];

  

  aggregateweekQuery2 =[
    {
      $match: {
        created_by:new mongoose.Types.ObjectId(req.user._id),
        createdAt: { 
          $gte: new Date(new Date().getFullYear(), 0, 1), // Start of the current year
          $lte: new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999), // End of the current year
        },
        status: "L1 schedule"
      }
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        monthSubmissionCount: { $sum: 1 }
      }
    },
    {
      $sort: { "_id": 1 }
    },
    {
      $group: {
        _id: null,
        data: {
          $push: {
            dayOfWeek: {
              $switch: {
                branches: [
                  { case: { $eq: ["$_id", 1] }, then: "Jan" },
                  { case: { $eq: ["$_id", 2] }, then: "Feb" },
                  { case: { $eq: ["$_id", 3] }, then: "Mar" },
                  { case: { $eq: ["$_id", 4] }, then: "Apr" },
                  { case: { $eq: ["$_id", 5] }, then: "May" },
                  { case: { $eq: ["$_id", 6] }, then: "Jun" },
                  { case: { $eq: ["$_id", 7] }, then: "Jul" },
                  { case: { $eq: ["$_id", 8] }, then: "Aug" },
                  { case: { $eq: ["$_id", 9] }, then: "Sep" },
                  { case: { $eq: ["$_id", 10] }, then: "Oct" },
                  { case: { $eq: ["$_id", 11] }, then: "Nov" },
                  { case: { $eq: ["$_id", 12] }, then: "Dec" }
                ],
                default: "Unknown"
              }
            },
            clientSubmissionCount: "$monthSubmissionCount"
          }
        }
      }
    },
  
    {
      $project: {
        _id: 0,
        data: {
          $map: {
            input: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            as: "day",
            in: {
              $cond: [
                        { $in: ["$$day", "$data.dayOfWeek"] },
                         { $arrayElemAt: ["$data.clientSubmissionCount", { $indexOfArray: ["$data.dayOfWeek", "$$day"] }] },
                            0
                         ]
            }
          }
        }
      }
    },
  ];
}
else{
  aggregateweekQuery =
  [
    {
      $match: {
        created_by:new mongoose.Types.ObjectId(req.user?._id),
  
        createdAt: { $gte: start, $lte: end },
        status: "Client submission"
      }
    },
    {
      $group: {
        _id: { $dayOfWeek: "$createdAt" },
        clientSubmissionCount: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: null,
        data: {
          $push: {
            dayOfWeek: {
              $switch: {
                branches: [
                  { case: { $eq: ["$_id", 1] }, then: "Sun" },
                  { case: { $eq: ["$_id", 2] }, then: "Mon" },
                  { case: { $eq: ["$_id", 3] }, then: "Tue" },
                  { case: { $eq: ["$_id", 4] }, then: "Wed" },
                  { case: { $eq: ["$_id", 5] }, then: "Thu" },
                  { case: { $eq: ["$_id", 6] }, then: "Fri" },
                  { case: { $eq: ["$_id", 7] }, then: "Sat" }
                ],
                default: ""
              }
            },
            clientSubmissionCount: "$clientSubmissionCount"
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        data: {
          $map: {
            input: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            as: "day",
            in: {
              $cond: [
                        { $in: ["$$day", "$data.dayOfWeek"] },
                         { $arrayElemAt: ["$data.clientSubmissionCount", { $indexOfArray: ["$data.dayOfWeek", "$$day"] }] },
                            0
                         ]
            }
          }
        }
      }
    },
  ];
  aggregateweekQuery1 =[
    {
      $match: {
        created_by:new mongoose.Types.ObjectId(req.user?._id),
  
        createdAt: { $gte: start, $lte: end },
        status: "Client screen Reject"
      }
    },
    {
      $group: {
        _id: { $dayOfWeek: "$createdAt" },
        clientSubmissionCount: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: null,
        data: {
          $push: {
            dayOfWeek: {
              $switch: {
                branches: [
                  { case: { $eq: ["$_id", 1] }, then: "Sun" },
                  { case: { $eq: ["$_id", 2] }, then: "Mon" },
                  { case: { $eq: ["$_id", 3] }, then: "Tue" },
                  { case: { $eq: ["$_id", 4] }, then: "Wed" },
                  { case: { $eq: ["$_id", 5] }, then: "Thu" },
                  { case: { $eq: ["$_id", 6] }, then: "Fri" },
                  { case: { $eq: ["$_id", 7] }, then: "Sat" }
                ],
                default: ""
              }
            },
            clientSubmissionCount: "$clientSubmissionCount"
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        data: {
          $map: {
            input: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            as: "day",
            in: {
              $cond: [
                        { $in: ["$$day", "$data.dayOfWeek"] },
                         { $arrayElemAt: ["$data.clientSubmissionCount", { $indexOfArray: ["$data.dayOfWeek", "$$day"] }] },
                            0
                         ]
            }
          }
        }
      }
    },
    // {
    //   $project: {
    //     _id: 0,
    //     data: {
    //       $map: {
    //         input: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    //         as: "day",
    //         in: {
    //           $cond: [
    //             { $in: ["$$day", "$data.dayOfWeek"] },
    //             { $arrayElemAt: ["$data.clientSubmissionCount", { $indexOfArray: ["$data.dayOfWeek", "$$day"] }] },
    //             0
    //           ]
    //         }
    //       }
    //     }
    //   }
    // }
     
    // {
    //   $unwind: "$data"
    // },
    // {
    //   $replaceRoot: { newRoot: "$data" }
    // }
  ];
  
  aggregateweekQuery2 = [ {
    $match: {
      created_by:new mongoose.Types.ObjectId(req.user?._id),

      createdAt: { $gte: start, $lte: end },
      status: "L1 schedule"
    }
  },
  {
    $group: {
      _id: { $dayOfWeek: "$createdAt" },
      clientSubmissionCount: { $sum: 1 }
    }
  },
  {
    $group: {
      _id: null,
      data: {
        $push: {
          dayOfWeek: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "Sun" },
                { case: { $eq: ["$_id", 2] }, then: "Mon" },
                { case: { $eq: ["$_id", 3] }, then: "Tue" },
                { case: { $eq: ["$_id", 4] }, then: "Wed" },
                { case: { $eq: ["$_id", 5] }, then: "Thu" },
                { case: { $eq: ["$_id", 6] }, then: "Fri" },
                { case: { $eq: ["$_id", 7] }, then: "Sat" }
              ],
              default: ""
            }
          },
          clientSubmissionCount: "$clientSubmissionCount"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      data: {
        $map: {
          input: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          as: "day",
          in: {
            $cond: [
                      { $in: ["$$day", "$data.dayOfWeek"] },
                       { $arrayElemAt: ["$data.clientSubmissionCount", { $indexOfArray: ["$data.dayOfWeek", "$$day"] }] },
                          0
                       ]
          }
        }
      }
    }
  },
  // {
  //   $project: {
  //     _id: 0,
  //     data: {
  //       $map: {
  //         input: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  //         as: "day",
  //         in: {
  //           $cond: [
  //             { $in: ["$$day", "$data.dayOfWeek"] },
  //             { $arrayElemAt: ["$data.clientSubmissionCount", { $indexOfArray: ["$data.dayOfWeek", "$$day"] }] },
  //             0
  //           ]
  //         }
  //       }
  //     }
  //   }
  // }
   
  // {
  //   $unwind: "$data"
  // },
  // {
  //   $replaceRoot: { newRoot: "$data" }
  // }
];
aggregateweekQuery3  = [
  {
    $match: {
      created_by:new mongoose.Types.ObjectId(req.user?._id),

      createdAt: { $gte: start, $lte: end },
      status: "L1Noshow"
    }
  },
  {
    $group: {
      _id: { $dayOfWeek: "$createdAt" },
      clientSubmissionCount: { $sum: 1 }
    }
  },
  {
    $group: {
      _id: null,
      data: {
        $push: {
          dayOfWeek: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "Sun" },
                { case: { $eq: ["$_id", 2] }, then: "Mon" },
                { case: { $eq: ["$_id", 3] }, then: "Tue" },
                { case: { $eq: ["$_id", 4] }, then: "Wed" },
                { case: { $eq: ["$_id", 5] }, then: "Thu" },
                { case: { $eq: ["$_id", 6] }, then: "Fri" },
                { case: { $eq: ["$_id", 7] }, then: "Sat" }
              ],
              default: ""
            }
          },
          clientSubmissionCount: "$clientSubmissionCount"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      data: {
        $map: {
          input: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          as: "day",
          in: {
            $cond: [
                      { $in: ["$$day", "$data.dayOfWeek"] },
                       { $arrayElemAt: ["$data.clientSubmissionCount", { $indexOfArray: ["$data.dayOfWeek", "$$day"] }] },
                          0
                       ]
          }
        }
      }
    }
  },
  // {
  //   $project: {
  //     _id: 0,
  //     data: {
  //       $map: {
  //         input: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  //         as: "day",
  //         in: {
  //           $cond: [
  //             { $in: ["$$day", "$data.dayOfWeek"] },
  //             { $arrayElemAt: ["$data.clientSubmissionCount", { $indexOfArray: ["$data.dayOfWeek", "$$day"] }] },
  //             0
  //           ]
  //         }
  //       }
  //     }
  //   }
  // }
   
  // {
  //   $unwind: "$data"
  // },
  // {
  //   $replaceRoot: { newRoot: "$data" }
  // }
];
aggregateweekQuery4 = 
[
  {
    $match: {
      created_by:new mongoose.Types.ObjectId(req.user?._id),

      createdAt: { $gte: start, $lte: end },
      status: "Joined"
    }
  },
  {
    $group: {
      _id: { $dayOfWeek: "$createdAt" },
      clientSubmissionCount: { $sum: 1 }
    }
  },
  {
    $group: {
      _id: null,
      data: {
        $push: {
          dayOfWeek: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "Sun" },
                { case: { $eq: ["$_id", 2] }, then: "Mon" },
                { case: { $eq: ["$_id", 3] }, then: "Tue" },
                { case: { $eq: ["$_id", 4] }, then: "Wed" },
                { case: { $eq: ["$_id", 5] }, then: "Thu" },
                { case: { $eq: ["$_id", 6] }, then: "Fri" },
                { case: { $eq: ["$_id", 7] }, then: "Sat" }
              ],
              default: ""
            }
          },
          clientSubmissionCount: "$clientSubmissionCount"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      data: {
        $map: {
          input: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          as: "day",
          in: {
            $cond: [
                      { $in: ["$$day", "$data.dayOfWeek"] },
                       { $arrayElemAt: ["$data.clientSubmissionCount", { $indexOfArray: ["$data.dayOfWeek", "$$day"] }] },
                          0
                       ]
          }
        }
      }
    }
  },
  // {
  //   $project: {
  //     _id: 0,
  //     data: {
  //       $map: {
  //         input: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  //         as: "day",
  //         in: {
  //           $cond: [
  //             { $in: ["$$day", "$data.dayOfWeek"] },
  //             { $arrayElemAt: ["$data.clientSubmissionCount", { $indexOfArray: ["$data.dayOfWeek", "$$day"] }] },
  //             0
  //           ]
  //         }
  //       }
  //     }
  //   }
  // }
   
  // {
  //   $unwind: "$data"
  // },
  // {
  //   $replaceRoot: { newRoot: "$data" }
  // }
];

}





  


   const ClientSubmission =await totallogs.aggregate(aggregateweekQuery)
   const OverAllsubmission =await totallogs.aggregate(Allsubmissions)
  //  const senddata =await totallogs.aggregate()
   const ClientScreenReject =await totallogs.aggregate(aggregateweekQuery1)
   const Interview =await totallogs.aggregate(aggregateweekQuery2)
   const L1noshow =await totallogs.aggregate(aggregateweekQuery3)
   const Joined =await totallogs.aggregate(aggregateweekQuery4)
   const TeamClientSubmssion =await totallogs.aggregate(AllsubmissionsTeam)
 
  
 
   try {
     success(res, 200, true, "Get Successfully",{OverAllsubmission,ClientSubmission,ClientScreenReject,TeamClientSubmssion,Interview,L1noshow,Joined});
     }
    catch (error) {
     throw new Error(error);
   }
 }))
 router.get('/clientSubmissionCount', authAdmin, asyncHandler(async (req, res) => {

let AllsubmissionsTeam= [
  {
    $match: {
      createdAt: { 
        $gte: new Date(new Date().getFullYear(), 0, 1), // Start of the current year
        $lte: new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999), // End of the current year
      },
      status: "Client submission"
    }
  },
  {
    $group: {
      _id: { $month: "$createdAt" },
      monthSubmissionCount: { $sum: 1 }
    }
  },
  {
    $sort: { "_id": 1 }
  },
  {
    $group: {
      _id: null,
      data: {
        $push: {
          dayOfWeek: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "Jan" },
                { case: { $eq: ["$_id", 2] }, then: "Feb" },
                { case: { $eq: ["$_id", 3] }, then: "Mar" },
                { case: { $eq: ["$_id", 4] }, then: "Apr" },
                { case: { $eq: ["$_id", 5] }, then: "May" },
                { case: { $eq: ["$_id", 6] }, then: "Jun" },
                { case: { $eq: ["$_id", 7] }, then: "Jul" },
                { case: { $eq: ["$_id", 8] }, then: "Aug" },
                { case: { $eq: ["$_id", 9] }, then: "Sep" },
                { case: { $eq: ["$_id", 10] }, then: "Oct" },
                { case: { $eq: ["$_id", 11] }, then: "Nov" },
                { case: { $eq: ["$_id", 12] }, then: "Dec" }
              ],
              default: "Unknown"
            }
          },
          clientSubmissionCount: "$monthSubmissionCount"
        }
      }
    }
  },

  {
    $project: {
      _id: 0,
      data: {
        $map: {
          input: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          as: "day",
          in: {
            $cond: [
                      { $in: ["$$day", "$data.dayOfWeek"] },
                       { $arrayElemAt: ["$data.clientSubmissionCount", { $indexOfArray: ["$data.dayOfWeek", "$$day"] }] },
                          0
                       ]
          }
        }
      }
    }
  },
];


let AllsubmissionsYours= [
  {
    $match: {
      created_by:new mongoose.Types.ObjectId(req.user._id),
      createdAt: { 
        $gte: new Date(new Date().getFullYear(), 0, 1), // Start of the current year
        $lte: new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999), // End of the current year
      },
      status: "Client submission"
    }
  },
  {
    $group: {
      _id: { $month: "$createdAt" },
      monthSubmissionCount: { $sum: 1 }
    }
  },
  {
    $sort: { "_id": 1 }
  },
  {
    $group: {
      _id: null,
      data: {
        $push: {
          dayOfWeek: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "Jan" },
                { case: { $eq: ["$_id", 2] }, then: "Feb" },
                { case: { $eq: ["$_id", 3] }, then: "Mar" },
                { case: { $eq: ["$_id", 4] }, then: "Apr" },
                { case: { $eq: ["$_id", 5] }, then: "May" },
                { case: { $eq: ["$_id", 6] }, then: "Jun" },
                { case: { $eq: ["$_id", 7] }, then: "Jul" },
                { case: { $eq: ["$_id", 8] }, then: "Aug" },
                { case: { $eq: ["$_id", 9] }, then: "Sep" },
                { case: { $eq: ["$_id", 10] }, then: "Oct" },
                { case: { $eq: ["$_id", 11] }, then: "Nov" },
                { case: { $eq: ["$_id", 12] }, then: "Dec" }
              ],
              default: "Unknown"
            }
          },
          clientSubmissionCount: "$monthSubmissionCount"
        }
      }
    }
  },

  {
    $project: {
      _id: 0,
      data: {
        $map: {
          input: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          as: "day",
          in: {
            $cond: [
                      { $in: ["$$day", "$data.dayOfWeek"] },
                       { $arrayElemAt: ["$data.clientSubmissionCount", { $indexOfArray: ["$data.dayOfWeek", "$$day"] }] },
                          0
                       ]
          }
        }
      }
    }
  },
];


  


   const yours =await totallogs.aggregate(AllsubmissionsYours)

   const team =await totallogs.aggregate(AllsubmissionsTeam)
 
  
 
   try {
     success(res, 200, true, "Get Successfully",{team,yours});
     }
    catch (error) {
     throw new Error(error);
   }
 }))


router.get('/DatabaseAdded/:query', asyncHandler(async (req, res) => {
  let query=req.params.query;
  let aggregateweekQuery=[]
  if(query =="Week"){
    // const startOfWeek = new Date();
    // startOfWeek.setHours(0, 0, 0, 0);
    // startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    // const endOfWeek = new Date();
    // endOfWeek.setHours(23, 59, 59, 999);
    // endOfWeek.setDate(startOfWeek.getDate() + 6 - startOfWeek.getDay());
     aggregateweekQuery = [
      {
        $match: {
          ...(req.query.hr ?{_id:new mongoose.Types.ObjectId(req.query.hr)}:{role: "HR"}) ,
        },
      },
      {
        $lookup: {
          from: "totallogs",
          let: { hr_id: "$_id" },
          pipeline: [
            {
              $match: {
                ...(req.query.no_of_days == 1 ?
                  {$expr: {
                    $and: [
                      { $eq: ["$created_by", "$$hr_id"] },
                      { $eq: [{ $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, req.query.startOfWeek] } // Assuming req.query.today contains today's date in the format "YYYY-MM-DD"
                    ]
                  }}
                  :
                  {$expr: { $eq: ["$created_by", "$$hr_id"] },
                  // Assuming your totallogs documents have a 'date' field
                  createdAt: { $gte: new Date(req.query.startOfWeek), $lte: new Date(req.query.endOfWeek) }

                }
                  
                  
                  )
              }
            }
          ],
          as: "totallogs",
        },
      },
      {
        $unwind: "$totallogs", // Unwind the array for easier grouping
      },
      {
        $group: {
          _id: {
            _id: "$_id",
            name: "$name",
          },
          Databaseadd: {
            $sum: { $cond: [{ $eq: ["$totallogs.status", "DatabaseAdd"] }, 1, 0] },
          },
      
        },
      },
      {
        $project: {
          _id:0,
           data8:{
            x:"$_id.name",
            y:"$Databaseadd"
           },
          
          //    "$L1Noshow","$clientSubmission","$clientScreenReject","$Interview","$Offered","$joined",
          // ],
          // _id: "$_id._id",
          // name: "$_id.name",
          // Offered: 1,
          // clientSubmission: 1,
          // Interview: 1,
          // joined: 1,
        },
      },
    ];
 ;}
 if(query =="Month"){
  const startOfMonth = new Date();
  startOfMonth.setHours(0, 0, 0, 0);
  startOfMonth.setDate(1);
  
  const endOfMonth = new Date();
  endOfMonth.setHours(23, 59, 59, 999);
  endOfMonth.setMonth(startOfMonth.getMonth() + 1);
  endOfMonth.setDate(0);
   aggregateweekQuery = [
   

    {
      $match: {
        ...(req.query.hr ?{_id:new mongoose.Types.ObjectId(req.query.hr)}:{role: "HR"}) ,
       
      },
    },
    {
      $sort: { createdAt: -1 } // Sort by createdAt in descending order
    },
    {
      $lookup: {
        from: "totallogs",
        let: { hr_id: "$_id" },
        pipeline: [
          { $sort: { createdAt: -1 } },
          {
            $match: {
              

              $expr: { $eq: ["$created_by", "$$hr_id"] },
              // Assuming your totallogs documents have a 'date' field
              createdAt: { $gte: startOfMonth, $lte: endOfMonth }
            }
          }
        ],
        as: "totallogs",
      },
    },
    {
      $unwind: "$totallogs", // Unwind the array for easier grouping
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          name: "$name",
        },
        Databaseadd: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "DatabaseAdd"] }, 1, 0] },
        },
        createdAt: { $first: "$totallogs.createdAt" },

        
      },
    },
    {
      $project: {
        _id:0,
         
         data8:{
          x:"$_id.name",
          y:"$Databaseadd",
           text: "$Databaseadd"
         },
        
        //    "$L1Noshow","$clientSubmission","$clientScreenReject","$Interview","$Offered","$joined",
        // ],
        // _id: "$_id._id",
        // name: "$_id.name",
        // Offered: 1,
        // clientSubmission: 1,
        // Interview: 1,
        // joined: 1,
      },
    },
  ];
;}




  let dataWeek = await admin.aggregate(aggregateweekQuery);
    let DataBaseadd=[]
  

  // Dynamically merge all data1 arrays in each object

  const mergedData1 = dataWeek.map((item, i) => {
    let r=0
    switch (i) {
      case 0:
         r="40"
        break;
        case 1:
          r="80"
         break;  
         case 2:
         r="60"
        break;  c
        case 3:
        r="50"
       break;  
       case 4:
       r="75"
      break;
    
      default:
        r="50"
        break;
    }
    DataBaseadd.push({ ...item.data8, r });
  });

  // Sort the array based on the 'r' property
  DataBaseadd.sort((a, b) => parseInt(a.r) - parseInt(b.r));
  let senddata={
    DataBaseadd

  }

  try {
    success(res, 200, true, "Get Successfully",senddata);
    }
   catch (error) {
    throw new Error(error);
  }
}))


router.get('/clientreport/:query',authAdmin, asyncHandler(async (req, res) => {
   console.log("req",req.query);
   let query=req.params.query
  let aggregateweekQuery=[]
    if(query =="Week"){
      // const startOfWeek = new Date(); 
      // startOfWeek.setHours(0, 0, 0, 0);
      // startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
   console.log("reqstart",req.query.endOfWeek);
      
      // const endOfWeek = new Date();
      // endOfWeek.setHours(23, 59, 59, 999);
      // endOfWeek.setDate(startOfWeek.getDate() + 6 - startOfWeek.getDay());

   aggregateweekQuery = [
    {
      $match: {
        company_id: req.user?.company_id?new mongoose.Types.ObjectId(req.user?.company_id):null,
        

        ...(req.query.clientselect && {_id:new mongoose.Types.ObjectId(req.query.clientselect)}) ,
       
      },
    },
   
    {
      $lookup: {
        from: "totallogs",
        let: { client_id: "$_id" },
      pipeline: [
        {
          $match: {
            ...(req.query.no_of_days == 1 ?
              {$expr: {
                $and: [
                  { $eq: ["$client_id", "$$client_id"] },
                
                  { $eq: [{ $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, req.query.startOfWeek] } // Assuming req.query.today contains today's date in the format "YYYY-MM-DD"
                ]
              }}
              :
              {$expr: { $eq: ["$client_id", "$$client_id"] },
              // Assuming your totallogs documents have a 'date' field
              createdAt: { $gte: new Date(req.query.startOfWeek), $lte: new Date(req.query.endOfWeek) }

            }
              
              
              )
          }
        }
      ],
        as: "totallogs",
      },
    },
    {
      $unwind: "$totallogs", // Unwind the array for easier grouping
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          name: "$name",
        },
        OverallSubmission: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "Submitted"] }, 1, 0] },
        },
        L1Noshow: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "L1 No show"] }, 1, 0] },
        },
        Offered: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "Offered"] }, 1, 0] },
        },
        clientScreenReject: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "Client screen Reject"] }, 1, 0] },
        },
        clientSubmission: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "Client submission"] }, 1, 0] },
        },
        Interview: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "L1 schedule"] }, 1, 0] },
        },
        joined: {
          $sum: { $cond: [{ $eq: ["$totallogs.status", "Joined"] }, 1, 0] },
        },
      },
    },
    {
      $sort: {
        clientSubmission: -1, // Sort by clientSubmission count in descending order
      }
    },
    {
      $project: {
        _id:0,
         data1:{
          x:"$_id.name",
          y:"$OverallSubmission"
         },
         data2:{
          x:"$_id.name",
          y:"$clientSubmission"
         },
          data3:{
          x:"$_id.name",
          y:"$clientScreenReject"
         }, 
         data4:{
          x:"$_id.name",
          y:"$Interview"
         }, 
         data5:{
          x:"$_id.name",
          y:"$L1Noshow"
         },
         data6:{
          x:"$_id.name",
          y:"$Offered"
         },
          data7:{
          x:"$_id.name",
          y:"$joined"
         },
        
        //    "$L1Noshow","$clientSubmission","$clientScreenReject","$Interview","$Offered","$joined",
        // ],
        // _id: "$_id._id",
        // name: "$_id.name",
        // Offered: 1,
        // clientSubmission: 1,
        // Interview: 1,
        // joined: 1,
      },
    },
  ];}
  if(query =="Month"){
    console.log("-----Working month")
    const startOfMonth = new Date();
    startOfMonth.setHours(0, 0, 0, 0);
    startOfMonth.setDate(1);
    
    const endOfMonth = new Date();
    endOfMonth.setHours(23, 59, 59, 999);
    endOfMonth.setMonth(startOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);

 aggregateweekQuery = [
 
  {
    $match: {
      company_id: req.user?.company_id?new mongoose.Types.ObjectId(req.user?.company_id):null,
      

      ...(req.query.clientselect && {_id:new mongoose.Types.ObjectId(req.query.clientselect)}) ,
     
    },
  },
  {
    $lookup: {
      from: "totallogs",
      let: { client_id: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$client_id", "$$client_id"]},
             ...req.query.recruiter && {
        created_by:new mongoose.Types.ObjectId(req.user?._id)   ,   

             },
            // Assuming your totallogs documents have a 'date' field
            createdAt: { $gte: startOfMonth, $lte: endOfMonth }
          }
        }
      ],
      as: "totallogs",
    },
  },
  {
    $unwind: "$totallogs", // Unwind the array for easier grouping
  },
  {
    $group: {
      _id: {
        _id: "$_id",
        name: "$name",
      },
   
      L1Noshow: {
        $sum: { $cond: [{ $eq: ["$totallogs.status", "L1 No show"] }, 1, 0] },
      },
      Offered: {
        $sum: { $cond: [{ $eq: ["$totallogs.status", "Offered"] }, 1, 0] },
      },
      clientScreenReject: {
        $sum: { $cond: [{ $eq: ["$totallogs.status", "Client screen Reject"] }, 1, 0] },
      },
      clientSubmission: {
        $sum: { $cond: [{ $eq: ["$totallogs.status", "Client submission"] }, 1, 0] },
      },
      Interview: {
        $sum: { $cond: [{ $eq: ["$totallogs.status", "L1 schedule"] }, 1, 0] },
      },
      joined: {
        $sum: { $cond: [{ $eq: ["$totallogs.status", "Joined"] }, 1, 0] },
      },
    },
  },
  {
    $sort: {
      clientSubmission: -1, // Sort by clientSubmission count in descending order
    }
  },
  {
    $project: {
      _id:0,
   
       data2:{
        x:"$_id.name",
        y:"$clientSubmission"
       },
        data3:{
        x:"$_id.name",
        y:"$clientScreenReject"
       }, 
       data4:{
        x:"$_id.name",
        y:"$Interview"
       }, 
       data5:{
        x:"$_id.name",
        y:"$L1Noshow"
       },
       data6:{
        x:"$_id.name",
        y:"$Offered"
       },
        data7:{
        x:"$_id.name",
        y:"$joined"
       },
      
      //    "$L1Noshow","$clientSubmission","$clientScreenReject","$Interview","$Offered","$joined",
      // ],
      // _id: "$_id._id",
      // name: "$_id.name",
      // Offered: 1,
      // clientSubmission: 1,
      // Interview: 1,
      // joined: 1,
    },
  },
];}
if(query =="Year"){
  console.log("-----Working Year")
  const startOfYear = new Date();
startOfYear.setHours(0, 0, 0, 0);
startOfYear.setMonth(0, 1); // Set to the first day of the current year

const endOfYear = new Date();
endOfYear.setHours(23, 59, 59, 999);
endOfYear.setMonth(11, 31); 

aggregateweekQuery = [

{
  $lookup: {
    from: "totallogs",
    let: { client_id: "$_id" },
    pipeline: [
      {
        $match: {
          $expr: { $eq: ["$client_id", "$$client_id"] },
          // Assuming your totallogs documents have a 'date' field
        created_by:new mongoose.Types.ObjectId(req.user?._id)   ,   
        createdAt: { $gte: startOfYear, $lte: endOfYear }
        }
      }
    ],
    as: "totallogs",
  },
},
{
  $unwind: "$totallogs", // Unwind the array for easier grouping
},
{
  $group: {
    _id: {
      _id: "$_id",
      name: "$name",
    },
    OverallSubmission: {
      $sum: { $cond: [{ $eq: ["$totallogs.status", "Submitted"] }, 1, 0] },
    },
    L1Noshow: {
      $sum: { $cond: [{ $eq: ["$totallogs.status", "L1Noshow"] }, 1, 0] },
    },
    Offered: {
      $sum: { $cond: [{ $eq: ["$totallogs.status", "Offered"] }, 1, 0] },
    },
    clientScreenReject: {
      $sum: { $cond: [{ $eq: ["$totallogs.status", "Client screen Reject"] }, 1, 0] },
    },
    clientSubmission: {
      $sum: { $cond: [{ $eq: ["$totallogs.status", "Client submission"] }, 1, 0] },
    },
    Interview: {
      $sum: { $cond: [{ $eq: ["$totallogs.status", "L1 schedule"] }, 1, 0] },
    },
    joined: {
      $sum: { $cond: [{ $eq: ["$totallogs.status", "Joined"] }, 1, 0] },
    },
  },
},
{
  $sort: {
    clientSubmission: -1, // Sort by clientSubmission count in descending order
  }
},
{
  $project: {
    _id:0,
     data1:{
      x:"$_id.name",
      y:"$OverallSubmission"
     },
     data2:{
      x:"$_id.name",
      y:"$clientSubmission"
     },
      data3:{
      x:"$_id.name",
      y:"$clientScreenReject"
     }, 
     data4:{
      x:"$_id.name",
      y:"$Interview"
     }, 
     data5:{
      x:"$_id.name",
      y:"$L1Noshow"
     },
     data6:{
      x:"$_id.name",
      y:"$Offered"
     },
      data7:{
      x:"$_id.name",
      y:"$joined"
     },
    
    //    "$L1Noshow","$clientSubmission","$clientScreenReject","$Interview","$Offered","$joined",
    // ],
    // _id: "$_id._id",
    // name: "$_id.name",
    // Offered: 1,
    // clientSubmission: 1,
    // Interview: 1,
    // joined: 1,
  },
},
];}

let dataWeek = await clients.aggregate(aggregateweekQuery);
 
 
let Allsubmissions=[]
let  ClientSubmission=[]
let  ClientScreenReject=[]
let Interview=[]
let L1noshow=[]
let Offered=[]
let Joined=[]
 

const mergedData1 = dataWeek?.map((item,i) => {
  Allsubmissions=[...Allsubmissions,item.data2.x]
  ClientSubmission=[...ClientSubmission,item.data2?.y]
  ClientScreenReject=[...ClientScreenReject,item.data3?.y]
  Interview=[...Interview,item.data4?.y]
  L1noshow=[...L1noshow,item.data5?.y]
  Offered=[...Offered,item.data6?.y]
  Joined=[...Joined,item.data7?.y]
//  dataWeek?.map((item)=>{
//   senddata.push(item.data)
//  })
})
// Dynamically merge all data1 arrays in each object

let senddata={
label:Allsubmissions,
ClientSubmission,
ClientScreenReject,
Interview,
L1noshow,
Offered,
Joined,

}


  try {
    success(res, 200, true, "Get Successfully", senddata);
    }
   catch (error) {
    throw new Error(error);
  }
}))

router.get('/pbfClientChart',authAdmin, asyncHandler(async (req, res) => {
  console.log("req",req.query);
  let query=req.query.time_frame
 let aggregateweekQuery=[]
  let startDateFilter,endDateFilter;
  
  switch (req.query.time_frame) {
    case 'Year':
      startDateFilter = new Date(new Date().getFullYear(), 0, 1); // Start of the current year
      endDateFilter = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999); // End of the current year
      break;
    case 'Month':
      const currentDate = new Date();
      startDateFilter = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Start of the current month
      endDateFilter = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999); // End of the current month
      break;
    case 'Week':
      const today = new Date();
      const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Start of the current week (Monday)
      firstDayOfWeek.setHours(0, 0, 0, 0); // Set time to start of the day
  
      const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7)); // End of the current week (Sunday)
      lastDayOfWeek.setHours(23, 59, 59, 999); // Set time to end of the day
  
      startDateFilter = firstDayOfWeek;
      endDateFilter = lastDayOfWeek;
      break;
    case 'Custom':
      if (req.query.range === "Monthly Wise") {
        const [year, month] = req.query.date.split('-').map(Number);
        startDateFilter = new Date(year, month - 1, 1); // Start of the specified month
        endDateFilter = new Date(year, month, 0, 23, 59, 59, 999); // End of the specified month
      } else if (req.query.range === "Weekly Wise" && req.query.date) {
        const [year, weekStr] = req.query.date.split('-');
        const week = parseInt(weekStr.replace(/[^0-9]/g, ''), 10); // Extract week number
  
        const firstDayOfYear = new Date(year, 0, 1);
        const daysOffset = (week - 1) * 7; // Calculate start of the week
        const dayOfWeek = firstDayOfYear.getDay();
        const offsetToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // Adjust to Monday if the year starts not on Monday
  
        startDateFilter = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + daysOffset - offsetToMonday));
        startDateFilter.setHours(0, 0, 0, 0); // Set to the start of the day
  
        endDateFilter = new Date(startDateFilter);
        endDateFilter.setDate(startDateFilter.getDate() + 6); // End of the week (Sunday)
        endDateFilter.setHours(23, 59, 59, 999); // Set to the end of the day
      } else if (req.query.range === "Yearly Wise" && req.query.date) {
        const year = parseInt(req.query.date, 10);
        startDateFilter = new Date(year, 0, 1); // Start of the specified year
        endDateFilter = new Date(year, 11, 31, 23, 59, 59, 999); // End of the specified year
      } else if (req.query.range === "Quarter Wise" && req.query.date) {
        const [year, quarter] = req.query.date.split('-Q');
        const parsedYear = parseInt(year, 10);
        const parsedQuarter = parseInt(quarter, 10);
  
        switch (parsedQuarter) {
          case 1:
            startDateFilter = new Date(parsedYear, 0, 1); // Start of Q1
            endDateFilter = new Date(parsedYear, 2, 31, 23, 59, 59, 999); // End of Q1
            break;
          case 2:
            startDateFilter = new Date(parsedYear, 3, 1); // Start of Q2
            endDateFilter = new Date(parsedYear, 5, 30, 23, 59, 59, 999); // End of Q2
            break;
          case 3:
            startDateFilter = new Date(parsedYear, 6, 1); // Start of Q3
            endDateFilter = new Date(parsedYear, 8, 30, 23, 59, 59, 999); // End of Q3
            break;
          case 4:
            startDateFilter = new Date(parsedYear, 9, 1); // Start of Q4
            endDateFilter = new Date(parsedYear, 11, 31, 23, 59, 59, 999); // End of Q4
            break;
          default:
            return res.status(400).json({ success: false, message: "Invalid quarter specified" });
        }
      } else {
        startDateFilter = new Date(req.query.startDate); // Custom start date
        endDateFilter = new Date(req.query.endDate); // Custom end date
      }
      break;
    default:
      return res.status(400).json({ success: false, message: "Invalid filter type" });
  }
  
  
   if(query =="Week"){
     // const startOfWeek = new Date(); 
     // startOfWeek.setHours(0, 0, 0, 0);
     // startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  console.log("reqstart",req.query.endOfWeek);
     
     // const endOfWeek = new Date();
     // endOfWeek.setHours(23, 59, 59, 999);
     // endOfWeek.setDate(startOfWeek.getDate() + 6 - startOfWeek.getDay());

  aggregateweekQuery = [
   {
     $match: {
       company_id: req.user?.company_id?new mongoose.Types.ObjectId(req.user?.company_id):null,
       

       ...(req.query.clientselect && {_id:new mongoose.Types.ObjectId(req.query.clientselect)}) ,
      
     },
   },
  
   {
     $lookup: {
       from: "totallogs",
       let: { client_id: "$_id" },
     pipeline: [
       {
         $match: {
           ...(req.query.no_of_days == 1 ?
             {$expr: {
               $and: [
                 { $eq: ["$client_id", "$$client_id"] },
               
                 { $eq: [{ $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, req.query.startOfWeek] } // Assuming req.query.today contains today's date in the format "YYYY-MM-DD"
               ]
             }}
             :
             {$expr: { $eq: ["$client_id", "$$client_id"] },
             // Assuming your totallogs documents have a 'date' field
             createdAt: { $gte: new Date(startDateFilter), $lte: new Date(endDateFilter) }

           }
             
             
             )
         }
       }
     ],
       as: "totallogs",
     },
   },
   {
     $unwind: "$totallogs", // Unwind the array for easier grouping
   },
   {
     $group: {
       _id: {
         _id: "$_id",
         name: "$name",
       },
       OverallSubmission: {
         $sum: { $cond: [{ $eq: ["$totallogs.status", "Submitted"] }, 1, 0] },
       },
       L1Noshow: {
         $sum: { $cond: [{ $eq: ["$totallogs.status", "L1 No show"] }, 1, 0] },
       },
       Offered: {
         $sum: { $cond: [{ $eq: ["$totallogs.status", "Offered"] }, 1, 0] },
       },
       clientScreenReject: {
         $sum: { $cond: [{ $eq: ["$totallogs.status", "Client screen Reject"] }, 1, 0] },
       },
       clientSubmission: {
         $sum: { $cond: [{ $eq: ["$totallogs.status", "Client submission"] }, 1, 0] },
       },
       Interview: {
         $sum: { $cond: [{ $eq: ["$totallogs.status", "L1 schedule"] }, 1, 0] },
       },
       joined: {
         $sum: { $cond: [{ $eq: ["$totallogs.status", "Joined"] }, 1, 0] },
       },
     },

   },
   {
    $sort: {
      clientSubmission: -1, // Sort by clientSubmission count in descending order
    }
  },
   {
     $project: {
       _id:0,
        data1:{
         x:"$_id.name",
         y:"$OverallSubmission"
        },
        data2:{
         x:"$_id.name",
         y:"$clientSubmission"
        },
         data3:{
         x:"$_id.name",
         y:"$clientScreenReject"
        }, 
        data4:{
         x:"$_id.name",
         y:"$Interview"
        }, 
        data5:{
         x:"$_id.name",
         y:"$L1Noshow"
        },
        data6:{
         x:"$_id.name",
         y:"$Offered"
        },
         data7:{
         x:"$_id.name",
         y:"$joined"
        },
       
       //    "$L1Noshow","$clientSubmission","$clientScreenReject","$Interview","$Offered","$joined",
       // ],
       // _id: "$_id._id",
       // name: "$_id.name",
       // Offered: 1,
       // clientSubmission: 1,
       // Interview: 1,
       // joined: 1,
     },
   },
  
 ];}
 if(query =="Month"){
   console.log("-----Working month")
   const startOfMonth = new Date();
   startOfMonth.setHours(0, 0, 0, 0);
   startOfMonth.setDate(1);
   
   const endOfMonth = new Date();
   endOfMonth.setHours(23, 59, 59, 999);
   endOfMonth.setMonth(startOfMonth.getMonth() + 1);
   endOfMonth.setDate(0);

aggregateweekQuery = [

 {
   $match: {
     company_id: req.user?.company_id?new mongoose.Types.ObjectId(req.user?.company_id):null,
     

     ...(req.query.clientselect && {_id:new mongoose.Types.ObjectId(req.query.clientselect)}) ,
    
   },
 },
 {
   $lookup: {
     from: "totallogs",
     let: { client_id: "$_id" },
     pipeline: [
       {
         $match: {
           $expr: { $eq: ["$client_id", "$$client_id"]},
            ...req.query.recruiter && {
        

            },
           // Assuming your totallogs documents have a 'date' field
           createdAt: { $gte: startDateFilter, $lte: endDateFilter }
         }
       }
     ],
     as: "totallogs",
   },
 },
 {
   $unwind: "$totallogs", // Unwind the array for easier grouping
 },
 {
   $group: {
     _id: {
       _id: "$_id",
       name: "$name",
     },
  
     L1Noshow: {
       $sum: { $cond: [{ $eq: ["$totallogs.status", "L1 No show"] }, 1, 0] },
     },
     Offered: {
       $sum: { $cond: [{ $eq: ["$totallogs.status", "Offered"] }, 1, 0] },
     },
     clientScreenReject: {
       $sum: { $cond: [{ $eq: ["$totallogs.status", "Client screen Reject"] }, 1, 0] },
     },
     clientSubmission: {
       $sum: { $cond: [{ $eq: ["$totallogs.status", "Client submission"] }, 1, 0] },
     },
     Interview: {
       $sum: { $cond: [{ $eq: ["$totallogs.status", "L1 schedule"] }, 1, 0] },
     },
     joined: {
       $sum: { $cond: [{ $eq: ["$totallogs.status", "Joined"] }, 1, 0] },
     },
   },
 },
 {
  $sort: {
    clientSubmission: -1, // Sort by clientSubmission count in descending order
  }
},
 {
   $project: {
     _id:0,
  
      data2:{
       x:"$_id.name",
       y:"$clientSubmission"
      },
       data3:{
       x:"$_id.name",
       y:"$clientScreenReject"
      }, 
      data4:{
       x:"$_id.name",
       y:"$Interview"
      }, 
      data5:{
       x:"$_id.name",
       y:"$L1Noshow"
      },
      data6:{
       x:"$_id.name",
       y:"$Offered"
      },
       data7:{
       x:"$_id.name",
       y:"$joined"
      },
     
     //    "$L1Noshow","$clientSubmission","$clientScreenReject","$Interview","$Offered","$joined",
     // ],
     // _id: "$_id._id",
     // name: "$_id.name",
     // Offered: 1,
     // clientSubmission: 1,
     // Interview: 1,
     // joined: 1,
   },
 },
];}
if(query =="Year"){
 console.log("-----Working Year")
 const startOfYear = new Date();
startOfYear.setHours(0, 0, 0, 0);
startOfYear.setMonth(0, 1); // Set to the first day of the current year

const endOfYear = new Date();
endOfYear.setHours(23, 59, 59, 999);
endOfYear.setMonth(11, 31); 

aggregateweekQuery = [

  {
   $lookup: {
     from: "totallogs",
     let: { client_id: "$_id" },
     pipeline: [
       {
         $match: {
           $expr: { $eq: ["$client_id", "$$client_id"] },
           // Assuming your totallogs documents have a 'date' field
          
         createdAt: { $gte: startDateFilter, $lte: endDateFilter }
         }
       }
     ],
     as: "totallogs",
   },
  },
  {
   $unwind: "$totallogs", // Unwind the array for easier grouping
  },
  {
   $group: {
     _id: {
       _id: "$_id",
       name: "$name",
     },
     OverallSubmission: {
       $sum: { $cond: [{ $eq: ["$totallogs.status", "Submitted"] }, 1, 0] },
     },
     L1Noshow: {
       $sum: { $cond: [{ $eq: ["$totallogs.status", "L1Noshow"] }, 1, 0] },
     },
     Offered: {
       $sum: { $cond: [{ $eq: ["$totallogs.status", "Offered"] }, 1, 0] },
     },
     clientScreenReject: {
       $sum: { $cond: [{ $eq: ["$totallogs.status", "Client screen Reject"] }, 1, 0] },
     },
     clientSubmission: {
       $sum: { $cond: [{ $eq: ["$totallogs.status", "Client submission"] }, 1, 0] },
     },
     Interview: {
       $sum: { $cond: [{ $eq: ["$totallogs.status", "L1 schedule"] }, 1, 0] },
     },
     joined: {
       $sum: { $cond: [{ $eq: ["$totallogs.status", "Joined"] }, 1, 0] },
     },
   },
  },

  {
    $sort: {
      clientSubmission: -1, // Sort by clientSubmission count in descending order
    }
  },
  {
   $project: {
     _id:0,
      data1:{
       x:"$_id.name",
       y:"$OverallSubmission"
      },
      data2:{
       x:"$_id.name",
       y:"$clientSubmission"
      },
       data3:{
       x:"$_id.name",
       y:"$clientScreenReject"
      }, 
      data4:{
       x:"$_id.name",
       y:"$Interview"
      }, 
      data5:{
       x:"$_id.name",
       y:"$L1Noshow"
      },
      data6:{
       x:"$_id.name",
       y:"$Offered"
      },
       data7:{
       x:"$_id.name",
       y:"$joined"
      },
     
     //    "$L1Noshow","$clientSubmission","$clientScreenReject","$Interview","$Offered","$joined",
     // ],
     // _id: "$_id._id",
     // name: "$_id.name",
     // Offered: 1,
     // clientSubmission: 1,
     // Interview: 1,
     // joined: 1,
   },
  },
  ];


}



if(query == "Custom"){
  aggregateweekQuery = [

    {
     $lookup: {
       from: "totallogs",
       let: { client_id: "$_id" },
       pipeline: [
         {
           $match: {
             $expr: { $eq: ["$client_id", "$$client_id"] },
             // Assuming your totallogs documents have a 'date' field
            
           createdAt: { $gte: startDateFilter, $lte: endDateFilter }
           }
         }
       ],
       as: "totallogs",
     },
    },
    {
     $unwind: "$totallogs", // Unwind the array for easier grouping
    },
    {
     $group: {
       _id: {
         _id: "$_id",
         name: "$name",
       },
       OverallSubmission: {
         $sum: { $cond: [{ $eq: ["$totallogs.status", "Submitted"] }, 1, 0] },
       },
       L1Noshow: {
         $sum: { $cond: [{ $eq: ["$totallogs.status", "L1Noshow"] }, 1, 0] },
       },
       Offered: {
         $sum: { $cond: [{ $eq: ["$totallogs.status", "Offered"] }, 1, 0] },
       },
       clientScreenReject: {
         $sum: { $cond: [{ $eq: ["$totallogs.status", "Client screen Reject"] }, 1, 0] },
       },
       clientSubmission: {
         $sum: { $cond: [{ $eq: ["$totallogs.status", "Client submission"] }, 1, 0] },
       },
       Interview: {
         $sum: { $cond: [{ $eq: ["$totallogs.status", "L1 schedule"] }, 1, 0] },
       },
       joined: {
         $sum: { $cond: [{ $eq: ["$totallogs.status", "Joined"] }, 1, 0] },
       },
     },
    },
    {
      $sort: {
        clientSubmission: -1, // Sort by clientSubmission count in descending order
      }
    },
    {
     $project: {
       _id:0,
        data1:{
         x:"$_id.name",
         y:"$OverallSubmission"
        },
        data2:{
         x:"$_id.name",
         y:"$clientSubmission"
        },
         data3:{
         x:"$_id.name",
         y:"$clientScreenReject"
        }, 
        data4:{
         x:"$_id.name",
         y:"$Interview"
        }, 
        data5:{
         x:"$_id.name",
         y:"$L1Noshow"
        },
        data6:{
         x:"$_id.name",
         y:"$Offered"
        },
         data7:{
         x:"$_id.name",
         y:"$joined"
        },
       
       //    "$L1Noshow","$clientSubmission","$clientScreenReject","$Interview","$Offered","$joined",
       // ],
       // _id: "$_id._id",
       // name: "$_id.name",
       // Offered: 1,
       // clientSubmission: 1,
       // Interview: 1,
       // joined: 1,
     },
    },
    ];
}

let dataWeek = await clients.aggregate(aggregateweekQuery);


let Allsubmissions=[]
let  ClientSubmission=[]
let  ClientScreenReject=[]
let Interview=[]
let L1noshow=[]
let Offered=[]
let Joined=[]


const mergedData1 = dataWeek?.map((item,i) => {
 Allsubmissions=[...Allsubmissions,item.data2.x]
 ClientSubmission=[...ClientSubmission,item.data2?.y]
 ClientScreenReject=[...ClientScreenReject,item.data3?.y]
 Interview=[...Interview,item.data4?.y]
 L1noshow=[...L1noshow,item.data5?.y]
 Offered=[...Offered,item.data6?.y]
 Joined=[...Joined,item.data7?.y]
//  dataWeek?.map((item)=>{
//   senddata.push(item.data)
//  })
})
// Dynamically merge all data1 arrays in each object

let senddata={
label:Allsubmissions,
ClientSubmission,
ClientScreenReject,
Interview,
L1noshow,
Offered,
Joined,

}


 try {
   success(res, 200, true, "Get Successfully", senddata);
   }
  catch (error) {
   throw new Error(error);
 }
}))
// Assign Permission

router.get('/database-fetch/', asyncHandler(async (req, res) => {

 

try {

       let data =await crud.getDocument(admin,{ role: { $in: ['HR','SuperAdmin'] }},{_id:1,name:1}, { new: true })
       
  //  let data=crud.updateMany(admin,{},req?.body,{ new: true })
  success(res, 200, true, "Get Successfully", data);
  }
 catch (error) {
  throw new Error(error);
}
}))
router.get('/owner-select/',authAdmin, asyncHandler(async (req, res) => {

  

  try {
      let aggregateQuery=[
        {
          $match: {
           company_id: {
             $eq:req.user?.company_id
           },
            
          role: {
            $in: ['HR']
          },
        
          },
      },
      {
        $project:{
          label:"$name",
          value:"$_id"
        }
      }
      ]
         let data =await admin.aggregate(aggregateQuery)
         
    //  let data=crud.updateMany(admin,{},req?.body,{ new: true })
    success(res, 200, true, "Get Successfully", data);
    }
   catch (error) {
    throw new Error(error);
  }
  }))
  router.get('/spaceselect/',authAdmin, asyncHandler(async (req, res) => {

 

    try {
        let aggregateQuery=[
          {
            $match: {
    
            
           company_id: { $eq: req.user?.company_id},
                  // job_id : { $regex: new RegExp(req?.query?.job_title, 'i') }
          
              
        
            },
        },
        {
          $project:{
            label:"$name",
            value:"$email_id"
          }
        }
        ]
           let data =await admin.aggregate(aggregateQuery)
           
      //  let data=crud.updateMany(admin,{},req?.body,{ new: true })
      success(res, 200, true, "Get Successfully", data);
      }
     catch (error) {
      throw new Error(error);
    }
    }))
  router.get('/Ccselect/',authAdmin, asyncHandler(async (req, res) => {

 

    try {
        let aggregateQuery=[
          {
            $match: {
    
            
           company_id: { $eq: req.user?.company_id},
                  // job_id : { $regex: new RegExp(req?.query?.job_title, 'i') }
          
              
            role: {
              $in: ['HR']
            },
          
            },
        },
        {
          $project:{
            label:"$name",
            value:"$_id"
          }
        }
        ]
           let data =await admin.aggregate(aggregateQuery)
           
      //  let data=crud.updateMany(admin,{},req?.body,{ new: true })
      success(res, 200, true, "Get Successfully", data);
      }
     catch (error) {
      throw new Error(error);
    }
    }))
    router.get('/teamsSelect/',authAdmin, asyncHandler(async (req, res) => {

 

      try {
          let aggregateQuery=[
            {
              $match: {
      
              
             Parent_id: { $eq: null},
                    // job_id : { $regex: new RegExp(req?.query?.job_title, 'i') }
            
                
             
            
              },
          },
          {
            $project:{
              label:"$team_name",
              value:"$_id"
            }
          }
          ]
             let data =await teams.aggregate(aggregateQuery)
             
        //  let data=crud.updateMany(admin,{},req?.body,{ new: true })
        success(res, 200, true, "Get Successfully", data);
        }
       catch (error) {
        throw new Error(error);
      }
      }))


  router.get('/To-select/',authAdmin, asyncHandler(async (req, res) => {

 

    try {
        let aggregateQuery=[
          {
            $match: {
    
              
            role: {
              $in: ['SuperAdmin']
            },
          
            },
        },
        
        {
          $project:{
            label:"$name",
            value:"$email_id"
          }
        }
        ]
           let data =await admin.aggregate(aggregateQuery)
           
      //  let data=crud.updateMany(admin,{},req?.body,{ new: true })
      success(res, 200, true, "Get Successfully", data);
      }
     catch (error) {
      throw new Error(error);
    }
    }))

    router.get('/vendor/',authAdmin, asyncHandler(async (req, res) => {

 

      try {
          let aggregateQuery=[
            {
              $match: {
      
                
              role: {
                $in: ['Vendor']
              },
            
              },
          },
          
          {
            $project:{
              label:"$name",
              value:"$_id"
            }
          }
          ]
             let data =await admin.aggregate(aggregateQuery)
             
        //  let data=crud.updateMany(admin,{},req?.body,{ new: true })
        success(res, 200, true, "Get Successfully", data);
        }
       catch (error) {
        throw new Error(error);
      }
      }))

      router.put('/assignvendor/:id',authAdmin, asyncHandler(async (req, res) => {

        const { id } = req.params;

        try {
          const check = await crud.getOneDocumentById(job, id, {}, {});
          if(!check) throw new Error('Data not Found!')

          let assigneddata =[]
          req.body.assign.map((item)=>{
            assigneddata.push({
               assign:item,
              vendor_salary_type:req.body.vendor_salary_type||"",
              vendor_job_type:req.body.vendor_job_type||"",
              vendor_clientbillable:req.body.vendor_clientbillable||0
            })
          })
          let data ={
         assign:[
           ...check.assign,
           ...req.body.assign
         ],
         assigneddata :[
            ...check.assigneddata,
            ...assigneddata
         ]
        
        }

          let updateDate=await crud.updateById(job, id, data, { new: true }) 
               
          //  let data=crud.updateMany(admin,{},req?.body,{ new: true })
          success(res, 200, true, "Assigned SuccessFully", updateDate);
          }
         catch (error) {
          throw new Error(error);
        }
        }))
        router.put('/assignvendorteam/:id',authAdmin, asyncHandler(async (req, res) => {

          const { id } = req.params;
          const  assigneddata =[]
           const assign =[]
        req.body.assign.map( async(item)=>{
           let data = await crud.getOneDocumentById(teams, item, {}, {})
            console.log("data",data)
           assign.push(
              data.team_leader
           )
          assigneddata.push({
             assign:item,
            vendor_salary_type:req.body.vendor_salary_type||"",
            vendor_job_type:req.body.vendor_job_type||"",
            vendor_clientbillable:req.body.vendor_clientbillable||0
          })
        })
          try {
            const check = await crud.getOneDocumentById(job, id, {}, {});
            if(!check) throw new Error('Data not Found!')
  
          
             
              console.log("6698e533cce2117b1b3c506c",assign)
            let data ={
           assign:[
             ...check.assign,
             ...assign
           ],
           assigneddata :[
              ...check.assigneddata,
              ...assigneddata
           ]
          
          }
  
            let updateDate=await crud.updateById(job, id, data, { new: true }) 
                 
            //  let data=crud.updateMany(admin,{},req?.body,{ new: true })
            success(res, 200, true, "Assigned SuccessFully", updateDate);
            }
           catch (error) {
            throw new Error(error);
          }
          }))
  

  router.get('/usermangmentroles/',authAdmin, asyncHandler(async (req, res) => {

 

    try {
        let aggregateQuery=[
          {
            $match: {
              company_id: { $eq:  req.user?.company_id||null },
              // job_id : { $regex: new RegExp(req?.query?.job_title, 'i') }
      
            },
          },
        
        {
          $project:{
            label:"$name",
            value:"$_id"
          }
        }
        ]
           let data =await admin.aggregate(aggregateQuery)
           
      //  let data=crud.updateMany(admin,{},req?.body,{ new: true })
      success(res, 200, true, "Get Successfully", data);
      }
     catch (error) {
      throw new Error(error);
    }
    }))
    router.get('/allRoles/',authAdmin,asyncHandler(async (req, res) => {

 

      try {
          let aggregateQuery=[
             {
              $match: {
                company_id: { $eq: req.query?.company_id ? new mongoose.Types.ObjectId(req.query?.company_id) : req.user?.company_id ?new mongoose.Types.ObjectId(req.user?.company_id) : null },
                // job_id : { $regex: new RegExp(req?.query?.job_title, 'i') }
        
              },
            },
          
            {
              $sort: {
                createdAt: -1, // Sorting in descending order
              },
            }
          ]
             let data =await admin.aggregate(aggregateQuery)
             
        //  let data=crud.updateMany(admin,{},req?.body,{ new: true })
        success(res, 200, true, "Get Successfully", data);
        }
       catch (error) {
        throw new Error(error);
      }
      }))

    router.put('/assign/:id', asyncHandler(async (req, res) => {
      const { id } = req.params;
      validateId(id); 
    
        let data=req?.body?.employees?.map( async(body)=>{
             let inserdata={
              _id:body?.employee_id,
              reportmanager:
             
              {
                email_address:{
                  address:body?.report_manager,
                  name:""
                }
              },
              cc:body?.cc?.map((cc)=>(
                {
                  email_address:{
                    address:cc,
                    name:""
                  }
                })),
              permission:id
             }
             await crud.updateById(admin,body?.employee_id,inserdata, { new: true })
        })
      try {
    
    
        //  let data=crud.updateMany(admin,{},req?.body,{ new: true })
        success(res, 200, true, "Assigned Successfully", data);
        }
       catch (error) {
        throw new Error(error);
      }
    }))
    router.put('/assignedit/:id', asyncHandler(async (req, res) => {
      const { id } = req.params;
      validateId(id); 
    
      console.log("Request body:", req.body);
    
      // Prepare data to update, including the status field
      const inserdata = {
        _id: req.body?.employee_id,
        reportmanager: req.body.report_manager?.map((report) => ({
          email_address: {
            address: report,
            name: ""
          }
        })),
        cc: req.body.cc?.map((cc) => ({
          email_address: {
            address: cc,
            name: ""
          }
        })),
        permission: id,
        userstatus: req.body?.userstatus || 'active', // Set status, default to active if not provided
      };
    
      try {
        const data = await crud.updateById(admin, req?.body?.employee_id, inserdata, { new: true });
    
        success(res, 200, true, "Updated Successfully", data);
      } catch (error) {
        throw new Error(error);
      }
    }));
    


    router.get('/company', asyncHandler(async (req, res) => {

 

      try {
    
             
        //  let data=crud.updateMany(admin,{},req?.body,{ new: true })
    success(res, 200, true, "Get Successfully", await crud.getDocument(company, {...req.query},{},{}));
        
        }
       catch (error) {
        throw new Error(error);
      }
      }))
      router.get('/company/:id',asyncHandler(async (req, res) => {
       

        let {id} =req.params


       try {
     
              
         //  let data=crud.updateMany(admin,{},req?.body,{ new: true })
     success(res, 200, true, "Get Successfully", await crud.getOneDocumentById(company, id,{},{}));
         
         }
        catch (error) {
         throw new Error(error);
       }
       }))
      router.get('/companysingle/',authAdmin, asyncHandler(async (req, res) => {
       

         let id =req?.user?.company_id ? req.user?.company_id :null
 

        try {
      
               
          //  let data=crud.updateMany(admin,{},req?.body,{ new: true })
      success(res, 200, true, "Get Successfully", await crud.getOneDocumentById(company, id,{},{}));
          
          }
         catch (error) {
          throw new Error(error);
        }
        }))
        router.get('/counts/',authAdmin, asyncHandler(async (req, res) => {
       

          
  
 
         try {
          const totalConatcs = await contacts.countDocuments();
          const totalCompany = await accounts.countDocuments();
          const totalCandidates = await candidatelog.countDocuments();

       
                
           //  let data=crud.updateMany(admin,{},req?.body,{ new: true })
       success(res, 200, true, "Get Successfully", {totalConatcs,totalCompany,totalCandidates})
           
           }
          catch (error) {
           throw new Error(error);
         }
         }))
         router.get('/invoiceChart/',authAdmin, asyncHandler(async (req, res) => {
       
          aggregationPipelineInvoice= [
            {
                $addFields: {
                    total_amount_numeric: { $toDouble: "$total_amount" } // Convert total_amount to a double
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: '$invoice_date' },
                    },
                    totalExpenseCost: { $sum: "$total_amount_numeric" }, // Sum the numeric values
                },
            },
            {
                $addFields: {
                    monthName: {
                        $switch: {
                            branches: [
                                { case: { $eq: ['$_id.month', 1] }, then: 'Jan' },
                                { case: { $eq: ['$_id.month', 2] }, then: 'Feb' },
                                { case: { $eq: ['$_id.month', 3] }, then: 'Mar' },
                                { case: { $eq: ['$_id.month', 4] }, then: 'Apr' },
                                { case: { $eq: ['$_id.month', 5] }, then: 'May' },
                                { case: { $eq: ['$_id.month', 6] }, then: 'June' },
                                { case: { $eq: ['$_id.month', 7] }, then: 'July' },
                                { case: { $eq: ['$_id.month', 8] }, then: 'Aug' },
                                { case: { $eq: ['$_id.month', 9] }, then: 'Sep' },
                                { case: { $eq: ['$_id.month', 10] }, then: 'Oct' },
                                { case: { $eq: ['$_id.month', 11] }, then: 'Nov' },
                                { case: { $eq: ['$_id.month', 12] }, then: 'Dec' },
                            ],
                            default: 'Unknown',
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    month: '$_id.month',
                    monthName: 1,
                    expense: '$totalExpenseCost',
                },
            },
        ];
        aggregationPipelineExpense= [
          {
              $addFields: {
                  total_amount_numeric: { $toDouble: "$expense_cost" } // Convert total_amount to a double
              }
          },
          {
              $group: {
                  _id: {
                      month: { $month: '$expense_date' },
                  },
                  totalExpenseCost: { $sum: "$total_amount_numeric" }, // Sum the numeric values
              },
          },
          {
              $addFields: {
                  monthName: {
                      $switch: {
                          branches: [
                              { case: { $eq: ['$_id.month', 1] }, then: 'Jan' },
                              { case: { $eq: ['$_id.month', 2] }, then: 'Feb' },
                              { case: { $eq: ['$_id.month', 3] }, then: 'Mar' },
                              { case: { $eq: ['$_id.month', 4] }, then: 'Apr' },
                              { case: { $eq: ['$_id.month', 5] }, then: 'May' },
                              { case: { $eq: ['$_id.month', 6] }, then: 'June' },
                              { case: { $eq: ['$_id.month', 7] }, then: 'July' },
                              { case: { $eq: ['$_id.month', 8] }, then: 'Aug' },
                              { case: { $eq: ['$_id.month', 9] }, then: 'Sep' },
                              { case: { $eq: ['$_id.month', 10] }, then: 'Oct' },
                              { case: { $eq: ['$_id.month', 11] }, then: 'Nov' },
                              { case: { $eq: ['$_id.month', 12] }, then: 'Dec' },
                          ],
                          default: 'Unknown',
                      },
                  },
              },
          },
          {
              $project: {
                  _id: 0,
                  month: '$_id.month',
                  monthName: 1,
                  expense: '$totalExpenseCost',
              },
          },
      ];
      aggregationPipelinePaid = [
        {
            $addFields: {
                total_amount_numeric: { $toDouble: "$paid_amount" } // Convert total_amount to a double
            }
        },
        {
            $group: {
                _id: {
                    month: { $month: '$invoice_date' },
                },
                totalExpenseCost: { $sum: "$total_amount_numeric" }, // Sum the numeric values
            },
        },
        {
            $addFields: {
                monthName: {
                    $switch: {
                        branches: [
                            { case: { $eq: ['$_id.month', 1] }, then: 'Jan' },
                            { case: { $eq: ['$_id.month', 2] }, then: 'Feb' },
                            { case: { $eq: ['$_id.month', 3] }, then: 'Mar' },
                            { case: { $eq: ['$_id.month', 4] }, then: 'Apr' },
                            { case: { $eq: ['$_id.month', 5] }, then: 'May' },
                            { case: { $eq: ['$_id.month', 6] }, then: 'June' },
                            { case: { $eq: ['$_id.month', 7] }, then: 'July' },
                            { case: { $eq: ['$_id.month', 8] }, then: 'Aug' },
                            { case: { $eq: ['$_id.month', 9] }, then: 'Sep' },
                            { case: { $eq: ['$_id.month', 10] }, then: 'Oct' },
                            { case: { $eq: ['$_id.month', 11] }, then: 'Nov' },
                            { case: { $eq: ['$_id.month', 12] }, then: 'Dec' },
                        ],
                        default: 'Unknown',
                    },
                },
            },
        },
        {
            $project: {
                _id: 0,
                month: '$_id.month',
                monthName: 1,
                expense: '$totalExpenseCost',
            },
        },
    ];
          
  
 
          try {
             const data1=[]
             const data2=[]
             const data3=[]
           const totalInvoices = await invoice.aggregate(aggregationPipelineInvoice);
           const totalExpenses = await expense.aggregate(aggregationPipelineExpense);
           const totalPaid = await invoice.aggregate(aggregationPipelinePaid);
           
 
           if(totalInvoices?.length>0){

            for (let index = 1; index <= 12; index++) {
             const monthExists = totalInvoices.find(item => item.month === index);
             if(monthExists){
               data1.push(
                
                 monthExists.expense,
                
               
             
                 // LoggedHours:monthExists.totalLoggedHours?.split(":")[0]
             )
             }
             else{
               data1.push(
         
                
                 0
                 
               
               
              
             )
             }
              
            }
         
          
         }
         if(totalExpenses?.length>0){

          for (let index = 1; index <= 12; index++) {
           const monthExists = totalExpenses.find(item => item.month === index);
           if(monthExists){
             data2.push(
              
               monthExists.expense,
              
             
           
               // LoggedHours:monthExists.totalLoggedHours?.split(":")[0]
           )
           }
           else{
             data2.push(
       
              
               0
               
             
             
            
           )
           }
            
          }
       
        
       }
       if(totalPaid?.length>0){

        for (let index = 1; index <= 12; index++) {
         const monthExists = totalPaid.find(item => item.month === index);
         if(monthExists){
           data3.push(
            
             monthExists.expense,
            
           
         
             // LoggedHours:monthExists.totalLoggedHours?.split(":")[0]
         )
         }
         else{
           data3.push(
     
            
             0
             
           
           
          
         )
         }
          
        }
     
      
     }
                 
            //  let data=crud.updateMany(admin,{},req?.body,{ new: true })
        success(res, 200, true, "Get Successfully", {data3,data2,data1})
            
            }
           catch (error) {
            throw new Error(error);
          }
          }))
      
      router.post('/company',upload.single("logo"),asyncHandler(async (req, res) => {
    if(req.file){
      req.body.logo =req.file.path
    }
 

        try {
           
              
               
          //  let data=crud.updateMany(admin,{},req?.body,{ new: true })
          success(res, 200, true, "Get Successfully",await crud.insertOne(company, req.body) );
          }
         catch (error) {
          throw new Error(error);
        }
        }))
        router.put('/company/:id',upload.single("logo"),asyncHandler(async (req, res) => {
          if(req.file){
            req.body.logo =req.file.path
          }
       
      
          const { id } = req.params;
          validateId(id);
          const check = await crud.getOneDocumentById(company,id,{},{});
          if (!check) throw new Error('Data not Found!')
          try {
            success(res, 200, true, 'Update Successfully', await crud.updateById(company, id, req.body, { new: true }));
          } catch (err) {
            throw new Error(err);
          } 
              }))

module.exports = router;