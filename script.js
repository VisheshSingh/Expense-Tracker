const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -30 },
//   { id: 2, text: 'Salary', amount: 500 },
//   { id: 3, text: 'book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// ADD TRANSACTIONS TO DOM
function addTransaction(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>`;
  list.appendChild(item);
}

function submitTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please enter a text and amount');
  }

  const transaction = {
    id: Math.floor(Math.random() * 1000000),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  addTransaction(transaction);
  updateValues();
  updateLocalStorage();
  text.value = '';
  amount.value = '';
}

// TOTAL INCOME
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  const income = amounts
    .filter(amt => amt > 0)
    .reduce((acc, val) => acc + val, 0)
    .toFixed(2);
  const expense = (
    amounts.filter(amt => amt < 0).reduce((acc, val) => acc + val, 0) * -1
  ).toFixed(2);
  money_plus.innerHTML = `$${income}`;
  money_minus.innerHTML = `$${expense}`;
  balance.innerHTML = `$${total}`;
}

function removeTransaction(id) {
  transactions = transactions.filter(trans => trans.id !== id);
  updateLocalStorage();
  init();
}

function init() {
  list.innerHTML = '';
  transactions.forEach(addTransaction);
  updateValues();
}
init();

form.addEventListener('submit', submitTransaction);
