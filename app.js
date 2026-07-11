const BUDGET = 5000;

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const spentEl = document.getElementById("spent");
const remainingEl = document.getElementById("remaining");
const progressEl = document.getElementById("progress");
const expenseList = document.getElementById("expenseList");

const dateInput = document.getElementById("date");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");
const noteInput = document.getElementById("note");
const addBtn = document.getElementById("addBtn");

dateInput.valueAsDate = new Date();

addBtn.addEventListener("click", addExpense);

function addExpense() {

    const date = dateInput.value;
    const category = categoryInput.value;
    const amount = Number(amountInput.value);
    const note = noteInput.value;

    if (!date || amount <= 0) {
        alert("Enter valid amount");
        return;
    }

    expenses.push({
        date,
        category,
        amount,
        note
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    amountInput.value = "";
    noteInput.value = "";

    render();
}

function render() {

    expenseList.innerHTML = "";

    let total = 0;

    expenses.forEach((item, index) => {

        total += item.amount;

        expenseList.innerHTML += `
        <tr>
            <td>${item.date}</td>
            <td>${item.category}</td>
            <td>₹${item.amount}</td>
            <td>${item.note}</td>
        </tr>
        `;

    });

    spentEl.innerText = "₹" + total;

    remainingEl.innerText = "₹" + (BUDGET - total);

    let percent = (total / BUDGET) * 100;

    if(percent>100) percent=100;

    progressEl.style.width = percent + "%";

}

render();
