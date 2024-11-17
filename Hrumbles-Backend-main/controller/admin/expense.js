const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { expense, expenseothers } = require("../../utils/schemaMaster");
const { success } = require("../../utils/response");
const crud_service = require("../../utils/crud_service");
const validateId = require('../../utils/validateId');
const { authAdmin } = require('../../middlewares/authMiddlewares');
const upload = require("../../utils/upload");
const { default: mongoose } = require("mongoose");

const crud = new crud_service();

const methods ={authAdmin}

//Create Expense
methods.add =asyncHandler(async (req, res) => {
    console.log("is it:",req.body)
    console.log("files:",req.files)
    if(req?.user) {
        req.body.created_by=req?.user?._id
        req.body.company_id=req.user?.company_id
      }
 if(req?.file) req.body.expense_attachment=req?.file?.path   
    // const postData = req.body;
    // const filesData = req.files;

    // let createData = Object.assign({}, postData);

    // if(filesData){
    //     filesData.forEach(file => {
    //         createData[file.fieldname] = file
    //     });
    // }

    try {
        success(res, 201, true, "Create Successfully", await crud.insertOne(expense, req.body));
    } catch (err) {
        console.log("adding:",err)
        throw new Error(err);
    }
})
router.post('/',upload.single("attachment"),methods.add)

methods.otherstypeAdd =asyncHandler(async (req, res) => {
    console.log("is it:",req.body)
    console.log("files:",req.files)
    if(req?.user) {
        req.body.created_by=req?.user?._id
        req.body.company_id=req.user?.company_id
      }
 
    // const postData = req.body;
    // const filesData = req.files;

    // let createData = Object.assign({}, postData);

    // if(filesData){
    //     filesData.forEach(file => {
    //         createData[file.fieldname] = file
    //     });
    // }

    try {
        success(res, 201, true, "Create Successfully", await crud.insertOne(expenseothers, req.body));
    } catch (err) {
        console.log("adding:",err)
        throw new Error(err);
    }
})
router.post('/otherstypeAdd',methods.authAdmin,methods.otherstypeAdd)

