const jwt = require ('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check if token exists & is valid
    if (token){
        jwt.verify(token, 'app rh secret', (err, docodedToken)=>{
            if (err){
                console.log(err.message);
                res.redirect('/login');
            }
            else {
                console.log(docodedToken);
                next();
            }
        })
    }
    else {
        res.redirect('/login');
    }
}

//check current user

const checkUser = (req, res , next ) =>{
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token, 'app rh secret', async (err, docodedToken)=>{
            if (err){
                console.log(err.message);
                res.locals.user = null;
            }
            else {
                console.log(docodedToken);
                let user = await User.findById(docodedToken.id);
                // console.log(user);
                res.locals.user = user;
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }

}
module.exports = {requireAuth, checkUser};