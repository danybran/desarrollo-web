const {default:mongoose} = require("mongoose");

const moongoose = require("mongoose");

const conexion = async() =>{
	try{
		await mongoose.connect("mongodb://localhost:27017/MiBlog")
		
		//Parametros dentro de objeto //Solo en caso de aviso
		//useNewUrlParser: true
		//useUnifiedTopology: true
		//useCreateIndex: true
		console.log("Conectado correctamente a la base de datos MiBlog!!");
	}catch(error){
		console.log(error);
		throw new Error("No se ha podido conectar a la base de datos");
	}
}


module.exports = {
	conexion
}