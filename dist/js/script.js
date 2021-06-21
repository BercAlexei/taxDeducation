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
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_begin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/begin */ "./src/js/modules/begin.js");



document.addEventListener('DOMContentLoaded', function () {
  var income = document.querySelector('#income'),
      btnAdd = document.querySelector('.btn_form'),
      error = document.querySelector('.error'),
      form = document.querySelector('form'),
      btnIncome = document.querySelector('.btn_income'),
      checkListIncome = document.querySelector('.form__payment'),
      checkList = checkListIncome.querySelector('ul'),
      errorText = {
    clear: 'Поле обязательно для заполнения',
    notValid: 'Введитие свой официальный доход цифрами',
    notIncome: 'Мы Вам рекомендуем найти работу'
  };
  var summ = 0;

  function disableBtn() {
    if (summ !== 0 && summ > 0) {
      btnAdd.removeAttribute('disabled');
    } else {
      btnAdd.setAttribute('disabled', true);
    }
  }

  disableBtn();
  checkList.addEventListener('click', function (event) {
    if (event.target.getAttribute('data-check') == '') {
      if (event.target.checked == true) {
        summ += Number(event.target.nextSibling.nextSibling.childNodes[0].innerHTML.match(/\d+/g));
      } else {
        summ -= Number(event.target.nextSibling.nextSibling.childNodes[0].innerHTML.match(/\d+/g));
      }
    }

    disableBtn();
  });

  function removeCheckList(container) {
    container.forEach(function (item) {
      item.remove();
    });
  }

  function valid(text, remove, add, color) {
    error.textContent = text;
    error.classList.remove(remove);
    error.classList.add(add);
    income.style.border = "1px solid ".concat(color);
  }

  function payment() {
    var paymentCheck = document.querySelectorAll('.form__payment-check');

    if (income.value == 0) {
      valid(errorText.notIncome, 'hidden', 'show', 'var(--main-color)');
      checkListIncome.classList.remove('show');
      checkListIncome.classList.add('hidden');
      summ = 0;
      disableBtn();
      removeCheckList(paymentCheck);
    } else {
      var maxTaxDeduction = 260000,
          incomeYear = income.value * 12 * 0.13,
          arrTaxDeducation = [],
          amountOfElements = Math.floor(maxTaxDeduction / incomeYear);
      summ = 0;

      for (var i = 0; i < amountOfElements; i++) {
        arrTaxDeducation.push(incomeYear);
      }

      arrTaxDeducation.push(maxTaxDeduction % incomeYear);
      removeCheckList(paymentCheck);

      for (var _i = 0; _i < arrTaxDeducation.length; _i++) {
        var checkIncomeYear = document.createElement('li');
        checkIncomeYear.classList.add('form__payment-check');
        checkIncomeYear.innerHTML = "\n                    <input type=\"checkbox\" data-check>\n                    <div class=\"form__payment-check-text\"><span>".concat(Math.floor(arrTaxDeducation[_i]), " \u0440\u0443\u0431\u043B\u0435\u0439</span> \u0432 ").concat(_i + 1, "-\u044B\u0439 \u0433\u043E\u0434</div>\n                ");

        if (_i + 1 === 2) {
          checkIncomeYear.innerHTML = "\n                    <input type=\"checkbox\" data-check>\n                    <div class=\"form__payment-check-text\"><span>".concat(Math.floor(arrTaxDeducation[_i]), " \u0440\u0443\u0431\u043B\u0435\u0439</span> \u0432\u043E ").concat(_i + 1, "-\u044B\u0439 \u0433\u043E\u0434</div>\n                ");
        }

        checkList.append(checkIncomeYear);
      }

      checkListIncome.classList.remove('hidden');
      checkListIncome.classList.add('show');
    }
  }

  btnIncome.addEventListener('click', function (event) {
    event.preventDefault();

    switch (true) {
      case income.validity.valueMissing:
        valid(errorText.clear, 'hidden', 'show', 'var(--main-color)');
        break;

      case income.value.search(/\D/g) >= 0:
        valid(errorText.notValid, 'hidden', 'show', 'var(--main-color)');
        break;

      default:
        valid('', 'show', 'hidden', '#DFE3E6');
        payment();
    }
  });
  var modal = document.querySelector('.modal'),
      modalClose = document.querySelector('.modal__close'),
      modalOkBtn = document.querySelector('.btn_modal'),
      spanModal = document.querySelector('.modal__text span');
  modalClose.addEventListener('click', function (event) {
    event.preventDefault();
    modal.classList.remove('show');
    modal.classList.add('hidden');
  });
  modalOkBtn.addEventListener('click', function (event) {
    event.preventDefault();
    modal.classList.remove('show');
    modal.classList.add('hidden');
  });
  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.classList.remove('show');
      modal.classList.add('hidden');
    }
  });
  document.addEventListener('keydown', function (event) {
    if (event.code === 'Escape') {
      modal.classList.remove('show');
      modal.classList.add('hidden');
    }
  });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    modal.classList.remove('hidden');
    modal.classList.add('show');
    spanModal.textContent = summ;
  });
  Object(_modules_begin__WEBPACK_IMPORTED_MODULE_0__["default"])();
});

/***/ }),

/***/ "./src/js/modules/begin.js":
/*!*********************************!*\
  !*** ./src/js/modules/begin.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return begin; });
function begin() {
  var btn = document.querySelector('#begin'),
      disp = document.querySelector('.begin'),
      close = document.querySelector('.tax__close');
  btn.addEventListener('click', function () {
    disp.classList.add('close');
  });
  close.addEventListener('click', function () {
    disp.classList.remove('close');
  });
}

/***/ })

/******/ });
//# sourceMappingURL=script.js.map