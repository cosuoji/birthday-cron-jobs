import * as infoService from "../services/infoServices.js"




export const addUserToDatabase = async(req, res) =>{
    try{
        const {name, username, dob, email} = req.body;

       
        const month = dob.split("-")[1];
        const day = dob.split("-")[2]
        const result = await infoService.addUserToDatabase(name, day, month, username, email)
        res.render("success.ejs")
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}