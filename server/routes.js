const router = require('express').Router();
const userController = require('./api/controllers/userController');
const validation = require('./api/controllers/validation')
const passport = require('passport')
const projectController = require('./api/controllers/projectController')
const boardController = require('./api/controllers/boardController')
const projectMemberController = require('./api/controllers/projectMemberController')
//test routes
router.get('/user', passport.authenticate("jwt", {
    session: false
}), userController.getAllUsers);


router.post('/boards', passport.authenticate("jwt", {
    session: false
}), boardController.getBoards)

router.post('/createboard', passport.authenticate("jwt", {
    session: false
}), boardController.createBoard);



router.post('/addmembers', passport.authenticate("jwt", {
    session: false
}), projectMemberController.addMembers)



//real routes
router.post('/signup', validation.signUp, userController.signUp);
router.post('/signin', userController.signIn);
router.post('/projects', passport.authenticate("jwt", {
    session: false
}), projectController.getProjects)

router.post('/createproject', passport.authenticate("jwt", {
    session: false
}), projectController.createProject);

module.exports = router;