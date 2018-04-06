export const setError = (res, code, message) => {
  if(message) {
    res.send(message);
  }

  res.status(code).end();
};

export const setForbidden = (res, message) => {
  setError(res, 403, message);
};

export const setNotFound = (res) => {
  setError(res, 404, 'Not Found');
};

export const setInternalServerError = (res, err) => {
  setError(res, 500, JSON.stringify(err));
};

// export const setUnauthorized = (res, message) => {
//   setError(res, 401, message);
// };
//
// export const ensureAuthorized = (req, res) => {
//   const {user} = req;
//   if(!user) {
//     setUnauthorized(res, `User isn't logged in`);
//   }
//
//   return true;
// };

// export const checkPermission = (req, res, permission) => {
//   const {role} = req.user;
//
//   // const isValid = isPermissionValid(permission, role);
//   // if(isValid) {
//   //   return true;
//   // }
//
//   setPermissionDenied(res);
// };

// export const setPermissionDenied = (res) => {
//   setForbidden(res, 'Permission denied!');
// };
