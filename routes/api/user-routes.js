const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

router
    .router('/')
    .get(getAllUsers)
    .post(createUser);

router 
    .router('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .router('/userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;