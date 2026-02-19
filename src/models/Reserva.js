import mongoose from 'mongoose';

const reservaSchema = mongoose.Schema({
    codigo:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    descripcion:{
        type:String,
        default:null,
        trim:true
    },

    id_cliente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cliente',
        required:true
    },

    id_vehiculo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vehiculo',
        required:true,
    }
},
{
    timestamps:true
});

const Reserva= mongoose.model('Reserva', reservaSchema);
export default Reserva