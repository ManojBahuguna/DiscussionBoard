import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';

import './main.html';

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
    if(password === confirm){
      //create new  user
      Accounts.createUser({
        email,
        password
      }, (err) => {
        if(err)
          alert(`SignUp Failed! Reason: ${err.reason}` );
      });
    }

  }
});
