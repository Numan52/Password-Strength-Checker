document.addEventListener("DOMContentLoaded", function() {
    let lowercaseButton = document.querySelector("#option-lowercase")
    let uppercaseButton = document.querySelector("#option-uppercase")
    let numbersButton = document.querySelector("#option-numbers")
    let symbolsButton = document.querySelector("#option-symbols")
    let pwLengthInput = document.querySelector(".pw-length-input")
    let passwordInput = document.querySelector(".pw-input")
    let copyButton = document.querySelector(".copy-pw-button")
    let regeneratePwButton = document.querySelector(".regenerate-pw-button")
    const slider = document.querySelector(".pw-length-slider")
    const numberInput = document.querySelector(".pw-length-input")


    function updatePassword() {
        console.log("update")
        passwordInput.value = generatePassword(pwLengthInput.value, lowercaseButton.checked, uppercaseButton.checked, numbersButton.checked, symbolsButton.checked)
    }

    function handleCheckboxClick() {
        if (![lowercaseButton, uppercaseButton, numbersButton, symbolsButton].some(checkbox => checkbox.checked)) {
            this.checked = true;
        } else {
            updatePassword();
        }
    }

    lowercaseButton.addEventListener("click", handleCheckboxClick)
    uppercaseButton.addEventListener("click", handleCheckboxClick)
    numbersButton.addEventListener("click", handleCheckboxClick)
    symbolsButton.addEventListener("click", handleCheckboxClick)
    pwLengthInput.addEventListener("input", updatePassword)
    copyButton.addEventListener("click",  () => copyPassword(passwordInput.value))
    regeneratePwButton.addEventListener("click", updatePassword)

    

    slider.addEventListener("input", function() {
        numberInput.value = this.value
        updatePassword()
    })
    numberInput.addEventListener("input", function() {
        slider.value = this.value
    })




    updatePassword()
})


function copyPassword(password) {
    let copyMessage = document.querySelector(".copied-message")
    copyMessage.hidden = false
    setTimeout(() => {
        copyMessage.hidden = true
    }, 2000)
    navigator.clipboard.writeText(password)
}



function generatePassword(pwLength, hasLowercase, hasUppercase, hasNumbers, hasSymbols) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let charset = ""
    let result = ""

    if (hasLowercase) {
        charset += lowercaseChars
    }
    if (hasUppercase) {
        charset += uppercaseChars
    }
    if (hasNumbers) {
        charset += numberChars
    }
    if (hasSymbols) {
        charset += symbolChars
    }

    for (let i = 0; i < pwLength; i++) {
        result += charset[Math.floor(Math.random() * (charset.length))]
    }
    
    return result
}
