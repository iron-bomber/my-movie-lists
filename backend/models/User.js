const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema(
  {
    email: String,
    name: String,
    friends: [{type: Schema.Types.ObjectId, ref: "User"}],
    requests: [{type: Schema.Types.ObjectId, ref: "User"}],
    movieList: [{
      movie: {type: Schema.Types.ObjectId, ref: "Movie"},
      review: {type: Schema.Types.ObjectId, ref: "Review"},
      status: String
              }],
    showList: [{
      show: {type: Schema.Types.ObjectId, ref: "Show"},
      review: {type: Schema.Types.ObjectId, ref: "Review"},
      status: String,
      epsSeen: Number,
              }]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(PLM, { usernameField: 'email' });

module.exports = model('User', userSchema);
