'use strict';

window.addEventListener('DOMContentLoaded', () => {
    //begin
    const btn = document.querySelector('#begin'),
          disp = document.querySelector('.begin'),
          close = document.querySelector('.tax__close');

    btn.addEventListener('click', () => {
        disp.classList.toggle('close');
    });

    close.addEventListener('click', () => {
        disp.classList.toggle('close');
        setTimeout(() => {
            summTax = 0;
            disableBtn();
            shower('show', 'hidden');
            inputIncome.value = '';
        }, 800);
    });

    //payment
    const inputIncome = document.querySelector('#income'),
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
            notIncome: 'Мы Вам рекомендуем найти работу',
            livingWage: 'Доход не может быть меньше 12 702р.'
          };
    // переменная, которая сумирует выделеные чекбоксы
    let summTax = 0;
    // функция, которая показывает чекбоксы 
    function shower(remove, show) {
        paymentList.classList.remove(remove);
        paymentList.classList.add(show);
    }
    // фнкция валидации формы
    function valid(text, remove, add, color) {
        error.textContent = text;
        error.classList.remove(remove);
        error.classList.add(add);
        inputIncome.style.border = `1px solid ${color}`;
    }
    // функция, которая очищает поле при каждом поиске
    function removeItem(groupItem) {
        groupItem.forEach(item => {
            item.remove();
        });
    }
    //функция которая делает кнопку неактивной или активной
    function disableBtn() {
        if (summTax !== 0 && summTax > 0) {
            btnForm.removeAttribute('disabled');
        } else {
            btnForm.setAttribute('disabled', true);
        }
    }

    function zeroSummTax() {
        // обнуляем сумму, чтобы от двух разных запросов не суммировались выделенные чекбоксы  
        summTax = 0;
        // вызываем функцию, чтобы при повторном поиске кнопка снова становилась неактивной
        disableBtn();
    }

    disableBtn();
    // делаем расчет
    function payment() {
        //создаем массив в который помещаем ежегодные выплаты 
        const taxOfYear = inputIncome.value * 12 * 0.13,
              maxTax = 260000,              
              annualPayment = [],
              amountOfElements = Math.floor(maxTax / taxOfYear);

        zeroSummTax();

        for( let i = 0; i < amountOfElements; i++ ) {
            annualPayment.push(taxOfYear);
        }    
        annualPayment.push(maxTax % taxOfYear);

        removeItem(paymentCheckList.querySelectorAll('.form__payment-check'));
        //создаем чекбоксы
        annualPayment.forEach((item, i) => {
            const checkIncomeYear = document.createElement('li');

            checkIncomeYear.classList.add('form__payment-check');
            checkIncomeYear.innerHTML = `
                <input type="checkbox" data-check>
                <div class="form__payment-check-text"><span>${Math.floor(item)} рублей</span> в ${i + 1}-ый год</div>
            `;
            paymentCheckList.append(checkIncomeYear);
            shower('hidden', 'show');
        });
    }
    //суммируем выделенные чекбоксы
    paymentCheckList.addEventListener('click', event => {
        switch (true) {
            case (event.target.getAttribute('data-check') == '' && event.target.checked):
                summTax += Number(event.target.nextSibling.nextSibling.childNodes[0].innerHTML.match(/\d+/g));
                break;
            case (event.target.getAttribute('data-check') == '' && !event.target.checked): 
                summTax -= Number(event.target.nextSibling.nextSibling.childNodes[0].innerHTML.match(/\d+/g));
                break;
        }
        disableBtn();
    });

    incomeBtn.addEventListener('click', event => {
        event.preventDefault();

        switch (true) {
            case inputIncome.validity.valueMissing :
                valid(errorText.clear, 'hidden', 'show', 'var(--main-color)');
                shower('show', 'hidden');
                zeroSummTax();
                break;
            case inputIncome.value == 0:
                valid(errorText.notIncome, 'hidden', 'show', 'var(--main-color)');
                shower('show', 'hidden');
                zeroSummTax();
                break;
            case inputIncome.value < 12702:
                valid(errorText.livingWage, 'hidden', 'show', 'var(--main-color)');
                shower('show', 'hidden');
                zeroSummTax();
                break;
            case inputIncome.value.search(/\D/g) >= 0:
                valid(errorText.notValid, 'hidden', 'show', 'var(--main-color)');
                shower('show', 'hidden');
                zeroSummTax();
                break;
            default: 
                valid('', 'show', 'hidden', '#DFE3E6');
                payment();
        }
    });

    // modal
    const modal = document.querySelector('.modal'),
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

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target === modalOkBtn || event.target === modalCloseBtn) {
            modalClose();
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') {
            modalClose();
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        modalOpen();
        spanModal.textContent = summTax;
    });
});