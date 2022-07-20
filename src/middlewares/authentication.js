'use strict'

module.exports = (req, res, next) => {
  
  //Get  Session
  const session = req.session
  
  //not for path /login
  if ( !req.path === '/login' ) {
    // Check session
    if ( session.isLogin ) next()
    else res.redirect('/login')
  } else next()
}
