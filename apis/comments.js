import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Comments = new Mongo.Collection('comments');
 
Meteor.methods({
  'comments.add'(text) {
    check(text, String);
 
    // Make sure the user is logged in before adding comment
    if (! Meteor.userId()) {
      throw new Meteor.Error('Not Authorized! Please Login First!');
    }
    
    // Add the comment
    Comments.insert({
      text,
      createdAt: new Date(),
      userId: Meteor.userId(),
      userEmail: Meteor.user().emails[0].address,
    });
  },
  'comments.get'() {
    // Make sure the user is logged in before adding comment
    if (! Meteor.userId()) {
      throw new Meteor.Error('Not Authorized! Please Login First!');
    }
    
    // return all comments
    return Comments.find({}, {sort: {createdAt: -1}}).fetch();
  }
});