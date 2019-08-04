const router = require('express').Router();
const userController = require('./api/controllers/userController');
const validation = require('./api/controllers/validation')
const passport = require('passport')
const projectController = require('./api/controllers/projectController')
const projectMemberController = require('./api/controllers/projectMemberController')

//! ----------------------------------Test Routes Not finished----------------------------------





router.post('/getmembers', projectMemberController.getProjectMembers)


//!----------------------------------Finished Routes----------------------------------

//* User routes
router.post('/signup', validation.signUp, userController.signUp);
router.post('/signin', userController.signIn);
router.get('/singleUserInfo', passport.authenticate("jwt", {
    session: false
}), userController.getUserInfo);

//* Project routes
router.post('/getProjectsByCreator', passport.authenticate("jwt", {
    session: false
}), projectController.getProjectsByCreatorId);

router.post('/createProject', passport.authenticate("jwt", {
    session: false
}), projectController.createProject);

router.post('/getsingleproject', projectController.getSingleProject);

//* Project Members routes
router.post('/addmembers', passport.authenticate("jwt", {
    session: false
}), projectMemberController.addMembers)

module.exports = router;