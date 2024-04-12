const express = require("express");

const UserModel = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

const router = express.Router();

router.get("/users",(req, res)=>{
    return res.json({});
});
module.exports = router;