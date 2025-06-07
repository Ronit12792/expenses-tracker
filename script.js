// DOM Elements
const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const totalBalance = document.getElementById('total-balance');
const totalIncome = document.getElementById('total-income');
const totalExpense = document.getElementById('total-expense');
const themeToggle = document.getElementById('theme-toggle');
const spendingChart = document.getElementById('spending-chart');

// Initialize transactions from localStorage
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Initialize theme
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
themeToggle.textContent = currentTheme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';

// Add transaction
transactionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const description = document.getElementById('description').value;
  const amount = +document.getElementById('amount').value;
  const type = document.getElementById('type').value;

  const transaction = {
    id: Date.now(),
    description,
    amount,
    type
  };

  transactions.push(transaction);
  updateLocalStorage();
  updateUI();
  transactionForm.reset();
});

// Delete transaction
transactionList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = +e.target.parentElement.getAttribute('data-id');
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    updateUI();
  }
});

// Toggle theme
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggle.textContent = newTheme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
});

// Update UI
function updateUI() {
  // Clear transaction list
  transactionList.innerHTML = '';

  // Calculate totals
  const income = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expense = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = income - expense;

  // Update totals
  totalBalance.textContent = `$${balance.toFixed(2)}`;
  totalIncome.textContent = `$${income.toFixed(2)}`;
  totalExpense.textContent = `$${expense.toFixed(2)}`;

  // Render transactions
  transactions.forEach(transaction => {
    const li = document.createElement('li');
    li.className = transaction.type;
    li.setAttribute('data-id', transaction.id);

    li.innerHTML = `
      <span>${transaction.description}</span>
      <span>$${transaction.amount.toFixed(2)}</span>
      <button class="delete-btn">Delete</button>
    `;

    transactionList.appendChild(li);
  });

  // Update chart
  updateChart();
}

// Update Chart.js
function updateChart() {
  const categories = ['Income', 'Expense'];
  const amounts = [
    transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  ];

  if (window.myChart) {
    window.myChart.destroy();
  }

  const ctx = spendingChart.getContext('2d');
  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: categories,
      datasets: [{
        label: 'Amount ($)',
        data: amounts,
        backgroundColor: ['#2ecc71', '#e74c3c'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Update localStorage
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Initialize app
updateUI();