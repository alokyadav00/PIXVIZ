document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const expenseType = document.getElementById('expense-type');
    const expenseName = document.getElementById('expense-name');
    const expenseAmount = document.getElementById('expense-amount');
    const expenseTableBody = document.getElementById('expense-table').getElementsByTagName('tbody')[0];
    const totalExpenseDisplay = document.getElementById('total-expense');

    // Load existing expenses from local storage
    loadExpenses();

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        addExpense();
    });

    function addExpense() {
        const type = expenseType.value;
        const name = expenseName.value;
        const amount = parseFloat(expenseAmount.value);

        if (name && amount) {
            // Create a new row for the table
            const row = expenseTableBody.insertRow();
            row.insertCell(0).textContent = type;
            row.insertCell(1).textContent = name;
            row.insertCell(2).textContent = `₹${amount.toFixed(2)}`;
            const removeCell = row.insertCell(3);
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-btn');
            removeButton.addEventListener('click', () => {
                row.remove();
                saveExpenses(); // Save the table state to local storage
                updateTotalExpense(); // Update total expense
            });
            removeCell.appendChild(removeButton);

            // Save the new expense to local storage
            saveExpenses();

            // Clear the form fields
            expenseName.value = '';
            expenseAmount.value = '';

            // Update total expense
            updateTotalExpense();
        } else {
            alert('Please fill in both fields.');
        }
    }

    function loadExpenses() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.forEach(expense => {
            const row = expenseTableBody.insertRow();
            row.insertCell(0).textContent = expense.type;
            row.insertCell(1).textContent = expense.name;
            row.insertCell(2).textContent = `₹${expense.amount.toFixed(2)}`;
            const removeCell = row.insertCell(3);
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-btn');
            removeButton.addEventListener('click', () => {
                row.remove();
                saveExpenses(); // Save the table state to local storage
                updateTotalExpense(); // Update total expense
            });
            removeCell.appendChild(removeButton);
        });

        // Update total expense
        updateTotalExpense();
    }

    function saveExpenses() {
        const rows = Array.from(expenseTableBody.getElementsByTagName('tr'));
        const expenses = rows.map(row => {
            const cells = row.getElementsByTagName('td');
            return {
                type: cells[0].textContent,
                name: cells[1].textContent,
                amount: parseFloat(cells[2].textContent.replace('₹', ''))
            };
        });
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function updateTotalExpense() {
        const rows = Array.from(expenseTableBody.getElementsByTagName('tr'));
        const totalExpense = rows.reduce((total, row) => {
            const amount = parseFloat(row.getElementsByTagName('td')[2].textContent.replace('₹', ''));
            return total + amount;
        }, 0);
        totalExpenseDisplay.textContent = `Total Expense: ₹${totalExpense.toFixed(2)}`;
    }
});
