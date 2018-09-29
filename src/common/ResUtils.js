class ResUtils{
    static getFailureBody(code,errMsg){
        return {
            header:{
                code:code,
                status:'failure',
                errMsg:errMsg,
                token:''
            },
            data:{}
        }
    }
    static getSuccessBody(data){
        return {
            header:{
                code:'0000',
                status:'success',
                errMsg:'',
                token:''
            },
            data:data
        }
    }
}
module.exports=ResUtils;