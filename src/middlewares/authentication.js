'use strict'

module.exports = (req, res, next) => {
  
  //Get  Session
  const session = req.session
  
  //not for path /login and /api
  const isApiRoute = req.path.split('/')[0] === 'api' ? true : false

  if ( !req.path === '/login' && !isApiRoute ) {
    // Check session
    if ( session.isLogin ) next()
    else res.redirect('/login')
  } else next()
}
