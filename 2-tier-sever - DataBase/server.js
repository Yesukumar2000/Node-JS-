let mongoose = require("mongoose");


let connectToMDB = async ()=>{

    try{
      await  mongoose.connect('mongodb+srv://DBUser:DBUser@taskcluster.botpc04.mongodb.net/?retryWrites=true&w=majority&appName=taskCluster');
        console.log('Connected to mongo DB Successfully')
    } catch(err){
        console.log('Unable to Connect to mongo DB')
    }

}

connectToMDB();