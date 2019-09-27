//Require Mongoose
const mongoose = require('mongoose');
const {Schema} = mongoose;

var SpotifyUserSchema = new Schema({
    _userId: Schema.Types.ObjectId,
    created_at: {type: Date, default: Date.now},
    access_token: String,
    refresh_token: String,
    last_updated_at: {type: Date, default: Date.now},
});

SpotifyUserSchema.pre('save', function (next) {
    this.last_updated_at = new Date();
    next();
});


module.exports = mongoose.model('SpotifyUser', SpotifyUserSchema);
