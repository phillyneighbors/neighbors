const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Hood = new mongoose.Schema({
  type: {type:String, trim:true, lowercase:true, default:''},
  properties: {
    name: {type: String},
    listname: {type: String},
    mapname: {type: String},
    shap_leng: {type: Number},
    shape_area: {type: Number},
    cartodb_id: {type: Number},
    created_at: {type: Date},
    updated_at: {type: Date}
  },
  chat: {
    messages: [{type: ObjectId, ref: 'message'}]
  },
  geometry: {
    type: {type: String},
    coordinates: {type: Array}
  }
});

Hood.methods.summarize = function(){
  console.log("METHOD CALLED")
  const hood = {
    id: this._id,
    neighborhood: this.properties.mapname,
    chat: this.chat,
    geometry: this.geometry.coordinates[0][0]
  }
  return hood;
}

module.exports = mongoose.model('Hood', Hood);
