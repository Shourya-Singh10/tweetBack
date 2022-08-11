const mongoose = require('mongoose')


// const connectionString = process.env.MONGO_URI
// const connectionString = 'mongodb://localhost:27017/twitter-clone-db'
const connectionString = 'mongodb://0.0.0.0:27017/twitter-clone-db'

console.log('connectionString : ', connectionString)

mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log('Database connected'))
	.catch(err => console.error('errrrrrrrrrrrrrr',err))

process.on('uncaughtException', (error) => {
	console.error(error.message,'Errrrrrrrrrrokkkkkkk')
	mongoose.disconnect()
})

// const URL = process.env.DATABASEURL || "mongodb://localhost:27017/tweet";
// mongoose.connect(
//     URL,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         // useFindAndModify: false,
//         // useCreateIndex: true
//     },
//     err => {
//         if (err) {
//             console.log('IN ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
//             console.log('ERRORR###### - ', err);
//         } else {
//             console.log("Connected Successfully");
//         }
//     }
// );

