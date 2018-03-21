$(document).ready(() => {
  $('.loginButton').on('click', (e) => {
    let loginEmail = document.getElementById('loginEmailInput').value;
    let loginPassword = document.getElementById('loginPasswordInput').value;
    if (loginEmail !== '' && loginPassword !== '') {
      console.log('if statement was triggered');
      $.ajax({
        method: 'POST',
        url: '/login',
        data: {
          email: loginEmail,
          password: loginPassword
        },
        success: () => {
          window.location = window.location.origin;
        },
        error: () => {
          console.log('login failed');
        }
      })
    }
  })
  $('#signupButton').on('click', (e) => {
    if (name && username && email && confirmEmail && password && confirmPassword) {
      $.ajax({
        method: 'POST',
        url: '/signup',
        data: {
          username: username,
          email: email,
          name: name,
          password: password
        },
        success: () => {
          window.location = window.location.origin;
        },
        error: () => {
          console.log('error creating new user');
        }
      })
    }
  })

  let name;
  let username;
  let email;
  let confirmEmail;
  let password;
  let confirmPassword;

  const signupNameInput = document.getElementById('signupNameInput');
  const signupUsernameInput = document.getElementById('signupUsernameInput');
  const signupEmailInput = document.getElementById('signupEmailInput');
  const signupConfirmEmailInput = document.getElementById('signupConfirmEmailInput');

  signupNameInput.onblur = () => {
    if (signupNameInput.value === '') {
      console.log('please provide a name');
    } else if (signupNameInput.value.length > 50) {
      console.log('name must be less than 50 characters long');
    } else {
      name = signupNameInput.value;
      console.log(name);
    }
  }
  signupUsernameInput.onblur = () => {
    if (signupUsernameInput.value === '') {
      console.log('Username field can\'t be blank');
    } else if (signupUsernameInput.value.match(/^[a-zA-Z0-9]+$/)) {
      console.log('this is the correct format');
      username = signupUsernameInput.value;
      console.log(username);
    } else {
      console.log('this is not the correct format');
    }
  }
  signupEmailInput.onblur = () => {
    if (signupEmailInput.value === '') {
      console.log('email must be provided');
    } else if (signupEmailInput.value.match(/\S+@\S+\.\S+/)) {
      console.log('this is the correct form for an email');
      email = signupEmailInput.value.toLowerCase();
    } else {
      console.log('this is not the correct format');
    }
  }
  signupConfirmEmailInput.onblur = () => {
    if (signupConfirmEmailInput.value === '') {
      console.log('please confirm email');
    } else if (signupConfirmEmailInput.value.match(/\S+@\S+\.\S+/) && signupConfirmEmailInput.value.toLowerCase() === email) {
      console.log('email addresses match');
      confirmEmail = signupConfirmEmailInput.value.toLowerCase();
    } else {
      console.log('incorrect');
    }
  }
  signupPasswordInput.onblur = () => {
    if (signupPasswordInput.value === '') {
      console.log('please enter a password');
    } else if (signupPasswordInput.value.match(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)) {
      console.log('successfully created a strong password');
      password = signupPasswordInput.value;
    } else {
      console.log('password must contain a lowercase letter, an uppercase letter, a number, a special symbol (!, @, #, $, %, ^, or &) and must be at least 8 characters long');
    }
  }
  signupConfirmPasswordInput.onblur = () => {
    if (signupConfirmPasswordInput.value === '') {
      console.log('please confirm password');
    } else if (signupPasswordInput.value === signupConfirmPasswordInput.value) {
      console.log('password successfully retyped');
      confirmPassword = signupConfirmPasswordInput.value;
    } else {
      console.log('please make sure that password matches');
    }
  }
})
