import session from 'express-session';

export const checkAuthentication = (redirectTo = '/login') => (req, res, next) => {
  if (req.session.auth && req.session.userId) {
    // Authentication successful
    next();
  } else {
    if (redirectTo) {
      return res.redirect(redirectTo);
    }

    // Authentication failed
    res.status(401).send('Unauthorized');
  }
}

export const notForLoggedIn = (redirectTo = '/') => (req, res, next) => {
  if (req.session.auth && req.session.userId) {
    return res.redirect(redirectTo);
  } else {
    next();
  }
}

export const checkAuthorization = (roleId, redirectTo = '/') => (req, res, next) => {
  if (req.session.auth && req.session.roleId === roleId) {
    next();
  } else {
    if (redirectTo) {
      return res.redirect(redirectTo);
    }

    // Authentication failed
    res.status(401).send('Unauthorized');
  }
}

export function saveSessionAuth(req, userId, roleId) {
  req.session.auth = true;
  req.session.userId = userId;
  req.session.roleId = roleId;
}

export function destroySessionAuth(req) {
  req.session.auth = false;
  req.session.userId = null;
  req.session.roleId = null;
}
