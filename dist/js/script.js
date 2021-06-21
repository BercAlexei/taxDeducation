/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/_script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/_script.js":
/*!***************************!*\
  !*** ./src/js/_script.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.addEventListener('DOMContentLoaded', function () {
  //begin
  var btn = document.querySelector('#begin'),
      disp = document.querySelector('.begin'),
      close = document.querySelector('.tax__close');
  btn.addEventListener('click', function () {
    disp.classList.toggle('close');
  });
  close.addEventListener('click', function () {
    disp.classList.toggle('close');
    setTimeout(function () {
      summTax = 0;
      disableBtn();
      shower('show', 'hidden');
      inputIncome.value = '';
    }, 1000);
  }); //payment

  var inputIncome = document.querySelector('#income'),
      incomeBtn = document.querySelector('.btn_income'),
      btnForm = document.querySelector('.btn_form'),
      paymentList = document.querySelector('.form__payment'),
      paymentCheckList = paymentList.querySelector('ul'),
      paymentCheckInput = paymentCheckList.querySelector('span'),
      error = document.querySelector('.error'),
      form = document.querySelector('form'),
      errorText = {
    clear: 'Поле обязательно для заполнения',
    notValid: 'Введитие свой официальный доход цифрами',
    notIncome: 'Мы Вам рекомендуем найти работу'
  }; // переменная, которая сумирует выделеные чекбоксы

  var summTax = 0; // функция, которая показывает чекбоксы 

  function shower(remove, show) {
    paymentList.classList.remove(remove);
    paymentList.classList.add(show);
  } // фнкция валидации формы


  function valid(text, remove, add, color) {
    error.textContent = text;
    error.classList.remove(remove);
    error.classList.add(add);
    inputIncome.style.border = "1px solid ".concat(color);
  } // функция, которая очищает поле при каждом поиске


  function removeItem(groupItem) {
    groupItem.forEach(function (item) {
      item.remove();
    });
  } //функция которая делает кнопку неактивной или активной


  function disableBtn() {
    if (summTax !== 0 && summTax > 0) {
      btnForm.removeAttribute('disabled');
    } else {
      btnForm.setAttribute('disabled', true);
    }
  }

  disableBtn(); // делаем расчет

  function payment() {
    //создаем массив в который помещаем ежегодные выплаты 
    var taxOfYear = inputIncome.value * 12 * 0.13,
        maxTax = 260000,
        annualPayment = [],
        amountOfElements = Math.floor(maxTax / taxOfYear); // обнуляем сумму, чтобы от двух разных запросов не суммировались выделенные чекбоксы     

    summTax = 0; // вызываем функцию, чтобы при повторном поиске кнопка снова становилась неактивной

    disableBtn();

    for (var i = 0; i < amountOfElements; i++) {
      annualPayment.push(taxOfYear);
    }

    annualPayment.push(maxTax % taxOfYear);
    removeItem(paymentCheckList.querySelectorAll('.form__payment-check')); //создаем чекбоксы

    annualPayment.forEach(function (item, i) {
      var checkIncomeYear = document.createElement('li');
      checkIncomeYear.classList.add('form__payment-check');
      checkIncomeYear.innerHTML = "\n                <input type=\"checkbox\" data-check>\n                <div class=\"form__payment-check-text\"><span>".concat(Math.floor(item), " \u0440\u0443\u0431\u043B\u0435\u0439</span> \u0432 ").concat(i + 1, "-\u044B\u0439 \u0433\u043E\u0434</div>\n            ");
      paymentCheckList.append(checkIncomeYear);
      shower('hidden', 'show');
    });
  } //суммируем выделенные чекбоксы


  paymentCheckList.addEventListener('click', function (event) {
    switch (true) {
      case event.target.getAttribute('data-check') == '' && event.target.checked:
        summTax += Number(event.target.nextSibling.nextSibling.childNodes[0].innerHTML.match(/\d+/g));
        break;

      case event.target.getAttribute('data-check') == '' && !event.target.checked:
        summTax -= Number(event.target.nextSibling.nextSibling.childNodes[0].innerHTML.match(/\d+/g));
        break;
    }

    disableBtn();
  });
  incomeBtn.addEventListener('click', function (event) {
    event.preventDefault();

    switch (true) {
      case inputIncome.validity.valueMissing:
        valid(errorText.clear, 'hidden', 'show', 'var(--main-color)');
        shower('show', 'hidden');
        break;

      case inputIncome.value == 0:
        valid(errorText.notIncome, 'hidden', 'show', 'var(--main-color)');
        shower('show', 'hidden');
        break;

      case inputIncome.value.search(/\D/g) >= 0:
        valid(errorText.notValid, 'hidden', 'show', 'var(--main-color)');
        shower('show', 'hidden');
        break;

      default:
        valid('', 'show', 'hidden', '#DFE3E6');
        payment();
    }
  }); // modal

  var modal = document.querySelector('.modal'),
      modalCloseBtn = document.querySelector('.modal__close'),
      modalOkBtn = document.querySelector('.btn_modal'),
      spanModal = document.querySelector('.modal__text span');

  function modalClose() {
    modal.classList.remove('show');
    modal.classList.add('hidden');
  }

  function modalOpen() {
    modal.classList.remove('hidden');
    modal.classList.add('show');
  }

  modal.addEventListener('click', function (event) {
    if (event.target === modal || event.target === modalOkBtn || event.target === modalCloseBtn) {
      modalClose();
    }
  });
  document.addEventListener('keydown', function (event) {
    if (event.code === 'Escape') {
      modalClose();
    }
  });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    modalOpen();
    spanModal.textContent = summTax;
  });
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map