const createError = (statusCode, msgCode)=>{
    const err= new Error()
    err.statusError = statusCode;
    err.messageError = msgCode;
    return err;
}

module.exports = createError;