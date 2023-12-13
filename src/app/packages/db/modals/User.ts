import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],

  

  
},{timestamps:true});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      return next();
    } catch (error:any) {
      return next(error);
    }
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