//Edit Expense
methods.edit =asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    const check = await crud.getOneDocumentById(expense,id,{},{});

    let dataBody = req.body
    let fileBody = req.files

    console.log("req:",req.body)

    if(dataBody?.expense_attachment && !fileBody?.length){
        let fileBodyObj = JSON.parse(dataBody?.expense_attachment)
        console.log("file type",typeof(fileBodyObj))
        dataBody["expense_attachment"] = fileBodyObj
    }else if(fileBody?.length){
        fileBody.forEach(file => {
            dataBody[file.fieldname] = file
        });
    }

    if(!dataBody?.expense_attachment && !fileBody?.length){
        dataBody["expense_attachment"] = null;
    }

    if (!check) throw new Error('Data not Found!')
    try {
        success(res, 200, true, 'Update Successfully', await crud.updateById(expense, id, dataBody, { new: true }));
    } catch (err) {
        throw new Error(err);
    } 
})  
router.put('/:id',upload.any(),methods.edit )
methods.getGraph = asyncHandler(async (req, res) => {
    let startDateFilter, endDateFilter;
    const timeFrame = req.query.time_interval|| "Year";
    const range = req.query.range;
    const date = req.query.date;

    switch (timeFrame) {
      case 'Year':
        startDateFilter = new Date(new Date().getFullYear(), 0, 1);
        endDateFilter = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999);
        break;
      case 'Month':
        const currentDate = new Date();
        startDateFilter = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        endDateFilter = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
        break;
      case 'Week':
        const today = new Date();
        const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
        firstDayOfWeek.setHours(0, 0, 0, 0);
        const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));
        lastDayOfWeek.setHours(23, 59, 59, 999);
        startDateFilter = firstDayOfWeek;
        endDateFilter = lastDayOfWeek;
        break;
      case 'Custom':
        if (range === "Monthly Wise") {
          const [year, month] = date.split('-').map(Number);
          startDateFilter = new Date(year, month - 1, 1);
          endDateFilter = new Date(year, month, 0, 23, 59, 59, 999);
        } else if (range === "Weekly Wise" && date) {
          const [year, weekStr] = date.split('-');
          const week = parseInt(weekStr.replace(/[^0-9]/g, ''), 10);
          const firstDayOfYear = new Date(year, 0, 1);
          const daysOffset = (week - 1) * 7;
          const dayOfWeek = firstDayOfYear.getDay();
          const offsetToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
          startDateFilter = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + daysOffset - offsetToMonday));
          startDateFilter.setHours(0, 0, 0, 0);
          endDateFilter = new Date(startDateFilter);
          endDateFilter.setDate(startDateFilter.getDate() + 6);
          endDateFilter.setHours(23, 59, 59, 999);
        } else if (range === "Yearly Wise" && date) {
          const year = parseInt(date, 10);
          startDateFilter = new Date(year, 0, 1);
          endDateFilter = new Date(year, 11, 31, 23, 59, 59, 999);
        } else if (range === "Quarter Wise" && date) {
          const [year, quarter] = date.split('-Q');
          const parsedYear = parseInt(year, 10);
          const parsedQuarter = parseInt(quarter, 10);
          switch (parsedQuarter) {
            case 1:
              startDateFilter = new Date(parsedYear, 0, 1);
              endDateFilter = new Date(parsedYear, 2, 31, 23, 59, 59, 999);
              break;
            case 2:
              startDateFilter = new Date(parsedYear, 3, 1);
              endDateFilter = new Date(parsedYear, 5, 30, 23, 59, 59, 999);
              break;
            case 3:
              startDateFilter = new Date(parsedYear, 6, 1);
              endDateFilter = new Date(parsedYear, 8, 30, 23, 59, 59, 999);
              break;
            case 4:
              startDateFilter = new Date(parsedYear, 9, 1);
              endDateFilter = new Date(parsedYear, 11, 31, 23, 59, 59, 999);
              break;
            default:
              return res.status(400).json({ success: false, message: "Invalid quarter specified" });
          }
        } else {
          startDateFilter = new Date(req.query.startDate);
          endDateFilter = new Date(req.query.endDate);
        }
        break;
      default:
        return res.status(400).json({ success: false, message: "Invalid filter type" });
    }
      
    const aggregationPipelineSalary = [
        {
            $match: {
                expense_type: "Salary",
                expense_date : {
                    $gte:startDateFilter,
                    $lt:endDateFilter 
                }

                // Additional match criteria if needed
            },
        },
        {
            $group: {
                _id: {
                    employee_id: '$employee_id',  // Group by employee_id
                },
                totalExpenseCost: { $sum: "$expense_cost" },
            },
        },
        {
            $sort: {
                totalExpenseCost: -1,  // Sort by totalExpenseCost in descending order
            },
        
            },
        
        {
            $lookup: {
                from: 'employees',  // Replace with actual collection name
                localField: '_id.employee_id',
                foreignField: '_id',
                as: 'employee_info',
            },
        },
        {
            $addFields: {
                employeeFirstName: { $arrayElemAt: ["$employee_info.firstname", 0] },
                employeeLastName: { $arrayElemAt: ["$employee_info.lastname", 0] },
            },
        },
        {
            $project: {
                _id: 0,
                employee_id: '$_id.employee_id',
                employeeFirstName: 1,
                employeeLastName:1,
                totalExpenseCost: 1,
            },
        },
    ];
    const aggregationPipelineOthers = [
        {
            $match: {
                expense_type: "Others",
                // Additional match criteria if needed
            },
        },
        {
            $group: {
                _id: {
                    month: { $month: '$expense_date' },
                },
                totalExpenseCost: { $sum: "$expense_cost" },
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
                monthName:1,
                expense: '$totalExpenseCost',
            },
        },
    ];

    try {
        const expenseSalary = await expense.aggregate(aggregationPipelineSalary);
        const expenseOthers = await expense.aggregate(aggregationPipelineOthers);
        function getMonthName(month) {
            const monthNames = [
              'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
            ];
            return monthNames[month - 1];
          }
          let data1=[]
          let label1=[]
          let data2=[]
          if(expenseSalary?.length>0){
            expenseSalary?.map((item)=>{
               label1.push(item.employeeFirstName+ item.employeeLastName)
               data1.push(item.totalExpenseCost)
            })
            
         
          
         }
         if(expenseOthers?.length>0){

            expenseOthers?.map((item)=>{
               
                data2.push(item.totalExpenseCost)
             })
              
            }
       
         
    
          
         
         let senddata={
            data1,
            data2,
            label1,
         }

        success(res, 200, true, "Get Successfully", senddata);
    } catch (err) {
        throw new Error(err);
    }
});

