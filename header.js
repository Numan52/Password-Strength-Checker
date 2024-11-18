class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <a class="pwStrengthLink" href="passwordStrengthChecker.html">How Secure Is My Password?</a>
            <a class="pwGeneratorLink" href="passwordGenerator.html">Random Password Generator</a>
        `
    }
}

customElements.define("special-header", Header)
console.log("hello")