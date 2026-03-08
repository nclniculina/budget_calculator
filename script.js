// Array für alle Transaktionen (Einnahmen und Ausgaben)
let transactions = [];

// === 1) Elemente von der Seite auswählen ===
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

// === 2) Daten aus localStorage laden und rendern beim Start ===
loadFromLocalStorage();
render();

// === 3) Einnahme hinzufügen ===
addIncomeBtn.addEventListener("click", () => {
const amount = parseFloat(incomeAmountEl.value);
const category = incomeCategoryEl.value.trim();

// Eingabekontrolle
if (isNaN(amount) || amount <= 0) {
alert("Geben Sie den Einnahmebetrag ein!");
    return;
  }

if (category === "") {
alert("Geben Sie die Einnahmenkategorie ein!");
    return;
  }

// Neue Einnahme speichern
transactions.push({
type: "income",
category: category,
amount: amount,
  });

saveToLocalStorage(); // Speichern
  render();           // Anzeige aktualisieren

// Eingabefelder leeren
incomeAmountEl.value = "";
incomeCategoryEl.value = "";
  });

// === 4) Ausgabe hinzufügen ===
addExpenseBtn.addEventListener("click", () => {
const amount = parseFloat(expenseAmountEl.value);
const category = expenseCategoryEl.value.trim();

if (isNaN(amount) || amount <= 0) {
alert("Geben Sie den Ausgabenbetrag ein!");
    return;
  }

if (category === "") {
alert("Geben Sie Ausgabenkategorie ein!");
    return;
  }

// Neue Ausgabe speichern
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


// === 5) Funktion zum Berechnen und Anzeigen der Summen ===
function render() {
    
// Verlauf löschen
historyListEl.innerHTML = "";

let totalIncome = 0;
let totalExpense = 0;

// Summen berechnen
for (const t of transactions) {
if (t.type === "income") {
totalIncome += t.amount;
} else {
totalExpense += t.amount;
}
}

const balance = totalIncome - totalExpense;

// Summen anzeigen
totalIncomeEl.textContent = totalIncome.toFixed(2);
totalExpense.textContent = totalExpense.toFixed(2);
balanceEl.textContent = balance.toFixed(2);

// Transaktionsverlauf anzeigen
for (const t of transactions) {
const li = document.createElement("li");
li.classList.add(t.type); // CSS-Klasse: income oder expense
if (t.type === "income") {
li.textContent = `+ ${t.amount.toFixed(2)} - ${t.category}`;
} else {
li.textContent = `- ${t.amount.toFixed(2)} - ${t.category}`;
}

historyListEl.appendChild(li);
}
}

// === 6) localStorage Funktionen ===
function saveToLocalStorage() {
localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadFromLocalStorage() {
const saved = localStorage.getItem("transactions");

if (saved) {
transactions = JSON.parse(saved);
}
}
