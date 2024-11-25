// module.exports = {
//     userRequired: (req, res, next) => {
//         if (!req.session.user) {
//             return res.redirect('/user/login');  // Redirect to user login if not logged in
//         }
//         next();
//     },
//     ownerRequired: (req, res, next) => {
//         if (!req.session.owner) {
//             return res.redirect('/owner/login');  // Redirect to owner login if not logged in
//         }
//         next();
//     }
// };
