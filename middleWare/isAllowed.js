const isAllowed = (req,res,next)=>{
    const isAllowed  = true
    if(isAllowed){
        next()
    } else{
        res.json({
            message: 'not an allowed user'
        })
    }
}

export default isAllowed