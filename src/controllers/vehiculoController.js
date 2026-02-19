import Vehiculo from "../models/Vehiculo.js";

const agregarVehiculo = async(req,res)=>{
    const {placa} = req.body;

    const existeVehiculo= await Vehiculo.findOne({placa});
    if(existeVehiculo){
        const error=new Error('Vehiculo ya registrado');
        return res.status(400).json({msg:error.message});
    }

    try{
        const vehiculo=new Vehiculo(req.body);
        await vehiculo.save();
        res.json({msg:'Vehiculo registrado correctamente'});
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al registrar el vehiculo'});
    }
};

const obtenerVehiculos = async(req,res) =>{
    try{
        const vehiculos= await Vehiculo.find();
        res.json(vehiculos);
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al obtener los vehiculos'})
    }
};

const obtenerVehiculo = async(req,res) => {
    const {id} = req.params;
    try{
        const vehiculo = await Vehiculo.findById(id);
        if(!vehiculo){
            return res.status(404).json({msg:'Vehiculo no encontrado'});
        }
        res.json(vehiculo);
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'ID no válido'});
    }
}

const actualizarVehiculo = async(req,res) => {
    const{id}=req.params;
    const vehiculo= await Vehiculo.findById(id);

    if(!vehiculo){
        return res.status(404).json({msg:'Vehiculo no encontrado'});
    }

    if(req.body.placa && req.body.placa !==vehiculo.placa){
        const existePlaca=await Vehiculo.findOne({placa: req.body.placa});
        if(existePlaca){
            return res.status(400).json({msg:'Esa placa ya esta utilziada por otro auto'});
        }
    }

    vehiculo.marca = req.body.marca || vehiculo.marca;
    vehiculo.modelo = req.body.modelo || vehiculo.modelo;
    vehiculo.anio_fabricacion = req.body.anio_fabricacion || vehiculo.anio_fabricacion;
    vehiculo.placa = req.body.placa || vehiculo.placa;
    vehiculo.color = req.body.color || vehiculo.color;
    vehiculo.tipo_vehiculo = req.body.tipo_vehiculo || vehiculo.tipo_vehiculo;
    vehiculo.kilometraje = req.body.kilometraje || vehiculo.kilometraje;
    vehiculo.descripcion = req.body.descripcion || vehiculo.descripcion;

    try{
        const vehiculoAlmacenado = await vehiculo.save();
        res.json(vehiculoAlmacenado);
    } catch(error){
        console.log(error);
        res.status(500).json({msg: 'Error al actualizar el vehiculo'})
    }
};

const eliminarVehiculo = async(req,res) =>{
    const{id}=req.params;
    try{
        const vehiculo=await Vehiculo.findById(id);
        if(!vehiculo){
            return res.status(404).json({msg:'Vehiculo no encontrado'});
        }
        await vehiculo.deleteOne();
        res.json({msg:'Vehiculo eliminado correctamente'});
    } catch(error){
        console.log(error);
        res.status(500).json({msg: 'Error al eliminar el vehiculo'});
    }
}

export{
    agregarVehiculo,
    obtenerVehiculos,
    obtenerVehiculo,
    actualizarVehiculo,
    eliminarVehiculo
}