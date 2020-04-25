"use strict"; //указывает, что мы работаем с современном коде ES6

let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],
    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value'),
    boolka = false,
    money,
    time;

function btnColorFalse() {
    expensesBtn.style.background = 'grey';
    countBtn.style.background = 'grey';
    optionalExpensesBtn.style.background = 'grey';
}
btnColorFalse();

function btnColorTrue() {
    expensesBtn.style.background = 'orange';
    countBtn.style.background = 'orange';
    optionalExpensesBtn.style.background = 'orange';
}


startBtn.addEventListener('click', function() {
    boolka = true;
    btnColorTrue();

    time = prompt("Введите дату в формате YYYY-MM-DD", '');

    do {
        money = +prompt("Ваш бюджет?", ''); //указываем добавку > > > , '' < < < для  браузера Exploer
    } while(money == "" || money == null || isNaN(money));

    appData.budjet = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed() + ' $'; //toFixed в данном случае округляет число
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesBtn.addEventListener('click', function() { //обязательная статья расходов
    if (boolka == true) {
        let sum = 0;

        for (let i = 0; i < expensesItem.length; i++) {
            let a = expensesItem[i].value,
                b = expensesItem[++i].value;

            if ((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null && 
                a != '' && b != '' && a.length < 50 && b.length < 6) {
                console.log("done");
                appData.expenses[a] = b;
                sum += +b;
            } else if (i == expensesItem.length - 1) {
                alert("Внимание! Заполните все строки");
            }  
        }
       expensesValue.textContent = sum;
    }
});

optionalExpensesBtn.addEventListener('click', function() { //хранение необязательных расходов
    if (boolka == true) { 
        let sum = 0;

    for (let i = 0; i < optionalExpensesItem.length; i++){
        if(isNaN(optionalExpensesItem[i].value) || optionalExpensesItem[i].value == "") {
            alert("Ошибка! Данные не записаны! Введите пожалуйста числовые значения.");
            break;
        } else {
            appData.optionalExpenses[i] = optionalExpensesItem[i].value;
            sum += +appData.optionalExpenses[i];
        }
        if(i==2) {
            optionalExpensesValue.textContent = sum;
        }
     }
    }
});

countBtn.addEventListener('click', function() {  //расчет ежедневного бюджета
    if (boolka == true) { 
        if(appData.budjet != undefined && expensesValue.textContent != "") {
            
            appData.moneyPerDay = ((appData.budjet - Number.parseInt(expensesValue.textContent)) / 30).toFixed();
            dayBudgetValue.textContent = appData.moneyPerDay;
    
            if(appData.moneyPerDay < 100) { //выводим уровень достатка
                levelValue.textContent = "минимальный уровень достатков";
            } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                levelValue.textContent = "Средний уровень достатков";
            } else if (appData.moneyPerDay > 2000) {
                levelValue.textContent = "Высокий уровень достатков";
            } else{
                levelValue.textContent = "Error! Невозможно просчитать Ваш уровень доходов!";
            }
        } else {
            dayBudgetValue.textContent = 'ошибка ' + ', сначала заполните обязательные расходы';
        }
    }
});

//так же можно использовать событие сhange , оно с работает , когда мы уберем фокус с инпута ввода
incomeItem.addEventListener('input', function() { //статья дополнительных расходов
    let items = incomeItem.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function() {
    paymentDeposit();
});

percentValue.addEventListener('input', function() { // доход от депозита
    paymentDeposit();
});

function paymentDeposit() {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum/100/12 * percent;
        appData.yearIncome = sum/100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
}

let appData = {
    budjet: money, //бюджет пользователя
    expenses: {}, //Храним обязательную статью и сумму расходов пользователя
    optionalExpenses: {}, //Храним статью необязательных расходов
    income: [], //массив дополнительных доходов
    timeData: time, //время
    savings: false, //логическое значение
};
    
// function showAppData() {
//     console.log('Наша программа включает в себя данные: ');
//     for(let key in appData) {
//         console.log(key + ' : ' + appData[key]);
//     }
// }