router.get('/graph', methods.getGraph);
methods.others = asyncHandler(async (req, res) => {
    let startDateFilter, endDateFilter;
    const timeFrame = req.query.time_interval|| "Year";
    const range = req.query.range;
    const date = req.query.date;

    switch (timeFrame) {
      case 'Year':
        startDateFilter = new Date(new Date().getFullYear(), 0, 1);
        endDateFilter = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999);
        break;
      case 'Month':
        const currentDate = new Date();
        startDateFilter = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        endDateFilter = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
        break;
      case 'Week':
        const today = new Date();
        const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
        firstDayOfWeek.setHours(0, 0, 0, 0);
        const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));
        lastDayOfWeek.setHours(23, 59, 59, 999);
        startDateFilter = firstDayOfWeek;
        endDateFilter = lastDayOfWeek;
        break;
      case 'Custom':
        if (range === "Monthly Wise") {
          const [year, month] = date.split('-').map(Number);
          startDateFilter = new Date(year, month - 1, 1);
          endDateFilter = new Date(year, month, 0, 23, 59, 59, 999);
        } else if (range === "Weekly Wise" && date) {
          const [year, weekStr] = date.split('-');
          const week = parseInt(weekStr.replace(/[^0-9]/g, ''), 10);
          const firstDayOfYear = new Date(year, 0, 1);
          const daysOffset = (week - 1) * 7;
          const dayOfWeek = firstDayOfYear.getDay();
          const offsetToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
          startDateFilter = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + daysOffset - offsetToMonday));
          startDateFilter.setHours(0, 0, 0, 0);
          endDateFilter = new Date(startDateFilter);
          endDateFilter.setDate(startDateFilter.getDate() + 6);
          endDateFilter.setHours(23, 59, 59, 999);
        } else if (range === "Yearly Wise" && date) {
          const year = parseInt(date, 10);
          startDateFilter = new Date(year, 0, 1);
          endDateFilter = new Date(year, 11, 31, 23, 59, 59, 999);
        } else if (range === "Quarter Wise" && date) {
          const [year, quarter] = date.split('-Q');
          const parsedYear = parseInt(year, 10);
          const parsedQuarter = parseInt(quarter, 10);
          switch (parsedQuarter) {
            case 1:
              startDateFilter = new Date(parsedYear, 0, 1);
              endDateFilter = new Date(parsedYear, 2, 31, 23, 59, 59, 999);
              break;
            case 2:
              startDateFilter = new Date(parsedYear, 3, 1);
              endDateFilter = new Date(parsedYear, 5, 30, 23, 59, 59, 999);
              break;
            case 3:
              startDateFilter = new Date(parsedYear, 6, 1);
              endDateFilter = new Date(parsedYear, 8, 30, 23, 59, 59, 999);
              break;
            case 4:
              startDateFilter = new Date(parsedYear, 9, 1);
              endDateFilter = new Date(parsedYear, 11, 31, 23, 59, 59, 999);
              break;
            default:
              return res.status(400).json({ success: false, message: "Invalid quarter specified" });
          }
        } else {
          startDateFilter = new Date(req.query.startDate);
          endDateFilter = new Date(req.query.endDate);
        }
        break;
      default:
        return res.status(400).json({ success: false, message: "Invalid filter type" });
    }
    const aggregationPipelineSalary = [
        {
            $match: {
                expense_type: "Others",
                expense_date : {
                    $gte:startDateFilter,
                    $lt:endDateFilter 
                }

                // Additional match criteria if needed
            },

        },
        {
            $group: {
                _id: "$others_type",
                totalExpenseCost: { $sum: "$expense_cost" },
            },
        },
        {
            $lookup: {
                from: "expenseothers", // Assuming the name of your collection is 'other_types'
                localField: "_id",
                foreignField: "_id",
                as: "type_details"
            }
        },
        {
            $project: {
                _id: 0,
                month: { $arrayElemAt: ["$type_details.name", 0] }, // Assuming there is only one name per others_type
                expense: "$totalExpenseCost",
            },
        },
    ];


    
   

    try {
        const expenseSalary = await expense.aggregate(aggregationPipelineSalary);
         const data1=[]
         const data2=[]
       expenseSalary?.map((item)=>{
          data1.push(item.month)
          data2.push(item.expense)
       })
       

        success(res, 200, true, "Get Successfully", {data1,data2});
    } catch (err) {
        throw new Error(err);
    }
});

