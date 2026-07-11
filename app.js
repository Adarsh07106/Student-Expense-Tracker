let chart;

function drawChart() {

    const totals = {};

    expenses.forEach(item => {

        if (!totals[item.category]) {

            totals[item.category] = 0;

        }

        totals[item.category] += item.amount;

    });

    const labels = Object.keys(totals);

    const values = Object.values(totals);

    const ctx = document.getElementById("pieChart");

    if (!ctx) return;

    if (chart) {

        chart.destroy();

    }

    chart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: labels,

            datasets: [{

                data: values,

                backgroundColor: [

                    "#22c55e",
                    "#3b82f6",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                    "#06b6d4",
                    "#84cc16",
                    "#f97316",
                    "#ec4899",
                    "#64748b"

                ]

            }]

       const BUDGET = 5000;

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const spentEl = document.getElementById("spent");
const remainingEl = document.getElementById("remaining");
const progressEl = document.getElementById("progress");
    const todayExpense=document.getElementById("todayExpense");
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
    function deleteExpense(index){

    if(!confirm("Delete this expense?")) return;

    expenses.splice(index,1);

    localStorage.setItem("expenses",JSON.stringify(expenses));

    render();

}

function editExpense(index){

    let item = expenses[index];

    dateInput.value = item.date;

    categoryInput.value = item.category;

    amountInput.value = item.amount;

    noteInput.value = item.note;

    expenses.splice(index,1);

    localStorage.setItem("expenses",JSON.stringify(expenses));

    render();

}

function formatMoney(value){

    return "₹"+Number(value).toLocaleString("en-IN");

}

function updateDashboard(total){
    drawChart();
todayExpense.innerHTML=formatMoney(getTodayExpense());
    spentEl.innerText=formatMoney(total);

    remainingEl.innerText=formatMoney(BUDGET-total);

    let p=(total/BUDGET)*100;

    if(p>100)p=100;

    progressEl.style.width=p+"%";

    if(p<60){

        progressEl.style.background="#22c55e";

    }else if(p<90){

        progressEl.style.background="#f59e0b";

    }else{

        progressEl.style.background="#ef4444";

    }

}

function render(){

    expenseList.innerHTML="";

    let total=0;

    expenses.forEach((item,index)=>{

        total+=item.amount;

        expenseList.innerHTML+=`

<tr>

<td>${item.date}</td>

<td>${item.category}</td>

<td>${formatMoney(item.amount)}</td>

<td>${item.note}</td>

<td>

    remainingEl.innerText = "₹" + (BUDGET - total);

    let percent = (total / BUDGET) * 100;

    if(percent>100) percent=100;

    progressEl.style.width = percent + "%";

}

render();
function downloadCSV() {

    let csv = "Date,Category,Amount,Note\n";

    expenses.forEach(item => {

        csv += `${item.date},${item.category},${item.amount},${item.note}\n`;

    });

    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "Expense_Report.csv";

    a.click();

}

function clearAllExpenses() {

    if (!confirm("Delete all expenses?")) return;

    expenses = [];

    localStorage.removeItem("expenses");

    render();

}

function totalByCategory(category) {

    let total = 0;

    expenses.forEach(item => {

        if (item.category === category) {

            total += item.amount;

        }

    });

    return total;

}

function getTodayExpense() {

    let today = new Date().toISOString().split("T")[0];

    let total = 0;

    expenses.forEach(item => {

        if (item.date === today) {

            total += item.amount;

        }

    });

    return total;

}

console.log("Today's Expense : ₹" + getTodayExpense());

render();
