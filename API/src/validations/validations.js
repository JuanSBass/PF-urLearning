//////////// Regex Email /////////////
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//////////// Regex Password /////////////
const uppercase = /(?=.*[A-Z])/;
const numericValue = /(?=.*[0-9])/;
const maxCharcters = /(?=.{8,12})/; //Must contain between 8 and 12 charcters

//////////// Validation Email /////////////

const validateEmail = async (email) => {
  if (!email.match(regexEmail)) {
    console.log(email);
  }
};

//////////// Validation Password /////////////
const validatePassword = async (password) => {
  if (
    !password.match(uppercase) &&
    !password.match(numericValue) &&
    !password.match(maxCharcters)
  ) {
    console.log(password);
  }
};

module.exports = { validateEmail, validatePassword };
