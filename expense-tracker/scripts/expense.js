// Initialize the current user from localStorage
let currentUser = localStorage.getItem('currentUser');
console.log(currentUser);

document.querySelector('.myname').innerHTML = currentUser;

// Initialize expenses from localStorage or set it as an empty array if not found
let expenses = JSON.parse(localStorage.getItem(currentUser + '_expenses')) || [];

let expenseCounter = parseFloat(localStorage.getItem(currentUser + '_expenseCount')) || 0;

let remainingCounter = parseFloat(localStorage.getItem(currentUser + '_remainingCount')) || 1000;

let budget = parseFloat(localStorage.getItem(currentUser + '_budget')) || 1000;

document.querySelector('.expended-num').innerHTML = expenseCounter;
document.querySelector('.remaining-num').innerHTML = remainingCounter;
document.querySelector('.budget-num').innerText = budget;

function renderExpense() {
    let generatedHTML = '';
    expenses.forEach((expense, index) => {
        generatedHTML += `
        <div class="expense-display" id="expense-${index}">
            <div class="expense-type">${expense.type}</div>
            <div class="expense-name">${expense.names}</div>
            <div class="expense-value">${expense.values}</div>
            <div class="expense-value" id="datesec">${expense.date.split('T')[0]}</div>
            <div class="expense-delete">
                <button class="delete-button" onclick="deleteExpense(${index})">Delete</button>
            </div>
        </div>
        `;
    });
    document.querySelector('.js-expense-displayy').innerHTML = generatedHTML;
}

renderExpense();

document.querySelector('.submit').addEventListener('click', () => {
    const type = document.querySelector('.entry-type').value;
    const names = document.querySelector('.entry-name').value;
    const values = parseFloat(document.querySelector('.entry-value').value);
    const date = new Date().toISOString();
    const dateDis = new Date().toISOString().split('T')[0];
    console.log(date); // Add current datetime

    if (remainingCounter >= values) {
        expenses.push({ type, names, values, date });
        expenseCounter += values;
        remainingCounter -= values;
        document.querySelector('.expended-num').innerHTML = expenseCounter;
        document.querySelector('.remaining-num').innerHTML = remainingCounter;

        renderExpense();
        localStorage.setItem(currentUser + '_expenses', JSON.stringify(expenses));
        localStorage.setItem(currentUser + '_expenseCount', expenseCounter.toString());
        localStorage.setItem(currentUser + '_remainingCount', remainingCounter.toString());
    } else {
        alert("No funds left");
    }
});

function deleteExpense(index) {
    const diff = parseFloat(expenses[index].values);
    expenses.splice(index, 1);
    expenseCounter -= diff;
    remainingCounter += diff;
    document.querySelector('.expended-num').innerHTML = expenseCounter;
    document.querySelector('.remaining-num').innerHTML = remainingCounter;
    localStorage.setItem(currentUser + '_expenses', JSON.stringify(expenses));
    localStorage.setItem(currentUser + '_expenseCount', expenseCounter.toString());
    localStorage.setItem(currentUser + '_remainingCount', remainingCounter.toString());
    renderExpense();
}

function searchExpense(searchQuery) {
    document.querySelectorAll('.expense-display').forEach(expenseDiv => {
        expenseDiv.classList.remove('highlight');
    });

    expenses.forEach((expense, index) => {
        if (searchQuery.toLowerCase() === expense.names.toLowerCase() || searchQuery.toLowerCase() === expense.type.toLowerCase()) {
            document.getElementById(`expense-${index}`).classList.add('highlight');
        }
    });
}

document.querySelector('.search-bar').addEventListener('input', (event) => {
    const searchQuery = event.target.value;
    searchExpense(searchQuery);
});

document.querySelector('.logout-button').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
});

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('.setBudgetBtn').addEventListener('click', () => {
        document.querySelector('.setBudgetBtn').style.display = 'none';
        document.querySelector('.dropdown').style.display = 'block';
    });

    document.querySelector('.submitBudget').addEventListener('click', () => {
        const newbud = document.querySelector('.budgetInput').value;
        document.querySelector('.budget-num').innerHTML = newbud;
        localStorage.setItem(currentUser + '_budget', JSON.stringify(newbud));

        document.querySelector('.setBudgetBtn').style.display = 'block';
        document.querySelector('.dropdown').style.display = 'none';
    });
});

const sortType = document.querySelector('.sort-type');
sortType.addEventListener('change', () => {
    const sorty = sortType.value;
    displaySort(sorty);
});

function displaySort(sorty) {
    let sortedExpenses = [...expenses]; // Create a copy of the expenses array

    switch (sorty) {
        case 'Latest':
            sortedExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'Earliest':
            sortedExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'Amount':
            sortedExpenses.sort((a, b) => b.values - a.values);
            break;
        case 'Type':
            sortedExpenses.sort((a, b) => a.type.localeCompare(b.type));
            break;
        default:
            break;
    }

    renderExpenses(sortedExpenses); // Function to render the sorted expenses
}

function renderExpenses(expenses) {
    let generatedHTML = '';
    expenses.forEach((expense, index) => {
        generatedHTML += `
        <div class="expense-display" id="expense-${index}">
            <div class="expense-type">${expense.type}</div>
            <div class="expense-name">${expense.names}</div>
            <div class="expense-value">${expense.values}</div>
            <div class="expense-value" id="datesec">${expense.date.split('T')[0]}</div>
            <div class="expense-delete">
                <button class="delete-button" onclick="deleteExpense(${index})">Delete</button>
            </div>
        </div>
        `;
    });
    document.querySelector('.js-expense-displayy').innerHTML = generatedHTML;
}



  document.getElementById('contactUsBtn').addEventListener('click', function() {
    var contactDetails = document.getElementById('contactDetails');
    if (contactDetails.style.display === 'none') {
      contactDetails.style.display = 'block';
    } else {
      contactDetails.style.display = 'none';
    }
  });