router.get('/others', methods.others);


methods.expensedata = asyncHandler(async (req, res) => {
    try {
        let filter = {
            expense_type:"Salary"
        };
         let startDateFilter,endDateFilter;
         let timeFrame =req.query.time_interval
       let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        let skip = (page - 1) * limit;  

        switch (timeFrame) {
            case 'Year':
              startDateFilter = new Date(new Date().getFullYear(), 0, 1);
              endDateFilter = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999);
              break;
            case 'Month':
              const currentDate = new Date();
              startDateFilter = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
              endDateFilter = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
              break;
            case 'Week':
              const today = new Date();
              const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
              firstDayOfWeek.setHours(0, 0, 0, 0);
              const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));
              lastDayOfWeek.setHours(23, 59, 59, 999);
              startDateFilter = firstDayOfWeek;
              endDateFilter = lastDayOfWeek;
              break;
            case 'Custom':
              if (range === "Monthly Wise") {
                const [year, month] = date.split('-').map(Number);
                startDateFilter = new Date(year, month - 1, 1);
                endDateFilter = new Date(year, month, 0, 23, 59, 59, 999);
              } else if (range === "Weekly Wise" && date) {
                const [year, weekStr] = date.split('-');
                const week = parseInt(weekStr.replace(/[^0-9]/g, ''), 10);
                const firstDayOfYear = new Date(year, 0, 1);
                const daysOffset = (week - 1) * 7;
                const dayOfWeek = firstDayOfYear.getDay();
                const offsetToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
                startDateFilter = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + daysOffset - offsetToMonday));
                startDateFilter.setHours(0, 0, 0, 0);
                endDateFilter = new Date(startDateFilter);
                endDateFilter.setDate(startDateFilter.getDate() + 6);
                endDateFilter.setHours(23, 59, 59, 999);
              } else if (range === "Yearly Wise" && date) {
                const year = parseInt(date, 10);
                startDateFilter = new Date(year, 0, 1);
                endDateFilter = new Date(year, 11, 31, 23, 59, 59, 999);
              } else if (range === "Quarter Wise" && date) {
                const [year, quarter] = date.split('-Q');
                const parsedYear = parseInt(year, 10);
                const parsedQuarter = parseInt(quarter, 10);
                switch (parsedQuarter) {
                  case 1:
                    startDateFilter = new Date(parsedYear, 0, 1);
                    endDateFilter = new Date(parsedYear, 2, 31, 23, 59, 59, 999);
                    break;
                  case 2:
                    startDateFilter = new Date(parsedYear, 3, 1);
                    endDateFilter = new Date(parsedYear, 5, 30, 23, 59, 59, 999);
                    break;
                  case 3:
                    startDateFilter = new Date(parsedYear, 6, 1);
                    endDateFilter = new Date(parsedYear, 8, 30, 23, 59, 59, 999);
                    break;
                  case 4:
                    startDateFilter = new Date(parsedYear, 9, 1);
                    endDateFilter = new Date(parsedYear, 11, 31, 23, 59, 59, 999);
                    break;
                  default:
                    return res.status(400).json({ success: false, message: "Invalid quarter specified" });
                }
              } else {
                startDateFilter = new Date(req.query.startDate);
                endDateFilter = new Date(req.query.endDate);
              }
              break;
            default:
              return res.status(400).json({ success: false, message: "Invalid filter type" });
          }


         filter.expense_date = {
            $gte:startDateFilter,
            $lt:endDateFilter 
        };
        // Check for time intervals
       
       const total  =await expense.countDocuments(filter)
       
        const data = await expense.find(filter)
        .populate({
            path: 'employee_id',
            select:"firstname lastname",
          
          })
          .populate({
            path: 'others_type',
            select:"name",
          
          })
          .populate({
            path: 'others_type_sub',
            select:"name",
          
          })
         .skip(skip)
        .limit(limit);
        success(res, 200, true, "Get Successfully", {total,data});
    } catch (err) {
        throw new Error(err);
    }
});




