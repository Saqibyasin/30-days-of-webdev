const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const subjectInput = document.querySelector('#subject');
const messageInput = document.querySelector('#message');
const charCount = document.querySelector('#char-count');
const submitBtn = document.querySelector('#submit-btn');
const successMsg = document.querySelector('#success-msg');


const validators = {
  name: {
    validate: (value) => value.trim().length >= 3,
    message: 'Name must be at least 3 characters!'
  },
  email: {
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Please enter a valid email address!'
  },
  subject: {
    validate: (value) => value.trim().length >= 5,
    message: 'Subject must be at least 5 characters!'
  },
  message: {
    validate: (value) => value.trim().length >= 20,
    message: 'Message must be at least 20 characters!'
  }
};

function validateField(input){
  const fieldName = input.id;
  const value = input.value;
  const group = document.querySelector(`#${fieldName}-group`);
  const errorEl = document.querySelector(`#${fieldName}-error`);
  const validator = validators[fieldName];

  if(!validator) return true;

  const isValid = validator.validate(value);

  if(value.trim() === ''){
    group.classList.remove('error');
    errorEl.textContent = '';
    return false;
  }

  if(isValid){
    group.classList.remove('invalid');
    group.classList.add('valid');
    errorEl.textContent = '';
  }
  else{
    group.classList.remove('valid');
    group.classList.add('invalid');
    errorEl.textContent = validator.message;
  }
  return isValid;
}


function updateCharCount(){
  const count = messageInput.value.length;
  charCount.textContent = `${count}/500`;
  charCount.classList.remove('danger','warning');
  if(count >= 400){
    charCount.classList.add('danger');
  }
  else if(count>= 300){
    charCount.classList.add('warning');
  }

}

function isformValid(){
    const nameValid = validators.name.validate(nameInput.value);
    const emailValid = validators.email.validate(emailInput.value);
    const subjectValid = validators.subject.validate(subjectInput.value);
    const messageValid = validators.message.validate(messageInput.value);
    return nameValid && emailValid && subjectValid && messageValid;
}

nameInput.addEventListener('input', () => validateField(nameInput));
emailInput.addEventListener('input', () => validateField(emailInput));
subjectInput.addEventListener('input', () => validateField(subjectInput));
messageInput.addEventListener('input', () => {
  validateField(messageInput);
  updateCharCount();
});


nameInput.addEventListener('input', () => validateField(nameInput));
emailInput.addEventListener('input', () => validateField(emailInput));
subjectInput.addEventListener('input', () => validateField(subjectInput));
messageInput.addEventListener('input', () => {
  validateField(messageInput);
  updateCharCount();
});

nameInput.addEventListener('blur', () => validateField(nameInput));
emailInput.addEventListener('blur', () => validateField(emailInput));
subjectInput.addEventListener('blur', () => validateField(subjectInput));
messageInput.addEventListener('blur', () => validateField(messageInput));

form.addEventListener('submit', function(e) {
  e.preventDefault();

 
  const nameValid = validateField(nameInput);
  const emailValid = validateField(emailInput);
  const subjectValid = validateField(subjectInput);
  const messageValid = validateField(messageInput);

  if (!nameValid || !emailValid || !subjectValid || !messageValid) {
    return;
  }


  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending... ⏳';

  setTimeout(() => {
    form.classList.add('hidden');
    successMsg.classList.remove('hidden');
  }, 1500);
});