const mongoose = require("../database");
const bcryptjs = require("bcryptjs");
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
    },
});

UserSchema.pre("save", async function(next) {
    const hash = await bcryptjs.hash(this.password, 10); // faz uma melhora de 10 vezes na seguranca d senha
    console.log(this);
    console.log(hash);
    this.password= hash;
})
const User = mongoose.model("User", UserSchema);
module.exports = User;