const ERROR_BORDER_COLOR = "hsl(354, 84%, 57%)";
const CORRECT_BORDER_COLOR = "hsl(243, 100%, 62%)";

let ind = 0;
let validName = true;
let validEmail = true;
let validPhone = true;
let selectedPlan = "Arcade (Monthly)";
let selectedPlanPriceValue = "$9/mo";
let planMode = "monthly";
let price = 0;
let totalPrice = 9; // Initial price without any additional services
/*-------------------Selecting DOM Elements---------------------------*/
const stepIcons = document.querySelectorAll(".step-icon");
const forms = document.querySelectorAll(".form");
const btnBox = document.querySelector(".btns");
const nextBtn = document.querySelector(".next-btn");
const backBtn = document.querySelector(".back-btn");
const nameInput = document.querySelector("#Name");
const emailInput = document.querySelector("#Email");
const phoneInput = document.querySelector("#Phone");
const nameError = document.querySelector(".name-error");
const emailError = document.querySelector(".email-error");
const phoneError = document.querySelector(".phone-error");
const plans = document.querySelectorAll(".plan");
const monthlyMode = document.querySelector("#monthly");
const yearlyMode = document.querySelector("#yearly");
const monthlyLabel = document.querySelector(".monthly");
const yearlyLabel = document.querySelector(".yearly");
const frees = document.querySelectorAll(".free");
const selectedPlanName = document.querySelector(".selected-plan-name");
const selectedPlanPrice = document.querySelector(".selected-plan-price");
const planPrices = document.querySelectorAll(".plan-price");
const servicesPrices = document.querySelectorAll(".service-price");
const changeBtn = document.querySelector(".change");
const totalPriceElement = document.querySelector(".total-price");

