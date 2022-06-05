//ACCOUNT NAME + NUMBER

const accNameDisplay = document.getElementById("accname");

let firstName = "Brian";
let middleName = "P";
let lastName = "Orkman";

let accName = `${firstName} ${middleName} ${lastName}`;

accNameDisplay.textContent = accName;

const accNoDisplay = document.getElementById("accno");

let accNo = 77652786;

accNoDisplay.textContent = accNo;

const balance = document.getElementById("balance");

//GREETING + DATE + TIME
const greetingDisplay = document.getElementById("greeting");
const dateTimeDisplay = document.getElementById("date-time");
const dateDisplay = dateTimeDisplay.querySelector("#date");
const timeDisplay = dateTimeDisplay.querySelector("#time");

let today = new Date();

function getFormattedDate(dateobj, format = "en-GB") {
  return dateobj.toLocaleDateString(
    format, // locale
    {
      // options
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

dateDisplay.textContent = getFormattedDate(today);

function getFormattedTime(
  dateobj,
  format = "en-GB",
  options = { hour: "2-digit", minute: "2-digit", second: "2-digit" }
) {
  return dateobj.toLocaleTimeString(
    format, // locale
    options
  );
}

function tick() {
  const time = new Date();
  timeDisplay.innerText = getFormattedTime(time);
}

tick();
setInterval(tick, 1000);

greetingDisplay.innerHTML = `Hello, ${firstName}!`;

//SAVINGS BUTTONS

const savingsDepositBtn = document.querySelector("#savings-deposit-btn");
const savingsWithdrawBtn = document.querySelector("#savings-withdraw-btn");
const depositBtn = document.querySelector("#deposit-btn");
const withdrawBtn = document.querySelector("#withdraw-btn");

//get string from form, convert to number, add to savings from balance

savingsDepositBtn.addEventListener("click", () => {
  const savingsDepositStringToInt = inputToNumber("savings-deposit-amount");
  updateBalance("savings-balance", savingsDepositStringToInt);
});

////get string from form, convert to number, minus from savings

savingsWithdrawBtn.addEventListener("click", () => {
  const savingsWithdrawStringToInt = inputToNumber("savings-withdraw-amount");
  updateBalance("savings-balance", -1 * savingsWithdrawStringToInt);
});

//BALANCE BUTTONS

depositBtn.addEventListener("click", () => {
  const depositStringToInt = inputToNumber("deposit-amount");
  updateBalance("balance", depositStringToInt);
});

withdrawBtn.addEventListener("click", () => {
  const withdrawStringToInt = inputToNumber("withdraw-amount");
  updateBalance("balance", -1 * withdrawStringToInt);
});

//turn input string to numbers

function inputToNumber(idName) {
  const amount = document.getElementById(idName).value;
  const amountNumber = parseFloat(amount);
  return amountNumber;
}

// updating savings balance

function updateBalance(idName, addedNumber) {
  const current = document.getElementById(idName).innerText;
  const currentStringToInt = parseFloat(current);
  //round number to two decimal places
  const total =
    Math.round((currentStringToInt + addedNumber + Number.EPSILON) * 100) / 100;

  document.getElementById(idName).innerText = total;
}

//TRANSACTIONS

//https://sampleapis.com/api-list/fakebank

// const baseURL = "https://api.sampleapis.com/fakebank/accounts";
// fetch(baseURL)
//   .then((resp) => resp.json())
//   .then((data) => displayData(data));

// function displayData(data) {
//   document.querySelector("#transactions").innerHTML = JSON.stringify(
//     data,
//     null,
//     2
//   );
// }

fetch("https://api.sampleapis.com/fakebank/accounts")
  .then((data) => {
    return data.json();
  })
  .then((completedata) => {
    // console.log(completedata);
    let transactionData = "";
    completedata.map((values) => {
      transactionData += `              <table class="table">
  <thead>
    <tr>
      <th scope="col">${values.transactionDate}</th>
      <th scope="col"></th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">${values.description}</th>
      <td>${values.category}</td>
      <td></td>
      <td>£${values.debit}</td>
    </tr
 >
  </tbody>
</table>`;
    });
    document.getElementById("transactions").innerHTML = transactionData;
  })
  .catch((err) => {});
