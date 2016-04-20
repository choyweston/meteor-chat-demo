//Boilerplate de Meteor
import { Meteor } from 'meteor/meteor';

// Permissions
messages.allow({
	insert: function (userId, doc) {
		if(userId){
			return true;
		}else{
			return false;
		}
	},
	update: function (userId, doc, fields, modifier) {
		if(doc.userId == userId){
			return true;
		}else{
			return false;
		}
	},
	remove: function (userId, doc) {
		if(doc.userId == userId){
			return true;
		}else{
			return false;
		}
	},
});

// Publish
Meteor.publish("messagesPublish", function(){
	if (this.userId){
		return messages.find({}, {sort:{timestamp:-1}, limit:100});
	}else{
		this.ready();
	}
});