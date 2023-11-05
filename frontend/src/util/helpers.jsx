
class helpers {

    // Creates validity window applies to input with matching name and prints message.
    static displayValidity(input, message) {
        const inputElement = document.querySelector(`input[name="${input}"]`);
        if (inputElement) {
            inputElement.setCustomValidity(message);
            inputElement.reportValidity();
            return true;
        }
        return false; // Return false to indicate that the input element was not found
    }
}

export default helpers