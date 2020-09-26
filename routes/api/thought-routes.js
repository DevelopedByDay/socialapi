const router = require('express').Router();

const {
    addThought,
    removeThought,
    addReaction,
    removeReaction,
    getThoughts,
    getThoughtById,
    updateThought
} = require('../../controllers/thought-controller');

router
    .route('/')
    .post(addThought)
    .get(getThoughts)

router
    .route('/:id')
    .put(updateThought)
    .delete(removeThought)
    .get(getThoughtById)

router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction)

module.exports = router;