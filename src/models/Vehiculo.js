import mongoose from 'mongoose';

const vehiculoSchema =  mongoose.Schema({
    marca:{
        type:String,
        required:true,
        trim:true
    },

    modelo:{
        type:String,
        required:true,
        trim:true
    },

    anio_fabricacion:{
        type:Number,
        trim:true,
    },

    placa:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    color:{
        type:String,
        trim:true
    },

    tipo_vehiculo:{
        type:String,
        required:true,
        trim:true
    },

    kilometraje:{
        type:Number,
        trim:true
    },

    descripcion:{
        type:String,
        trim:true
    }
},
{
    timestamps:true
});

const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);
export default Vehiculo;

