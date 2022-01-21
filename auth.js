const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  if (req.headers.authorization) {

      jwt.verify(req.headers.authorization, 'secret', function(err, decoded) {
          if(decoded===undefined){
              res.status(401).json({
                  message: "Token Already existed"
              })
          }else{
              next();
          }
        });
  } else {
      res.status(401).json({
          message: "please athentication"
      })
  }
}


module.exports = verifyToken;