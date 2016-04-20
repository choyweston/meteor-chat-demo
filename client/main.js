//Boilerplate de Meteor
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

// chatForm constructor
Template.chatForm.onCreated(function(){
	var instance = this;
	instance.subscribe("messagesPublish");
});

// chatForm events
Template.chatForm.events({
	'click button': function (e, t) {
		var text = t.$("#chatBox").val();

		t.$("#chatBox").val("");

		messages.insert({
			"text" : text,
			"userId" : Meteor.userId(),
			"authorName" : Meteor.user().profile.name,
			"timestamp" : new Date()
		});
	},
	'keydown #chatBox': function (e, t) {
		if(e.which == 13){
			t.$("button").click();
		}
	}
});

// messageList Helpers
Template.messageList.helpers({
	messages: function () {
		return messages.find({}, {sort:{timestamp:-1}});
	}
});