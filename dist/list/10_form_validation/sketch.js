const inputs = document.querySelectorAll('input');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

function showError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = "form-control error";
  small.innerText = message;
}

// check email is valid
function checkEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(String(email.value).toLowerCase())) {
    showSuccess(email);
  } else {
    showError(email, 'Email is invalid');
  }
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkRequired(input) {
  if (!input.value.trim()) {
      showError(input, `${getFieldName(input)} is required`)
    } else {
      showSuccess(input);
    }
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} charactors`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} charactors`);
  } else {
    showSuccess(input);
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
})

inputs.forEach(input => {
  input.addEventListener('input', (e) => {
    checkRequired(e.target);
  });
});
username.addEventListener('input', (e) => {
  checkLength(username, 3, 15);
});
password.addEventListener('input', (e) => {
  checkLength(password, 6, 125);
});
email.addEventListener('input', (e) => {
  checkEmail(email);
});
password2.addEventListener('input', (e) => {
  if (password.value && password2.value) {
    checkPasswordsMatch(password,password2);
  }
});