router.get('/expensedata', methods.expensedata);

methods.othersdata = asyncHandler(async (req, res) => {
    try {
        let filter = {
            expense_type:"Others"
        };
         let startDateFilter,endDateFilter;
         let timeFrame =req.query.time_interval
       let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        let skip = (page - 1) * limit;  

        switch (timeFrame) {
            case 'Year':
              startDateFilter = new Date(new Date().getFullYear(), 0, 1);
              endDateFilter = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999);
              break;
            case 'Month':
              const currentDate = new Date();
              startDateFilter = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
              endDateFilter = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
              break;
            case 'Week':
              const today = new Date();
              const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
              firstDayOfWeek.setHours(0, 0, 0, 0);
              const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));
              lastDayOfWeek.setHours(23, 59, 59, 999);
              startDateFilter = firstDayOfWeek;
              endDateFilter = lastDayOfWeek;
              break;
            case 'Custom':
              if (range === "Monthly Wise") {
                const [year, month] = date.split('-').map(Number);
                startDateFilter = new Date(year, month - 1, 1);
                endDateFilter = new Date(year, month, 0, 23, 59, 59, 999);
              } else if (range === "Weekly Wise" && date) {
                const [year, weekStr] = date.split('-');
                const week = parseInt(weekStr.replace(/[^0-9]/g, ''), 10);
                const firstDayOfYear = new Date(year, 0, 1);
                const daysOffset = (week - 1) * 7;
                const dayOfWeek = firstDayOfYear.getDay();
                const offsetToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
                startDateFilter = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + daysOffset - offsetToMonday));
                startDateFilter.setHours(0, 0, 0, 0);
                endDateFilter = new Date(startDateFilter);
                endDateFilter.setDate(startDateFilter.getDate() + 6);
                endDateFilter.setHours(23, 59, 59, 999);
              } else if (range === "Yearly Wise" && date) {
                const year = parseInt(date, 10);
                startDateFilter = new Date(year, 0, 1);
                endDateFilter = new Date(year, 11, 31, 23, 59, 59, 999);
              } else if (range === "Quarter Wise" && date) {
                const [year, quarter] = date.split('-Q');
                const parsedYear = parseInt(year, 10);
                const parsedQuarter = parseInt(quarter, 10);
                switch (parsedQuarter) {
                  case 1:
                    startDateFilter = new Date(parsedYear, 0, 1);
                    endDateFilter = new Date(parsedYear, 2, 31, 23, 59, 59, 999);
                    break;
                  case 2:
                    startDateFilter = new Date(parsedYear, 3, 1);
                    endDateFilter = new Date(parsedYear, 5, 30, 23, 59, 59, 999);
                    break;
                  case 3:
                    startDateFilter = new Date(parsedYear, 6, 1);
                    endDateFilter = new Date(parsedYear, 8, 30, 23, 59, 59, 999);
                    break;
                  case 4:
                    startDateFilter = new Date(parsedYear, 9, 1);
                    endDateFilter = new Date(parsedYear, 11, 31, 23, 59, 59, 999);
                    break;
                  default:
                    return res.status(400).json({ success: false, message: "Invalid quarter specified" });
                }
              } else {
                startDateFilter = new Date(req.query.startDate);
                endDateFilter = new Date(req.query.endDate);
              }
              break;
            default:
              return res.status(400).json({ success: false, message: "Invalid filter type" });
          }


         filter .createdAt = {
            $gte:startDateFilter,
            $lt:endDateFilter 
        };
        // Check for time intervals
       
       const total  =await expense.countDocuments(filter)
       
        const data = await expense.find(filter)
        .populate({
            path: 'employee_id',
            select:"firstname lastname",
          
          })
          .populate({
            path: 'others_type',
            select:"name",
          
          })
          .populate({
            path: 'others_type_sub',
            select:"name",
          
          })
         .skip(skip)
        .limit(limit);
        success(res, 200, true, "Get Successfully", {total,data});
    } catch (err) {
        throw new Error(err);
    }
});




