import jwt from 'jsonwebtoken'
 export const requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt
    if(token){
        jwt.verify(token,'our secret',(err,decodedToken)=>{
              if(err){
                console.log(err)
              }else{
                //res.json(decodedToken)
                next()
              }
        })
    }
    else{
        res.redirect('/Login')
    }
}
export const requireAuth2=(req,res,next)=>{
  const token=req.cookies.jwt
  if(token){
      jwt.verify(token,'our secret',(err,decodedToken)=>{
            if(err){
              console.log(err)
            }else{
              //res.json(decodedToken)
              next()
            }
      })
  }
  else{
      res.redirect('/LoginAdmin')
  }
}

