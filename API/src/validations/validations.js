/////////////////////// USER ////////////////////////

//////////// Regex Email /////////////
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//////////// Regex Password /////////////
const uppercase = /(?=.*[A-Z])/;
const numericValue = /(?=.*[0-9])/;
const maxCharcters = /(?=.{8,12})/; //Must contain between 8 and 12 charcters

//////////// Validation Email /////////////
const validateEmail = async (email) => {
  //si no matchea
  if (!email.match(regexEmail)) {
    return false;
  } else {
    return true;
  }
};

//////////// Validation Password /////////////
const validatePassword = async (password) => {
  if (
    !password.match(uppercase) ||
    !password.match(numericValue) ||
    !password.match(maxCharcters)
  ) {
    return false;
  } else {
    return true;
  }
};

/////////////////////// COURSE ////////////////////////

//////////// Regex Title /////////////
const maxLengthTitle = /(?=.{5,20})/; ///Must contain between 5 and 20 charcters

//////////// Validation Title /////////////
const validateTitle = async (title) => {
  if (!title.match(maxLengthTitle)) {
    return false;
  } else {
    return true;
  }
};

//////////// Validation Description /////////////
const validateDescription = async (description) => {
  if (description.length <= 15 || description.length >= 200) {
    return false;
  } else {
    return true;
  }
};

//////////// Validation Price /////////////
const validatePrice = async (price) => {
  let priceNew = parseInt(price);
  if (priceNew < 0 || priceNew > 100) {
    return false;
  } else {
    return true;
  }
};

//////////// Validation Level /////////////
const validateLevel = async (level) => {
  if (level !== "easy" && level !== "medium" && level !== "advanced") {
    return false;
  } else {
    return true;
  }
};

//////////// Validation name_prof /////////////
const validateNameProf = async (name_prof) => {
  if (!name_prof.match(maxLengthTitle)) {
    return false;
  } else {
    return true;
  }
};

module.exports = {
  validateEmail,
  validatePassword,
  validateTitle,
  validateDescription,
  validatePrice,
  validateLevel,
  validateNameProf,
};
