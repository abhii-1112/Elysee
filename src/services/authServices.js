const User = require("../models/User") 
const bcrypt = require('bcryptjs')



const registerUserService = async ({name, email, password}) => {
    const saltround = 10
    const hashedPassword = await bcrypt.hash(password, saltround)

    const newUser = new User({name, email, password: hashedPassword})
    await newUser.save()
    return newUser // send the user data to controller if needed
}

const loginUserService = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
  
    return user; // send the user data to controller if needed
  };
  

module.exports = {registerUserService, loginUserService}