router.get('/othersdata', methods.othersdata);
methods.getselectOthersSub = asyncHandler(async (req, res) => {
    try {
        let filter = {};
        if( req.query.parent_id){
            filter.others_type = new mongoose.Types.ObjectId(req.query.parent_id);
        }

    //    let page = parseInt(req.query.page) || 1;
    //     let limit = parseInt(req.query.limit) || 10;
    //     let skip = (page - 1) * limit;  

        // Check for time intervals
        if (req.query.time_interval === "Year") {
            filter.createdAt = {
                $gte: new Date(new Date().getFullYear(), 0, 1),
                $lt: new Date(new Date().getFullYear() + 1, 0, 1)
            };
        } else if (req.query.time_interval === "Month") {
            filter.createdAt = {
                $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
            };
        } else if (req.query.time_interval === "Week") {
            // Assuming the week starts on Sunday
            let firstDayOfWeek = new Date();
            firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());
            let lastDayOfWeek = new Date(firstDayOfWeek);
            lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 7);
            filter.createdAt = {
                $gte: firstDayOfWeek,
                $lt: lastDayOfWeek
            };
        } else if (req.query.time_interval === "Today") {
            filter.createdAt = {
                $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                $lt: new Date(new Date().setHours(23, 59, 59, 999))
            };
        }

        const aggregationPipelineSalary = [
            {
                $match: {
                    others_type:new mongoose.Types.ObjectId(req.query.parent_id),
                    // Additional match criteria if needed
                },
            },
            {
                $group: {
                    _id: "$others_type_sub",
                    totalExpenseCost: { $sum: "$expense_cost" },
                },
            },
            {
                $lookup: {
                    from: "expenseothers", // Assuming the name of your collection is 'other_types'
                    localField: "_id",
                    foreignField: "_id",
                    as: "type_details"
                }
            },
            {
                $project: {
                    _id: 0,
                    month: { $arrayElemAt: ["$type_details.name", 0] }, // Assuming there is only one name per others_type
                    expense: "$totalExpenseCost",
                },
            },
        ];

       const total  =await expense.countDocuments(filter)
       const expenseSalary = await expense.aggregate(aggregationPipelineSalary);
       const data1=[]
       const data2=[]
     expenseSalary?.map((item)=>{
        data1.push(item.month)
        data2.push(item.expense)
     })
      let send ={
        data1,
        data2,
      }
       
        const data = await expense.find(filter).populate("employee_id others_type others_type_sub")
        
        success(res, 200, true, "Get Successfully", {total,data,send});
    } catch (err) {
        throw new Error(err);
    }
});




