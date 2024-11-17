const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { skils } = require("../../utils/schemaMaster");
const { workexperience } = require("../../utils/schemaMaster");
const { success } = require("../../utils/response");
const crud_service = require("../../utils/crud_service");
const validateId = require('../../utils/validateId');
const { authAdmin } = require('../../middlewares/authMiddlewares');

const crud = new crud_service();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const natural = require('natural');
const nlp = require('nlp_compromise');
const fs = require('fs');
const { Document, Packer, Paragraph } = require('docx');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const methods ={authAdmin}
const upload = multer({ dest: 'uploads/' });


function extractInfo(text) {
    const emails = extractEmails(text);
    const phones = extractPhoneNumbers(text);
    const skills = extractSkills(text);
    const experience = extractExperience(text);
    const education = extractEducation(text);
  
    return {
      emails,
      phones,
      skills,
      experience,
      education,
    };
  }
  
  function extractEmails(text) {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    return text.match(emailPattern) || [];
  }
  
  function extractPhoneNumbers(text) {
    const phonePattern = /(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/g;
    return text.match(phonePattern) || [];
  }
  
  const skillKeywords = [
    'JavaScript', 'Node.js', 'Python', 'Java', 'C\\+\\+', 'SQL', 'React', 'Angular', 'AWS', 'Machine Learning', 'Data Analysis', 'Git'
    // Add more skills as needed
  ];
  
  function extractSkills(text) {
    const skills = skillKeywords.filter(skill => new RegExp(`\\b${skill}\\b`, 'i').test(text));
    return skills;
  }
  
  function extractExperience(text) {
    const lines = text.split('\n');
    const experiences = [];
    let currentExperience = {};
  
    lines.forEach(line => {
      const datePattern = /(\b\d{4}\b|\b\d{2}\b)[-/]?(?:\d{2}[-/]?)?(?:\d{2})?/g;
      const dateMatches = line.match(datePattern);
      const parsedLine = nlp(line);
      const organizations = parsedLine.organizations().out('array');
      const jobTitles = parsedLine.topics().out('array');
  
      if (dateMatches) {
        if (Object.keys(currentExperience).length > 0) {
          experiences.push(currentExperience);
          currentExperience = {};
        }
        currentExperience.dates = dateMatches.join(' - ');
        currentExperience.years = calculateYears(dateMatches);
      }
  
      if (jobTitles.length > 0) {
        currentExperience.title = jobTitles.join(', ');
      }
  
      if (organizations.length > 0) {
        currentExperience.company = organizations.join(', ');
      }
  
      if (!dateMatches && !jobTitles.length && !organizations.length) {
        currentExperience.description = (currentExperience.description || '') + ' ' + line.trim();
      }
    });
  
    if (Object.keys(currentExperience).length > 0) {
      experiences.push(currentExperience);
    }
  
    return experiences;
  }
  
  function calculateYears(dates) {
    if (dates.length < 2) return null;
    const startYear = parseInt(dates[0].slice(-4));
    const endYear = parseInt(dates[dates.length - 1].slice(-4));
    if (isNaN(startYear) || isNaN(endYear)) return null;
    return endYear - startYear;
  }
  
  
  function extractEducation(text) {
    const educationPattern = /(?:education|academic background|qualifications|educational qualifications)[\s\S]*?(?=\n{2,}|experience|skills|projects|certifications)/gi;
    const matches = text.match(educationPattern);
    return matches ? matches.map(match => match.trim()) : [];
  }
//create
 methods.add =asyncHandler(async (req, res) => {
  try {
    const file = req.file;
    let text = '';

    if (file.mimetype === 'application/pdf') {
      const data = await pdfParse(file);
      text = data.text;
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ path: file.path });
      text = result.value;
    } else if (file.mimetype === 'application/msword') {
      const buffer = await readFile(file.path);
      const doc = new Document();
      await Packer.toBuffer(doc);
      // DOC handling logic here (if necessary, as mammoth might already cover it)
    } else {
      return res.status(400).json({ error: 'Unsupported file format' });
    }

    const info = extractInfo(text);
    res.json(info);
  } catch (err) {
    throw new Error(err);
  }
})


router.post('/',upload.single("resume"), methods.add )


//getall
methods.getAll=asyncHandler(async (req, res) => {
  try {
    success(res, 200, true, "Get Successfully", await crud.getDocument(skils, {...req.query},{},{}));
  } catch (err) {
    throw new Error(err);
  } 
})
 router.get('/',methods.getAll );


 //getone

methods.getOne=asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  const check = await crud.getOneDocumentById(skils, id, {}, {});
  if(!check) throw new Error('Data not Found!')
  try {
  success(res, 200, true, "Get Successfully", await crud.getOneDocumentById(skils, id,{},{}));
  } catch (err) {
    throw new Error(err);
  } 
})
 router.get('/:id', methods.getOne)


//Edit
methods.edit =asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  const check = await crud.getOneDocumentById(skils,id,{},{});
  if (!check) throw new Error('Data not Found!')
  try {
    success(res, 200, true, 'Update Successfully', await crud.updateById(skils, id, req.body, { new: true }));
  } catch (err) {
    throw new Error(err);
  } 
})

 router.put('/:id',methods.edit )


//delete
  .delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    const check = await crud.getOneDocumentById(skils, id, {}, {});
    if(!check) throw new Error('Data not Found!')
    try {
      success(res, 200, true, "Delete Successfully", await crud.deleteById(skils, id));
    } catch (err) {
      throw new Error(err);
    } 
}))











module.exports = router;