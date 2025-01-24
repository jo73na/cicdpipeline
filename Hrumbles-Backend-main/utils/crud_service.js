class crud_service {
  constructor() {
   this.insertOne = async (model, data) => {
     try {
       const res = await model.create(data);
       return res;
     } catch (err) {
       throw err;
     }
   };

   this.insertMany = async (model, data) => {
     try {
       const res = await model.insertMany(data);
       return res;
     } catch (err) {
       throw err;
     }
   };

   this.updateOne = async (model, criteria, doc, options) => {
     try {
       const res = await model.updateOne(criteria, doc, options);
       return res;
     } catch (err) {
       throw err;
     }
   };

   this.updateById = async (model, id, doc, options) => {
     try {
       const res = await model.findByIdAndUpdate(id, doc, options);
       return res;
     } catch (err) {
       throw err;
     }
   };

   this.updateMany = async (model, criteria, doc, options) => {
     try {
       const res = await model.updateMany(criteria, doc, options);
       return res;
     } catch (err) {
       throw err;
     }
   };

   this.deleteOne = async (model, id) => {
     try {
       const res = await model.deleteOne(id);
       return res;
     } catch (err) {
       throw err;
     }
   };

   this.deleteById = async (model, id) => {

     try {
       const res = await model.findByIdAndDelete(id);
       return res;
     } catch (err) {
       throw err;
       
     }
   };

   this.deleteMany = async (model, id) => {
     try {
       const res = await model.deleteMany(id);
       return res;
     } catch (err) {
       throw err;
     }
   };

   this.getOneDocument = async (model, query, projection = {}, extension = {}) => {
    try {
      // Ensure extension.options is defined
      const options = extension.options || {};
      
      let queryObj = model.findOne(query, projection, options);
      
      if (extension.populate) {
        queryObj = queryObj.populate(extension.populate);
      }
  
      const res = await queryObj.exec();
      return res;
    } catch (err) {
      console.error("Error in getOneDocument:", err);
      throw err;
    }
  };
   this.getOneDocumentById = async (model, id, projection, extension) => {
     try {
       let queryObj = model.findById(id, projection, extension.options);
       if (extension.populate) queryObj = queryObj.populate(extension.populate);
       const res = await queryObj.exec();
       return res;
     } catch (err) {
       throw err;
     }
   };

   this.getDocument = async (model, query, projection, extension) => {
    try {
      // Ensure 'extension' is defined and has the necessary properties before using them
      const options = extension && extension.options ? extension.options : {};
      const populate = extension && extension.populate ? extension.populate : null;
      const sort = extension && extension.sort ? extension.sort : null;
      const limit = extension && extension.limit ? extension.limit : null;
      const count = extension && extension.count ? extension.count : false;
  
      let queryObj = model.find(query, projection, options);
  
      if (populate) queryObj.populate(populate);
      if (sort) queryObj.sort(sort);
      if (limit) queryObj.limit(limit);
  
      const res = await queryObj.exec();
  
      if (count) {
        const totalCount = await res.count();
        return totalCount;
      }
  
      return res;
    } catch (err) {
      throw err;
    }
  };
  

   this.getCount = async (model, conditions) => {
     try {
       const res = await model.countDocuments(conditions);
       return res;
     } catch (err) {
       throw err;
     }
   };

   this.populateDocument = async (model, docs, options) => {
     try {
       const res = await model.populate(docs, options);
       return res;
     } catch (err) {
       throw err;
     }
   };

   this.getAggregation = async (model, query, extension) => {
     try {
       const docs = await model.aggregate(query).exec();
       if (extension.populate) {
         const res = await model.populate(docs, { path: extension.populate });
         return res;
       }
       return docs;
     } catch (err) {
       throw err;
     }
   }; 
  }
}

module.exports = crud_service;
