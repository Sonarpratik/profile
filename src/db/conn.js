const mongoose = require("mongoose");

const mongoPath ='mongodb+srv://profile:1234@cluster0.7nuth3a.mongodb.net/some?retryWrites=true&w=majority'
//mongodb+srv://profile:<password>@cluster0.7nuth3a.mongodb.net/?retryWrites=true&w=majority

module.exports= async ()=>{
    await mongoose.connect(mongoPath ,{
    useNewUrlParser: true,
    // useUnifiedTopology: true,
        // useCreateIndex: true,
    // useFindAndModify:false

    }).then(()=>{
        console.log('Successfull')
    })
    return mongoose
}