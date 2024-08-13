

const notFound = (req,res,next) => {
    res.status(404)
    res.json({message:`Page not found - ${req.originalUrl}`})
    next();
}
const errorMiddleware = (err,req,res,next) =>{
    const statusCode = res.statusCode==200?500:res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: err.stack
    })
    next()
}

export {notFound,errorMiddleware}