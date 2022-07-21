const input = require("sync-input");

const exchangeRates = {
    USD: 1.0,
    JPY: 113.5,
    EUR: 0.89,
    RUB: 74.36,
    GBP: 0.75
};

//Prints all available exchangeRates
function getAllExchangeRates() {
    for (let rate in exchangeRates) {
        console.log(`1 USD equals  ${exchangeRates[rate]} ${rate}`);
    }
}

//Selected Option Loop Controller
function selectedOptionValidation() {
    let valid = false;
    while (!valid) {
        console.log("What do you want to do?");
        console.log("1-Convert currencies 2-Exit program");
        this.selectedOption = input();
        if ( isNaN(this.selectedOption) ) {
            console.log("Unknown input");
            continue;
        } else {
            switch (+this.selectedOption) {
                case 1:
                    valid = true;
                    this.result = true;
                    break;
                case 2:
                    valid = true;
                    this.result = false;
                    break;
                default:
                    console.log("Unknown input");
                    break;
            }
        }
    }
    return this.result;
}

//Validates currency value entered against exchangeRates object
function isValidCurrency(currency) {
    this.currency = currency.toUpperCase();
    return exchangeRates.hasOwnProperty(this.currency);
}

function isValidAmount(amount) {
    if ( !isNaN(amount) ) {
        this.result = true;

        if (amount >= 1) {
            return this;
        } else {
            this.result = false;
            this.message = "The amount can not be less than 1";
            return this;
        }
    } else {
        this.result = false;
        this.message = "The amount has to be a number";
        return this;
    }
}

//Sets transaction.baseCurrency value and verifies valid
function getBaseCurrency() {
    //Exit program due to error
    if (!transaction.success) {
        return false;
    }
    console.log("What do you want to convert?");
    this.baseCurrency = input("From: ");
    if ( isValidCurrency(this.baseCurrency) ) {
        transaction.baseCurrency = this.baseCurrency.toUpperCase();
    } else {
        console.log("Unknown currency");
        transaction.success = false;
        return false;
    }
}

//Sets transaction.convertCurrency value and verifies valid
function getDesiredCurrency() {
    //Exit program due to error
    if (!transaction.success) {
        return false;
    }
    this.convertCurrency = input("To: ");
    if ( isValidCurrency(this.convertCurrency) ) {
        transaction.convertCurrency = this.convertCurrency.toUpperCase();
    } else {
        console.log("Unknown currency");
        transaction.success = false;
        return false;
    }
}

//Sets transaction.amount value and verifies valid
function getAmount() {
    //Exit program due to error
    if (!transaction.success) {
        return false;
    }
    this.amount = input("Amount: ");
    let result = isValidAmount(this.amount);
    if ( result.result ) {
        transaction.amount = this.amount;
    } else {
        console.log(result.message);
        transaction.success = false;
        return false;
    }
}

function getConversionAmount() {
    //Exit program due to error
    if (!transaction.success) {
        return false;
    }
    let ca = input("Amount:");
    if (isNaN(ca)) {
        console.log("The amount has to be a number");
        return false;
    }
    if (!(ca >= 1)) {
        console.log("The amount can not be less than 1");
        return false;
    } else {
        return ca;
    }
}

function conversionRoutine() {

    //Main conversion logic
    this.result = (transaction.amount / exchangeRates[transaction.baseCurrency]) * exchangeRates[transaction.convertCurrency];
    console.log(`Result: ${transaction.amount} ${transaction.baseCurrency} equals ${this.result.toFixed(4)} ${transaction.convertCurrency}`);

}

//Welcome section
console.log("Welcome to Currency Converter!");
getAllExchangeRates(exchangeRates);

//Loop Controller
let selectedOption;
let transaction = {};
do {
    selectedOption = selectedOptionValidation();
    if ( !selectedOption ) {
        console.log("Have a nice day!");
        selectedOption = false;
    } else {
        //Start Of MAIN program
        transaction = {};
        transaction.success = true;
        //Obtain variables to work with to global object transaction
        getBaseCurrency();
        getDesiredCurrency();
        getAmount();
        //Run conversion
        conversionRoutine();
    }
} while (selectedOption)

