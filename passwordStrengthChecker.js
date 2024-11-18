document.addEventListener("DOMContentLoaded", function() {
    setUpFaq()
    const inputField = document.querySelector(".input-field")
    inputField.addEventListener("input", function() {
        calculatePwStrength(inputField.value);
        
    })
})


async function calculatePwStrength(password) {
    let combinations = calculateCombinations(password)
    let entropy = Math.log2(combinations)
    let pwStrength = document.querySelector(".pw-strength")
    let mainContainer = document.querySelector(".main-container")
    //let wordFrequency = await checkWordFrequency(password)

    
/*
    
    if (wordFrequency >= 500) {
        entropy -= 10
        combinations /= 2
    } else if (wordFrequency >= 200) {
        entropy -= 5
        combinations /= 1.5
    }

    */


    if (entropy <= 0) {
        mainContainer.style.backgroundColor = "#3023e6"
        pwStrength.textContent = ""
    }
    else if (entropy <= 35) {
        pwStrength.textContent = "Very weak"
        mainContainer.style.backgroundColor = "#ff0000"
    } else if (entropy <= 59) {
        pwStrength.textContent = "Weak"
        mainContainer.style.backgroundColor = "#fa621c"
    } else if (entropy <= 90) {
        pwStrength.textContent = "Strong"
        mainContainer.style.backgroundColor = "#3ec783"
    } else {
        pwStrength.textContent = "Very Strong"
        mainContainer.style.backgroundColor = "#0cdb0c"
    }

    console.log(`combinations: ${combinations}`)
    console.log(entropy)


    calculateTimeToCrack(combinations)
}


function calculateTimeToCrack(combinations) {
    const guessesPerSecond = 1000000
    let secondsToCrack = Math.round(combinations / guessesPerSecond)
    let minutesToCrack = Math.round(secondsToCrack / 60)
    let hoursToCrack = Math.round(minutesToCrack / 60)
    let daysToCrack = Math.round(hoursToCrack / 24)
    let weeksToCrack = Math.round(daysToCrack / 7)
    let monthsToCrack = Math.round(daysToCrack / 30)
    let yearsToCrack = Math.round(monthsToCrack / 12)
    let paragraph = document.querySelector(".crack-time")
    let time = ""

    console.log(`${secondsToCrack} seconds to crack`)
    

    if (secondsToCrack < 60) {
        time = `${secondsToCrack} seconds`
    } else if (minutesToCrack < 60) {
        time = `${minutesToCrack} minutes`
    } else if (hoursToCrack < 24) {
        time = `${hoursToCrack} hours`
    }
    else if (daysToCrack < 7) {
        time = `${daysToCrack} days`
    }
    else if (weeksToCrack < 5) {
        time = `${weeksToCrack} weeks`
    }
    else if (monthsToCrack < 12) {
        time = `${monthsToCrack} months`
    } else {
        //time = `${yearsToCrack} years`
        if (yearsToCrack < 1000) {
            time = `${yearsToCrack} years`;
        } else if (yearsToCrack < 1000000) {
            time = `${Math.round((yearsToCrack / 1000))} thousand years`;
        } else if (yearsToCrack < 1000000000) {
            time = `${Math.round((yearsToCrack / 1000000))} million years`;
        } else if (yearsToCrack < 1000000000000) {
            time = `${Math.round((yearsToCrack / 1000000000))} billion years`;
        } else {
            time = `${Math.round((yearsToCrack / 1000000000000))} trillion years`;
        }
    }

    paragraph.textContent = time

}

/*
async function checkWordFrequency(password) {
    const url = `https://wordsapiv1.p.rapidapi.com/words/${password}/frequency`;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '76867fecdfmsh75cb9bf136a9876p14a9fejsn43dec68f9b54',
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	    }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        return result.frequency.perMillion;
    } catch (error) {
        return 0;
    }
}

*/

function calculateCombinations(password) {
    let specialChars = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/
    let lowerCaseChars = /[a-z]/
    let upperCaseChars = /[A-Z]/
    let numbers = /[0-9]/
    let pwLength = password.length
    let possibleChars = 0

   
    if (specialChars.test(password)) {
        possibleChars += 30  // all special characters
    } 
    if (lowerCaseChars.test(password)) {
        possibleChars += 26  // all lower case chars
    }
    if (upperCaseChars.test(password)) {
        possibleChars += 26
    }
    if (numbers.test(password)) {
        possibleChars += 10
    }

    console.log(`possible chars: ${possibleChars}`)

    return Math.pow(possibleChars, pwLength)
}

function setUpFaq() {
    let collapsible = document.getElementsByClassName("collapsible")
    console.log(collapsible)
    for (let i = 0; i < collapsible.length; i++) {
        collapsible[i].addEventListener("click", function() {
            console.log("clicked")
            this.classList.toggle("active")
            let answer = this.nextElementSibling
            console.log(answer)
            if (answer.style.display === "block") {
                answer.style.display = "none"
                console.log("if")
            } else {
                console.log("else")
                answer.style.display = "block"
            }
            console.log(answer)
        })
    }
}



