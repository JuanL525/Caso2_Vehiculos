import Reserva from '../models/Reserva.js';

const agregarReserva = async(req,res) =>{
    const {codigo} = req.body;

    const existeReserva = await Reserva.findOne({codigo});
    if(existeReserva){
        const error = new Error('Reserva ya existente');
        return res.status(400).json({msg:error.message})
    }
    try{
        const reserva = new Reserva(req.body);
        await reserva.save();
        res.json({msg: 'Reserva registrada exitosamente', ...reserva._doc});
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al registrar la reserva'});
    }

};

const obtenerReservas = async(req,res)=>{
    try{
        const reservas=await Reserva.find()
            .populate('id_cliente','nombre apellido cedula email')
            .populate('id_vehiculo', 'marca modelo placa');
        res.json(reservas);
    } catch(error){
        console.log(error);
        res.status(500).json({msg: 'Hubo un error al obtener las Reservas'})
    }
};

const obtenerReserva = async(req,res)=>{
    const {id} = req.params;
    try{
        const reserva = await Reserva.findById(id)
            .populate('id_cliente', 'nombre apellido cedula') 
            .populate('id_vehiculo', 'placa marca modelo');

        if(!reserva){
            return res.status(404).json({msg:'Reserva no encontrada'});
        }
        res.json(reserva);
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'ID no válido o no encontrado'});
    }
};


const actualizarReserva = async(req,res)=>{
    const{id}=req.params;
    const reserva = await Reserva.findById(id);

    if(!reserva){
        return res.status(404).json({msg:'La reserva a actualizar no existe'});
    }

    if(req.body.codigo && req.body.codigo !== reserva.codigo){
        const existeCodigo=await Reserva.findOne({codigo: req.body.codigo});
        if(existeCodigo){
            return res.status(400).json({msg:'Ese codigo ya esta en uso'});
        }
    }

    reserva.codigo = req.body.codigo || reserva.codigo;
    reserva.descripcion = req.body.descripcion || reserva.descripcion;
    reserva.id_cliente = req.body.id_cliente || reserva.id_cliente;
    reserva.id_vehiculo = req.body.id_vehiculo || reserva.id_vehiculo;

    try{
        const reservaActualizada = await reserva.save();
        res.json(reservaActualizada);
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al actualizar la reserva'});
    }
};

const eliminarReserva = async(req,res) =>{
    const { id } = req.params;
    try{
        const reserva=await Reserva.findById(id);
        if(!reserva){
            return res.status(404).json({msg: 'Reserva no encontrada'})
        }
        await reserva.deleteOne();
        res.json({msg:'Reserva eliminada correctamente'})
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al eliminar Reserva'})
    }
}

export{
    agregarReserva,
    obtenerReserva,
    obtenerReservas,
    eliminarReserva,
    actualizarReserva
}