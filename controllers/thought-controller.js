const { Thought, User } = require('../models');

// addThought ,
// removeThought,
// addReaction,
// removeReaction,
// getThoughts (done),
// getThoughtById (done),
// updateThought

const thoughtController = {
    getThoughts(req, res) {
        Thought.find()
            .sort({ createdAt: -1 })
            .then((dbThoughtData) => {
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought with this id.' });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    addThought(req, res) {
        Thought.create(req.body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: dbThoughtData._id }},
                    { new: true }
                );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user with this id to bind with added thought'});
                }
                res.json({ message: 'Thought added.'});
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, {runValidators: true, new: true})
            .then((dbThoughtData) => {
                if(!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought with this id.'});
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    removeThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId})
            .then((dbThoughtData) => {
                if(!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought with this id.'});
                }

                return User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId},
                    { $pull: { thoughts: req.params.thoughtId }},
                    { new: true }
                );
            })
            .then((dbUserData) => {
                if(!dbUserData) {
                    return res.status(404).json({ message: 'Thought removed without associated user.' });
                }
                res.json({ message: 'Thought removed'});

            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body }},
          { runValidators: true, new: true }
        )
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
              return res.status(404).json({ message: 'No thought with this id.' });
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId }}},
          { runValidators: true, new: true }
        )
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
              return res.status(404).json({ message: 'No thought with this id.' });
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};

module.exports = thoughtController;