/*---------------Name validation logic------------------------*/
const validateName = () => {
  let nameValue = nameInput.value.trim();
  let nameReg = /^[A-Za-z]+\s[A-Za-z]+$/;

  if (nameValue === "") {
    nameError.textContent = "This field is required";
    nameError.style.display = "block";
    nameInput.style.border = `2px solid ${ERROR_BORDER_COLOR}`;
    validName = false;
  } else if (!nameReg.test(nameValue)) {
    nameError.textContent = "Provide valid fullname";
    nameError.style.display = "block";
    nameInput.style.border = `2px solid ${ERROR_BORDER_COLOR}`;
    validName = false;
  } else {
    nameError.style.display = "none";
    nameInput.style.border = `2px solid ${CORRECT_BORDER_COLOR}`;
    validName = true;
  }
};
/*---------------Email validation logic------------------------*/
const validateEmail = () => {
  let emailValue = emailInput.value.trim();
  let emailReg = /^[A-Za-z0-9]+\@[A-Za-z]+\.[A-Za-z]+$/;

  if (emailValue === "") {
    emailError.textContent = "This field is required";
    emailError.style.display = "block";
    emailInput.style.border = `2px solid ${ERROR_BORDER_COLOR}`;
    validEmail = false;
  } else if (!emailReg.test(emailValue)) {
    emailError.textContent = "Provide valid Email";
    emailError.style.display = "block";
    emailInput.style.border = `2px solid ${ERROR_BORDER_COLOR}`;
    validEmail = false;
  } else {
    emailError.style.display = "none";
    emailInput.style.border = `2px solid ${CORRECT_BORDER_COLOR}`;
    validEmail = true;
  }
};
/*---------------Phone validation logic------------------------*/
const validatePhone = () => {
  let phoneValue = phoneInput.value.trim();
  let phoneReg = /^\+\d{1,3} \d{3} \d{3} \d{3}$/;

  if (phoneValue === "") {
    phoneError.textContent = "This field is required";
    phoneError.style.display = "block";
    phoneInput.style.border = `2px solid ${ERROR_BORDER_COLOR}`;
    validPhone = false;
  } else if (!phoneReg.test(phoneValue)) {
    phoneError.textContent = "Provide valid phone";
    phoneError.style.display = "block";
    phoneInput.style.border = `2px solid ${ERROR_BORDER_COLOR}`;
    validPhone = false;
  } else {
    phoneError.style.display = "none";
    phoneInput.style.border = `2px solid ${CORRECT_BORDER_COLOR}`;
    validPhone = true;
  }
};

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", () => {
  validateName();
  validateEmail();
});
phoneInput.addEventListener("input", () => {
  validateName();
  validateEmail();
  validatePhone();
});
/*---------------------Next Btn click logic--------------------*/
nextBtn.addEventListener("click", () => {
  if (!validName) {
    nameError.style.display = "block";
  } else if (!validEmail) {
    emailError.style.display = "block";
  } else if (!validPhone) {
    phoneError.style.display = "block";
  }

  if (ind + 1 < stepIcons.length && validName && validEmail && validPhone) {
    backBtn.classList.remove("hidden");
    stepIcons[ind].classList.toggle("active");
    forms[ind].classList.toggle("active");
    ind++;
    stepIcons[ind].classList.toggle("active");
    forms[ind].classList.toggle("active");
    if (ind == 3) {
      nextBtn.textContent = "Confirm";
      nextBtn.style.backgroundColor = "hsl(243, 100%, 62%)";
      selectedPlanName.textContent = selectedPlan;
      selectedPlanPrice.textContent = selectedPlanPriceValue;
    }
  } else if (validName && validEmail && validPhone) {
    btnBox.style.display = "none";
    forms[ind].classList.toggle("active");
    forms[ind + 1].classList.toggle("active");
  }
});
/*---------------------Back Btn click logic--------------------*/
backBtn.addEventListener("click", () => {
  if (ind != 0) {
    stepIcons[ind].classList.toggle("active");
    forms[ind].classList.toggle("active");
    ind--;
    stepIcons[ind].classList.toggle("active");
    forms[ind].classList.toggle("active");
    if (ind < 3) {
      nextBtn.textContent = "Next Step";
      nextBtn.style.backgroundColor = " hsl(213, 96%, 18%)";
    }
  }
  if (ind == 0) {
    backBtn.classList.add("hidden");
  }
});
/*---------------------Change Btn click logic--------------------*/
changeBtn.addEventListener("click", () => {
  stepIcons[ind].classList.toggle("active");
  forms[ind].classList.toggle("active");
  ind = ind - 2;
  forms[ind].classList.toggle("active");
  stepIcons[ind].classList.toggle("active");
  if (ind < 3) {
    nextBtn.textContent = "Next Step";
    nextBtn.style.backgroundColor = " hsl(213, 96%, 18%)";
  }
});
/*---------------------Yearly mode logic--------------------*/
yearlyMode.addEventListener("input", () => {
  if (planMode == "monthly") {
    selectedPlan = selectedPlan.replace("Monthly", "Yearly");
  }
  planMode = "yearly";
  updatePlanPrice(planMode);
  yearlyLabel.style.color = "hsl(213, 96%, 18%)";
  monthlyLabel.style.color = "hsl(231, 11%, 63%)";
  frees.forEach((free) => {
    free.style.display = "block";
  });
  price *= 10;
  updateTotalPrice();
  updateServices(planMode);
});
/*---------------------monthly mode logic--------------------*/
monthlyMode.addEventListener("input", () => {
  if (planMode == "yearly") {
    selectedPlan = selectedPlan.replace("Yearly", "Monthly");
  }
  planMode = "monthly";
  updatePlanPrice(planMode);
  monthlyLabel.style.color = "hsl(213, 96%, 18%)";
  yearlyLabel.style.color = "hsl(231, 11%, 63%)";
  frees.forEach((free) => {
    free.style.display = "none";
  });
  price /= 10;
  updateTotalPrice();
  updateServices(planMode);
});
/*---------------------Plan Selection logic--------------------*/
const selectPlan = (plan, index) => {
  plans.forEach((plan) => {
    plan.classList.remove("active");
  });
  plan.classList.add("active");
  updatePlan(plan, index, planMode);
};

plans.forEach((plan, index) => {
  plan.addEventListener("click", () => {
    selectPlan(plan, index);
  });
});

const updatePlan = (plan, index, planMode) => {
  selectedPlan = plan.dataset.mode;
  if (planMode == "yearly") {
    selectedPlan += ` (Yearly)`;
  } else if (planMode == "monthly") {
    selectedPlan += ` (Monthly)`;
  }
  selectedPlanPriceValue = planPrices[index].textContent;
  updatePlanPrice(planMode);
};

