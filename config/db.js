const mongoose = require('mongoose');

const connectDB = async () => {
    try{                        //       //    ip:prot    /databaseName
        await mongoose.connect('mongodb://127.0.0.1:27017/signal_db',{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })

        console.log('MongoDB Connected Successfully');

    }catch(error){
         console.error('MongoDB connection Failed:',error.message);
         process.exit(1);
    }
};

module.exports = connectDB;