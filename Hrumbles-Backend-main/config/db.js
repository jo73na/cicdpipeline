const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    
    });
     // mongoose.connect( "mongodb://zivedbadmin:Co1mbat0re9091@62.72.51.159:15517/master", {
    //useNewUrlParser: true,
      // useUnifiedTopology: true,
    
    //});
    console.log(`Database Connected Successfully`);
  } catch (err) {
    console.log(`Database Not Connect ${err}`);
  }
};

module.exports = dbConnect;