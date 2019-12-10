const { Schema, model } = require('mongoose');

const showItemSchema = new Schema(
    {
        epsSeen: Number,
        rating: Number,
        review: String,
        show: {type: Schema.Types.ObjectId, ref: "Show"},
        user: {ObjectId}
    }
);



module.exports = model('User', showItemSchema);
