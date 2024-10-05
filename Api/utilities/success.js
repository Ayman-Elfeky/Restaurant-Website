const createSuccess = (statusCode, msgCode, data)=>{
    const successObj = {
        status : statusCode,
        message : msgCode,
        data: data
    }
    return successObj;
}

module.exports = createSuccess;