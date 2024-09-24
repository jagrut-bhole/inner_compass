const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("User", userSchema);


// PORT = 5050

// MONGODB_URI = mongodb+srv://jagrutbhole103:Jagrut2004@cluster0.qz0vk.mongodb.net/inner_compass?retryWrites=true&w=majority&appName=Cluster0

// SESSION_SECRET = RACHEL_LOVE

// JWT_SECRET = EVA_ELFIE