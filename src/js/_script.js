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
            valid('', 'show', 'hidden', '#DFE3E6');
            inputIncome.value = '';
        }, 800);
    });

    //payment
    const inputIncome = document.querySelector('#income'),
          incomeBtn = document.querySelector('.btn_income'),
          btnForm = document.querySelector('.btn_form'),
          paymentList = document.querySelector('.form__payment'),
          paymentCheckList = paymentList.querySelector('ul'),
          error = document.querySelector('.error'),
          form = document.querySelector('form'),
          errorText = {
            clear: 'Поле обязательно для заполнения',
            notIncome: 'Мы Вам рекомендуем найти работу',
            livingWage: 'Доход не может быть меньше 12 702р.'
          },
          optionsLocale = {
            style: 'currency',
            currency: 'RUB', 
            maximumFractionDigits: 0
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
    //функция которая делает кнопку неактивной или активной
    function disableBtn() {
        if (summTax !== 0 && summTax > 0) {
            btnForm.removeAttribute('disabled');
        } else {
            btnForm.setAttribute('disabled', true);
        }
    }

    disableBtn();

    function zeroSummTax() {
        // обнуляем сумму, чтобы от двух разных запросов не суммировались выделенные чекбоксы  
        summTax = 0;
        // вызываем функцию, чтобы при повторном поиске кнопка снова становилась неактивной
        disableBtn();
    }

    // делаем расчет
    function payment() {
        //создаем массив в который помещаем ежегодные выплаты 
        const taxOfYear = inputIncome.value.replace(/\D/g, '') * 12 * 0.13,
              maxTax = 260000,              
              annualPayment = [],
              amountOfElements = Math.floor(maxTax / taxOfYear);

        zeroSummTax();
        //заполняем массив числами которые без остатка поместяться в 260 000
        for( let i = 0; i < amountOfElements; i++ ) {
            annualPayment.push(taxOfYear);
        }    
        // ппомещаем в конец массива остаток
        annualPayment.push(maxTax % taxOfYear);
        //удаляем чекбоксы
        paymentCheckList.innerHTML = '';
        //создаем чекбоксы
        annualPayment.forEach((item, i) => {
            const checkIncomeYear = document.createElement('li');

            checkIncomeYear.classList.add('form__payment-check');
            checkIncomeYear.setAttribute('data-check', '')
            checkIncomeYear.innerHTML = `
                <input type="checkbox" data-checkBox>
                <div class="form__payment-check-text"><span>${Math.floor(item).toLocaleString('ru-RU', optionsLocale)} рублей</span> в ${i + 1}-ый год</div>
            `;

            paymentCheckList.append(checkIncomeYear);
        });
        
        shower('hidden', 'show');
    }
    // нажатие на кнопку расчитать
    incomeBtn.addEventListener('click', event => {
        event.preventDefault();
        switch (true) {
            case inputIncome.validity.valueMissing :
                valid(errorText.clear, 'hidden', 'show', 'var(--main-color)');
                shower('show', 'hidden');
                zeroSummTax();
                break;
            case inputIncome.value.replace(/\D/g, '') == 0:
                valid(errorText.notIncome, 'hidden', 'show', 'var(--main-color)');
                shower('show', 'hidden');
                zeroSummTax();
                break;
            case inputIncome.value.replace(/\D/g, '') < 12702:
                valid(errorText.livingWage, 'hidden', 'show', 'var(--main-color)');
                shower('show', 'hidden');
                zeroSummTax();
                break;
            default: 
                valid('', 'show', 'hidden', '#DFE3E6');
                payment();
        }
    });

    //суммируем выделенные чекбоксы
    paymentCheckList.addEventListener('click', event => {
        const target = event.target.closest('li');

        switch (true) {
            case (event.target.getAttribute('data-checkBox') == '' && target.querySelector('input').checked):
                summTax += Number(target.querySelector('span').innerHTML.replace(/\D/g, ''));
                break;
            case (event.target.getAttribute('data-checkBox') == '' && !target.querySelector('input').checked):
                summTax -= Number(target.querySelector('span').innerHTML.replace(/\D/g, ''));
                break;
            case (target && !target.querySelector('input').checked && event.target.getAttribute('data-checkBox') !== ''):
                target.querySelector('input').checked = true;
                summTax += Number(target.querySelector('span').innerHTML.replace(/\D/g, ''));
                break;
            case (target && target.querySelector('input').checked && event.target.getAttribute('data-checkBox') !== ''): 
                target.querySelector('input').checked = false;
                summTax -= Number(target.querySelector('span').innerHTML.replace(/\D/g, ''));
                break;
        }
        disableBtn();
    });

    // преобразуем строку в число и производим разделение по разрядам
    inputIncome.addEventListener('input', () => {
        let num = Number(inputIncome.value.replace(/\D/g, ''));
        inputIncome.value = num.toLocaleString('ru-RU', optionsLocale);
    });

    // реализация удаления последнего числа в инпуте, т.к. после разделения по разрядам мы удаляли последний символ, которым являлся символ рубля
    inputIncome.addEventListener('keydown', (event) => {
        if(event.code === 'Backspace') {
            // удаляем любой символ если за ним следует любой символ и знак валюты
            inputIncome.value = inputIncome.value.replace(/\d(?=.\p{Sc})/u, '');
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
        spanModal.textContent = summTax.toLocaleString('ru-RU', optionsLocale);
    });
});