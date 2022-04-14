// функция показывает ошибку ввода
const showInputError = (formElement, inputElement, errorMessage, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${obj.inputErrorClass}`);
    // Заменим содержимое span с ошибкой на переданный параметр
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${obj.errorClass}`);
  };

//функция  прячет сообщение об ошибке, если ошибки нет
const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${obj.inputErrorClass}`);
  errorElement.classList.remove(`${obj.errorClass}`);
  // Очистим ошибку
  errorElement.textContent = '';
};

//проверить валидно ли поле
const isValid = (formElement, inputElement, obj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, obj) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${obj.inactiveButtonClass}`);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(`${obj.inactiveButtonClass}`);
    buttonElement.disabled = false;
  }
};

//установить обработчик события инпут на все поля ввода
const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(`${obj.inputSelector}`));
  const buttonElement = formElement.querySelector(`${obj.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, obj);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
    isValid(formElement, inputElement, obj);
    toggleButtonState(inputList, buttonElement, obj);
    });
  });
};  

//перебрать все формы, чтобы всем добавить слушатель submit
const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(`${obj.formSelector}`));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
    });

    setEventListeners(formElement, obj);
  });
};

enableValidation({
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  });