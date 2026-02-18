// Массив, где будут храниттся все операции
let transactions = [];

// === 1) Находим элементы на странице ===
const incomeAmountEl = document.getElementById("incomeAmount");
const incomeCategoryEl = document.getElementById("incomeCategory");
const addIncomeBtn = document.getElementById("addIncomeBtn");

const expenseAmountEl = document.getElementById("expenseAmount");
const expenseCategoryEl = document.getElementById("expenseCategory");
const addExpenseBtn = document.getElementById("addExpenseBtn");

const totalIncomeEl = document.getElementById("totalIncome");
const totalExpenseEl = document.getElementById("totalExpense");
const balanceEl = document.getElementById("balance");

const historyListEl = document.getElementById("historyList");

// === 2) Загружаем данные из localStorage при запуске ===
loadFromLocalStorage();
render();

// === 3) Доход ===
addIncomeBtn.addEventListener("click", () => {
const amount = parseFloat(incomeAmountEl.value);
const category = incomeCategoryEl.value.trim();

if (isNaN(amount) || amount <= 0) {
alert("Введите сумму дохода!");
    return;
  }

if (category === "") {
alert("Введите категорию дохода!");
    return;
  }

transactions.push({
type: "income",
category: category,
amount: amount,
  });

saveToLocalStorage();
  render();

incomeAmountEl.value = "";
incomeCategoryEl.value = "";
  });

// === 4) Расход ===
addExpenseBtn.addEventListener("click", () => {
const amount = parseFloat(expenseAmountEl.value);
const category = expenseCategoryEl.value.trim();

if (isNaN(amount) || amount <= 0) {
alert("Введите сумму расхода!");
    return;
  }

if (category === "") {
alert("Введите категорию расхода!");
    return;
  }

transactions.push({
type: "expense",
category: category,
amount: amount,
  });

saveToLocalStorage();
render();

expenseAmountEl.value = "";
expenseCategoryEl.value = "";
});

// === 5) Функция пересчёта и отображения ===
function render() {
// очищаем список истории
historyListEl.innerHTML = "";

let totalIncome = 0;
let totalExpense = 0;

// считаем суммы
for const t of transactions) {
if (t.type === "income") {
totalIncome += t.amount;
} else {
total Expense += t.amount;
}
}

const balance = total Income - totalExpense;

// показываем суммы
totalIncomeEl.textContent = totalIncome.toFixed(2);
totalExpense.textContent = totalExpense.toFixed(2);
balanceEl.textContent = balance.toFixed(2);

// вводим историю операций
for (const t of transactions) {
const li = document.createElement("li");
li.classList.add(t.type); // доход или расход
if (t.type === "income") {
li.textContent = `+ ${t.amount.toFixed(2)} - ${t.category}`;
} else {
li.textContent = `- ${t.amount.toFixed(2)} - ${t.category}`;
}

historyListEl.appendChild(li);
}
}

// === 6) localStorage ===
function saveToLocalStorage() {
localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadFromLocalStorage() {
const saved = localStorage.getItem("transactions");

id (saved) {
transactions = JSON.parse(saved);
}
}