const updatePlanPrice = (planMode) => {
  if (planMode == "yearly") {
    planPrices[0].textContent = `$90/yr`;
    planPrices[1].textContent = `$120/yr`;
    planPrices[2].textContent = `$150/yr`;
    servicesPrices[0].textContent = `+$10/yr`;
    servicesPrices[1].textContent = `+$20/yr`;
    servicesPrices[2].textContent = `+$20/yr`;
  } else if (planMode == "monthly") {
    planPrices[0].textContent = `$9/mo`;
    planPrices[1].textContent = `$12/mo`;
    planPrices[2].textContent = `$15/mo`;
    servicesPrices[0].textContent = `+$1/mo`;
    servicesPrices[1].textContent = `+$2/mo`;
    servicesPrices[2].textContent = `+$2/mo`;
  }
  updateSelectedPlanPriceValue();
  updateTotalPrice();
};

const plansArray = Array.from(plans);

const updateSelectedPlanPriceValue = () => {
  const selectedPlanIndex = plansArray.findIndex((plan) =>
    plan.classList.contains("active")
  );
  if (selectedPlanIndex != -1) {
    selectedPlanPriceValue = planPrices[selectedPlanIndex].textContent;
  }
};

const updateTotalPrice = () => {
  console.log(price);
  totalPrice = parseInt(
    selectedPlanPriceValue
      .replace("$", "")
      .replace("/mo", "")
      .replace("/yr", ""),
    10
  );
  if (selectedPlanPriceValue.includes("yr")) {
    totalPriceElement.textContent = `$${totalPrice + price}/yr`;
  } else totalPriceElement.textContent = `$${totalPrice + price}/mo`;
};

updateTotalPrice(); // Update total price initially
const selectedServicesNamesArray = [];
const selectedServicesPriceArray = [];
const services = document.querySelectorAll(".service");
const checkBoxes = document.querySelectorAll(".service-group input");

/*---------------------CheckBox services logic--------------------*/
checkBoxes.forEach((checkbox, index) => {
  checkbox.addEventListener("change", () => {
    services[index].classList.toggle("active");
    const isChecked = checkbox.checked;
    let serviceName = checkbox.nextElementSibling.firstElementChild.textContent;
    let servicePrice = parseInt(
      checkbox.parentElement.nextElementSibling.textContent
        .replace("+$", "")
        .replace("/mo", "")
        .replace("/yr", ""),
      10
    );
    if (isChecked) {
      selectedServicesNamesArray.push(serviceName);
      price += parseInt(
        checkbox.parentElement.nextElementSibling.textContent
          .replace("+$", "")
          .replace("/mo", ""),
        10
      );
      selectedServicesPriceArray.push(servicePrice);
      updateServices(planMode);
    } else {
      const elementToRemove = serviceName;
      for (let i = 0; i < selectedServicesNamesArray.length; i++) {
        if (selectedServicesNamesArray[i] == elementToRemove) {
          selectedServicesNamesArray.splice(i, 1);
          i--;
        }
      }
      price -= parseInt(
        checkbox.parentElement.nextElementSibling.textContent
          .replace("+$", "")
          .replace("/mo", ""),
        10
      );
      const elementToRemove2 = servicePrice;
      for (let i = 0; i < selectedServicesPriceArray.length; i++) {
        if (selectedServicesPriceArray[i] == elementToRemove2) {
          selectedServicesPriceArray.splice(i, 1);
          break;
        }
      }
      updateServices(planMode);
    }
    console.log(selectedServicesNamesArray);
    console.log(selectedServicesPriceArray);
    updateTotalPrice();
  });
});

/*---------------------Selected Service update logic--------------------*/
const selectedServicesNames = document.querySelectorAll(
  ".selected-service-name"
);
const selectedServices = document.querySelectorAll(".selected-service");
const updateServices = (planMode) => {
  selectedServices.forEach((item) => {
    item.innerHTML = "";
  });
  if (planMode == "yearly") {
    for (let index = 0; index < selectedServicesNamesArray.length; index++) {
      selectedServices[index].innerHTML = ` <p class="selected-service-name">${
        selectedServicesNamesArray[index]
      }</p>
         <p class="seleted-service-price">${
           "+$" + selectedServicesPriceArray[index] * 10 + "/yr"
         }</p>`;
    }
  } else if (planMode == "monthly") {
    for (let index = 0; index < selectedServicesNamesArray.length; index++) {
      selectedServices[index].innerHTML = ` <p class="selected-service-name">${
        selectedServicesNamesArray[index]
      }</p>
         <p class="seleted-service-price">${
           "+$" + selectedServicesPriceArray[index] + "/mo"
         }</p>`;
    }
  }
};
updateServices(planMode);
