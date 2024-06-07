import ErrorWithStatus from "../exceptions/errorStatus.js";
import User from "../database/schema/userSchema.js";


export const addUserToDatabase = async(name,day,month,username, email)=>{
    try{
        const checkEmail = await User.findOne({email: email})
        if(checkEmail){
            throw new ErrorWithStatus("Email Exists")
        }

        const checkUsername = await User.findOne({username: username})
        if(checkUsername){
            throw new ErrorWithStatus("Username  Exists")
        }


        const newUser = new User({name: name, 
            day_of_birth: day,
            month_of_birth: month,
            username: username, 
            email: email})

        await newUser.save()
        return {
            message: "user saved",
            data:{
                user: newUser
            }
        }    
        
    }


    catch(err){
        throw new ErrorWithStatus(err.message, 500)
    }
}