router.get('/getselectOthersSub', methods.getselectOthersSub);
methods.piechart = asyncHandler(async (req, res) => {
    const aggregationPipelineSalary = [
       
        {
            $group: {
                _id:"$expense_type",
                totalExpenseCost: { $sum: "$expense_cost" },
            },
          
        },
        {
            $project: {
                x: "$_id",
                y:"$totalExpenseCost",
                r: "60", 
                text:"$totalExpenseCost",
                _id:0


              
            },
        },
      
    ];
 

    try {
        const expenseSalary = await expense.aggregate(aggregationPipelineSalary);
        // const expenseOthers = await expense.aggregate(aggregationPipelineOthers);
        // function getMonthName(month) {
        //     const monthNames = [
        //       'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        //       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        //     ];
        //     return monthNames[month - 1];
        //   }
      
         let total=0
          const sendedArray =[]
         expenseSalary?.map((currentValue) => {
            
            total += Number(currentValue.y || 0);
            
             sendedArray.push({
                ...currentValue,
                text:new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR'
                  }).format(currentValue.text)
             })
               
         
});
          let sendData=[
            {
                x:"Total",
                y:total,
                r:"80",
                text:`${new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR'
                  }).format(total)}`
            },
            ...sendedArray
            
          ]


        
        // let weekdata=[
        //     {
        //     x: 'Yours',
        //     y: Number(yoursWeekloggedHoures[0]?.totalLoggedHours?.split(":")[0]), 
        //      r: '60', text: `${yoursWeekloggedHoures[0]?.totalLoggedHours}`
          
        //   },
        //   {
        //     x: 'Total',
        //     y: 40, 
        //      r: '80',
        //    text: `40:00`
                                
        //   }, ]
        
       

        success(res, 200, true, "Get Successfully", sendData);
    } catch (err) {
        throw new Error(err);
    }
});

router.get('/piechart', methods.piechart);


//Get All - Expenses
methods.getAll=asyncHandler(async (req, res) => {

    // let aggregate =[
    //     {
    //         $lookup: {
    //         from: "employees",
    //         localField: "employee_id",
    //         foreignField: "_id",
    //         as: "expense_for"
    //         },
    //     },
    //     {
            
    //             $unwind: '$expense_for',
               
    //     },
        
    //     {
    //         $project: {
    //             expense_cost:1,
    //             expense_type:1,
    //             expense_date:1,
    //             expense_desc:1,
    //             expense_attachment:1,
    //             expense_for:"$expense_for.firstname"
    //         }
    //     }
    // ]

    let expense_rows = await expense.find().populate("employee_id ")

    try {
        success(res, 200, true, "Get Successfully", expense_rows);
    } catch (err) {
        throw new Error(err);
    } 
})
router.get('/',methods.getAll );


methods.getselectOthers=asyncHandler(async (req, res) => {
  if(req.query.parent_id){
     
  }
   let aggregate =[
    {
        $project:{
          label:"$name",
          value:"$_id"
        }
      }
   ]
    if(req.query.parent_id){
         aggregate.unshift({ $match: { parent_id:new mongoose.Types.ObjectId(req.query.parent_id) } })
    }

    let  data=await expenseothers.aggregate(
      aggregate
     
    )
   try {
     success(res, 200, true, "Get Successfully",data);
   } catch (err) {
     throw new Error(err);
   } 
  })
  router.get('/getselectOthers',methods.getselectOthers );
  
//Get By ID - Expense
methods.getOne=asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    const check = await crud.getOneDocumentById(expense, id, {}, {});
    if(!check) throw new Error('Data not Found!')
    try {
        success(res, 200, true, "Get Successfully", await crud.getOneDocumentById(expense, id,{},{}));
    } catch (err) {
        throw new Error(err);
    }
})
router.get('/:id', methods.getOne)

//Delete Expense
.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    const check = await crud.getOneDocumentById(expense, id, {}, {});
    if(!check) throw new Error('Data not Found!')
    try {
      success(res, 200, true, "Delete Successfully", await crud.deleteById(expense, id));
    } catch (err) {
      throw new Error(err);
    } 
}))

module.exports = router;