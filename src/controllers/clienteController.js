import Cliente from '../models/Cliente.js';

const agregarCliente = async(req,res) =>{
    const {cedula} = req.body;

    const existeCliente = await Cliente.findOne({cedula});
    if(existeCliente){
        const error= new Error ('Cliente ya registrado');
        return res.status(400).json({msg: error.message});
    }

    try{
        const cliente = new Cliente(req.body);
        await cliente.save();
        res.json({msg:'Cliente registrado correctamente', ...cliente._doc});
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al registrar cliente'});
    }
};

const obtenerClientes = async(req,res) =>{
    try{
        const clientes= await Cliente.find();
        res.json(clientes);
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Hubo un error al obtener los clientes'})
    }
}

const obtenerCliente = async(req,res)=>{
    const { id } = req.params;
    try{
        const cliente= await Cliente.findById(id);
        if(!cliente){
            return res.status(404).json({msg:'Cliente no encontrado'});
        }
        res.json(cliente);
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'ID no válido o no encontrado'});
    }
}

const actualizarCliente = async(req,res)=>{
    const{id}=req.params;
    const cliente=await Cliente.findById(id);

    if(!cliente){
        return res.status(404).json({msg:'Cliente no encontrado'})
    }

    if(req.body.cedula && req.body.cedula !== cliente.cedula){
        const existecedula = await Cliente.findOne({cedula: req.body.cedula});
        if(existecedula){
            return res.status(400).json({msg: 'Esa cedula ya está en uso por otro cliente'});
        }
    }
    cliente.cedula = req.body.cedula || cliente.cedula;
    cliente.nombre = req.body.nombre || cliente.nombre;
    cliente.apellido=req.body.apellido || cliente.apellido;
    cliente.ciudad = req.body.ciudad || cliente.ciudad;
    cliente.email = req.body.email || cliente.email;
    cliente.direccion = req.body.direccion || cliente.direccion;
    cliente.telefono = req.body.telefono || cliente.telefono;
    cliente.fecha_nacimiento = req.body.fecha_nacimiento || cliente.fecha_nacimiento;



    try{
        const clienteAlmacenado = await cliente.save();
        res.json(clienteAlmacenado)
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al actualizar al cliente'})
    }
};

const eliminarCliente = async(req,res)=>{
    const {id} = req.params;
    try{
        const cliente = await Cliente.findById(id);
        if(!cliente){
            return res.status(404).json({msg:'Cliente no encontrado'})
        }
        await cliente.deleteOne();
        res.json({msg:'Cliente eliminado correctamente'});
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al eliminar al cliente'})
    }
}

export{
    agregarCliente,
    obtenerCliente,
    obtenerClientes,
    actualizarCliente,
    eliminarCliente
}
