const {constants}=require("../constants.js")
const errorhandler=(err,req,res,next)=>{
const statusCode =res.statusCode ? res.statusCode :500;
switch (statusCode) {
    case constants.NOT_FOUND:
        res.json({title:"Not Found",message:err.message,stackTrace:err.stack})
        break;
    case constants.VALIDATION_ERROR:
         res.json({title:"Validation Failed",message:err.message,stackTrace:err.stack})
         break;
    case constants.PAYEMENT_REQUIRED:
        res.json({title:"Payment required",message:err.message,stackTrace:err.stack})
            break;
    case constants.UNAUTHORIZED:
        res.json({title:"Unauthorized",message:err.message,stackTrace:err.stack})
        break;
    case constants.FORBIDDEN:
        res.json({title:" Forbidden",message:err.message,stackTrace:err.stack})
        break;
    case constants.SERVER_ERROR:
        res.json({title:" Server Error",message:err.message,stackTrace:err.stack})
        break;
    default:
        console.log("all fine")
        break;
}

}
module.exports=errorhandler