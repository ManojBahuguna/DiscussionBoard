import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';

import './main.html';

Template.comments.helpers({
  comments(){
    //fetch and return comments
    return Meteor.apply('comments.get', [], { returnStubValue: true });
  }
});

//comment events
Template.comments.events({
  'submit form'(e){
    // prevent page from redirect
    e.preventDefault();
    
    const comment = e.target.comment.value;
    
    Meteor.call('comments.add', comment, err => {
      if(err)
        alert(`Comment not added! Reason: ${err.reason}` );
    });

    //reset form
    e.target.reset();
  }
});

//login form submit event
Template.login.events({
  'submit form'(e){
    //prevent from page redirect
    e.preventDefault();
    
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    
    //login user
    Meteor.loginWithPassword(email, password, (err)=> {
      if(err)
        alert(`Login Failed! Reason: ${err.reason}` );
    });
  }
});

//register form submit event
Template.register.events({
  'submit form'(e){
    //prevent from page redirect
    e.preventDefault();
    
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirmPassword.value;

    //check if password matches with confirm-password
    if(password !== confirm){
      alert('SignUp Failed! Reason: Passwords do not match!');
      return;
    }
    
    //create new  user
    Accounts.createUser({
      email,
      password
    }, (err) => {
      if(err)
        alert(`SignUp Failed! Reason: ${err.reason}` );
    });
  }
});

Template.logout.events({
  'click .logout-btn'(e){
    //prevent page from redirect
    e.preventDefault();

    //logout user
    Meteor.logout();
  }
});
