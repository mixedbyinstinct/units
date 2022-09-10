const mongoose = require('mongoose');

const scriptSchema = mongoose.Schema({
    title: {
         type: String,
         required: true,
    },
    path: {
        type: String,
        required: true,
    },
})

const Script = mongoose.model("Script", scriptSchema);

module.exports = Script;