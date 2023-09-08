export const formatAsCreditCardNumber = (token: string)  => {
    if (!token || token.length == 0) {
        return '';
    }

    // Remove any non-digit characters
    const cleanedNumber = token.toString().replace(/\D/g, '');

    // Check if the cleaned number is empty
    if (cleanedNumber.length === 0) {
        return ''; // Return an empty string if there are no digits
    }

    // Define the format template
    const formatTemplate = 'XXXX-XXXX-XXXX-XXXX';

    // Initialize the formatted number
    let formattedNumber = '';

    // Iterate through the cleaned number and the format template
    for (let i = 0, j = 0; i < formatTemplate.length; i++) {
        // If the current character in the format template is 'X', use a digit from the cleaned number
        if (formatTemplate[i] === 'X') {
            formattedNumber += cleanedNumber[j] || ''; // Use the next digit or an empty string if there are no more digits
            j++;
        } else {
            formattedNumber += formatTemplate[i]; // Use non-'X' characters from the format template
        }
    }

    return formattedNumber;
}