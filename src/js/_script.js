'use strict';

import begin from './modules/begin';

document.addEventListener('DOMContentLoaded', () => {
    const income = document.querySelector('#income'),
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
    let summ = 0;


    function disableBtn() {
        if (summ !== 0 && summ > 0) {
            btnAdd.removeAttribute('disabled');
        } else {
            btnAdd.setAttribute('disabled', true);
        }
    }
    disableBtn();

    checkList.addEventListener('click', event => {
        if(event.target.getAttribute('data-check') == '') {
            if (event.target.checked == true) {
                summ += Number(event.target.nextSibling.nextSibling.childNodes[0].innerHTML.match(/\d+/g));
            } else {
                summ -= Number(event.target.nextSibling.nextSibling.childNodes[0].innerHTML.match(/\d+/g));
            }
        } 
        disableBtn();
    });

    function removeCheckList(container) {
        container.forEach(item => {
            item.remove();
        });
    }

    function valid(text, remove, add, color) {
        error.textContent = text;
        error.classList.remove(remove);
        error.classList.add(add);
        income.style.border = `1px solid ${color}`;
    }


    function payment() {
        let paymentCheck = document.querySelectorAll('.form__payment-check');

        if (income.value == 0) {
            valid(errorText.notIncome, 'hidden', 'show', 'var(--main-color)');
            checkListIncome.classList.remove('show');
            checkListIncome.classList.add('hidden');
            summ = 0;
            disableBtn();
            removeCheckList(paymentCheck);
        } else {
            let maxTaxDeduction = 260000,
                incomeYear = income.value * 12 * 0.13,
                arrTaxDeducation = [],
                amountOfElements = Math.floor(maxTaxDeduction / incomeYear);
            
            summ = 0;

            for(let i = 0; i < amountOfElements; i++) {
                arrTaxDeducation.push(incomeYear);   
            }
    
            arrTaxDeducation.push(maxTaxDeduction % incomeYear);
            
            removeCheckList(paymentCheck);
    
            for(let i = 0; i < arrTaxDeducation.length; i++) {
                const checkIncomeYear = document.createElement('li');

                checkIncomeYear.classList.add('form__payment-check');
                checkIncomeYear.innerHTML = `
                    <input type="checkbox" data-check>
                    <div class="form__payment-check-text"><span>${Math.floor(arrTaxDeducation[i])} рублей</span> в ${i + 1}-ый год</div>
                `;
                if((i + 1) === 2){
                    checkIncomeYear.innerHTML = `
                    <input type="checkbox" data-check>
                    <div class="form__payment-check-text"><span>${Math.floor(arrTaxDeducation[i])} рублей</span> во ${i + 1}-ый год</div>
                `;
                }
                checkList.append(checkIncomeYear);
            }
            
            checkListIncome.classList.remove('hidden');
            checkListIncome.classList.add('show');
        }
        
    }

    btnIncome.addEventListener('click', event => {
        event.preventDefault();

        switch (true) {
            case income.validity.valueMissing :
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


    const modal = document.querySelector('.modal'),
            modalClose = document.querySelector('.modal__close'),
            modalOkBtn = document.querySelector('.btn_modal'),
            spanModal = document.querySelector('.modal__text span');

        modalClose.addEventListener('click', (event) => {
            event.preventDefault();
            modal.classList.remove('show');
            modal.classList.add('hidden');
        });

        modalOkBtn.addEventListener('click', (event) => {
            event.preventDefault();
            modal.classList.remove('show');
            modal.classList.add('hidden');
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('show');
                modal.classList.add('hidden');
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.code === 'Escape') {
                modal.classList.remove('show');
                modal.classList.add('hidden');
            }
        });
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        modal.classList.remove('hidden');
        modal.classList.add('show');
        spanModal.textContent = summ;
    });

    begin();

});