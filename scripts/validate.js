// функция показывает ошибку ввода
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    // Заменим содержимое span с ошибкой на переданный параметр
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
  };

//функция  прячет сообщение об ошибке, если ошибки нет
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  // Очистим ошибку
  errorElement.textContent = '';
};

//проверить валидно ли поле
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit-button_inactive');
  } else {
    buttonElement.classList.remove('popup__submit-button_inactive');
  }
};

//установить обработчик события инпут на все поля ввода
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit-button');
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
    isValid(formElement, inputElement);
    toggleButtonState(inputList, buttonElement);
    });
  });
};  

//перебрать все формы, чтобы всем добавить слушатель submit
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation();

// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
//   }); 
  


// //выбрать формы
// const editProfileForm = document.forms.profile;
// const addPlaceForm = document.forms.place;


// const checkInputValidity = (input) => {
//     return input.checkValidity();
// }

// const validateInput = (input) => {
//     const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
//     checkInputValidity(input);
//     errorElement.textContent = input.validationMessage;
// };

// //функция обрабатывает инпут
// const handleInput = (evt) => {
//     const currentForm = evt.currentTarget;
//     const input = evt.target;

//     validateInput(input);
// };

// //функция обрабатывает нажатие кнопки сабмит
// const handleSubmit = (evt) => {
//     evt.preventDefault();
//     const currentForm = evt.target;
//     if (currentForm.chackValidity()) {
//         currentForm.reset();
//     }
// };

// //добавить слушатель нажатия кнопки сабмит
// editProfileForm.addEventListener('submit', handleSubmit);
// addPlaceForm.addEventListener('submit', handleSubmit);

// editProfileForm.addEventListener('input', handleInput);
// addPlaceForm.addEventListener('input', handleInput);


// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
//   }); 