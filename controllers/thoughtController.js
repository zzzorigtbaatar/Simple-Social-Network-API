const { Thought, Student } = require("../models");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : Student.deleteMany({ _id: { $in: thought.students } })
      )
      .then(() => res.json({ message: "Thought and students deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //add a reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $push: {
          reactions: {
            username: req.body.username,
            reactionBody: req.body.reactionBody,
          },
        },
      },
      { new: true },
      (err, result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(500).json({ message: "Could not add reaction!" });
        }
      }
    );
  },
  //delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      {_id: req.params.id},
      {$pull: {reactions: {reactionId: req.body.reactionId}}},
      {new: true},
      (err, result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(500).json({ message: 'Failed to delete reaction!' });
        }
      }
    );
  }
};
