var mongoose = require('mongoose');

module.exports = mongoose.model('Category', {
  name: {type: String, required: true, unique: true},
  beloneTo: {type: String, required: true},
  sort: {type: Number},
  level: {type: Number, default: 1},
  parent_category: {type: String, ref: 'Category'},
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  canceled: {type:Boolean, default: 0}
});