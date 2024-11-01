const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

TodoSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Todo', TodoSchema);

