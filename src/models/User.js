const mongoose = required("../database");
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required:true,
        unique: true,// dado que nao pode se repetir
        lowercase: true,
    },
    password:{
        type: String,
        required:true,
        select: false, // sempre que fizer uma consulta no banco nao mostrar o password, por ser informacao sensivel
    },
    createdAt: {
        type: Date,
        default:Date.now,
    }
});

const User = mongoose.model("User", UserSchema);
export default User;