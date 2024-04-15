// Get the necessary DOM elements
const transactionForm = document.getElementById('transaction-form');
const transactionTable = document.getElementById('transaction-table');
const totalIncomeElement = document.getElementById('total-income');
const totalExpensesElement = document.getElementById('total-expenses');
const remainingBalanceElement = document.getElementById('remaining-balance');

// Initialize an empty array to store transactions
let transactions = [];

// Function to add a new transaction
function addTransaction(transaction) {
  transactions.push(transaction);
  updateTransactionTable();
  updateFinancialOverview();
}

// Function to update the transaction table
function updateTransactionTable() {
  const tableBody = transactionTable.getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';

  transactions.forEach((transaction, index) => {
    const row = document.createElement('tr');

    const dateCell = document.createElement('td');
    dateCell.textContent = transaction.date;
    row.appendChild(dateCell);

    const typeCell = document.createElement('td');
    typeCell.textContent = transaction.type;
    row.appendChild(typeCell);

    const amountCell = document.createElement('td');
    amountCell.textContent = `$${transaction.amount.toFixed(2)}`;
    row.appendChild(amountCell);

    const categoryCell = document.createElement('td');
    categoryCell.textContent = transaction.category;
    row.appendChild(categoryCell);

    const actionsCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTransaction(index));
    actionsCell.appendChild(deleteButton);
    row.appendChild(actionsCell);

    tableBody.appendChild(row);
  });
}

// Function to update the financial overview
function updateFinancialOverview() {
  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
    } else {
      totalExpenses += transaction.amount;
    }
  });

  const remainingBalance = totalIncome - totalExpenses;

  totalIncomeElement.textContent = `$${totalIncome.toFixed(2)}`;
  totalExpensesElement.textContent = `$${totalExpenses.toFixed(2)}`;
  remainingBalanceElement.textContent = `$${remainingBalance.toFixed(2)}`;
}

// Function to delete a transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateTransactionTable();
  updateFinancialOverview();
}

// Add event listener to the transaction form
transactionForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const transactionDate = document.getElementById('transaction-date').value;
  const transactionType = document.getElementById('transaction-type').value;
  const transactionAmount = parseFloat(document.getElementById('transaction-amount').value);
  const transactionCategory = document.getElementById('transaction-category').value;

  if (
    transactionDate &&
    transactionType &&
    !isNaN(transactionAmount) &&
    transactionCategory
  ) {
    const newTransaction = {
      date: transactionDate,
      type: transactionType,
      amount: transactionAmount,
      category: transactionCategory,
    };

    addTransaction(newTransaction);

    // Reset the form
    transactionForm.reset();
  }
});