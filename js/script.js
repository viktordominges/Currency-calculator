// Add event listener to ensure the DOM is fully loaded before running the script
window.addEventListener('DOMContentLoaded', () => {
    // Select all tabs, tab content blocks, and the parent container of the tabs
    const tabs = document.querySelectorAll('.calculator__tab'),
          tabsContent = document.querySelectorAll('.calculator__block'),
          tabsParent = document.querySelector('.calculator__tabs'),
          currencyInput = document.querySelectorAll('.calculator__content-input'); // Select all input fields

    // Function to hide all tab content and remove the active class from tabs
    const hideTabContent = () => {
        tabsContent.forEach(item => {
            item.classList.add('hide'); // Hide all content blocks
            item.classList.remove('show'); // Ensure they do not have the show class
        });

        tabs.forEach(item => {
            item.classList.remove('calculator__tab_active'); // Remove active class from all tabs
        });
    }

    // Function to show specific tab content and set the corresponding tab as active
    const showTabContent = (i = 0) => {
        tabsContent[i].classList.remove('hide'); // Show selected content block
        tabsContent[i].classList.add('show'); // Add the show class to the content block
        tabs[i].classList.add('calculator__tab_active'); // Add active class to the selected tab
        currencyInput[i].children[0].focus(); // Automatically focus on the first input field of the tab
    }

    // Initialize: Hide all tabs and content, then show the first tab by default
    hideTabContent();
    showTabContent();

    // Event listener for switching between tabs
    tabsParent.addEventListener('click', (e) => {
        const target = e.target; // Capture the clicked element
        // If the clicked element is a tab, proceed
        if (target && target.classList.contains('calculator__tab')) {
            tabs.forEach((item, i) => {
                if (target == item) { // Check which tab was clicked
                    hideTabContent(); // Hide all tab content
                    showTabContent(i); // Show the corresponding content based on the clicked tab's index
                }
            });
        }
    });

    // Function to calculate the converted value between currencies
    const calcTotal = (sum, currency) => {
        const RATIO = 1.12; // Conversion rate from euro to dollar
        // If the currency is euro, multiply the sum by the conversion rate
        return currency === 'euro' ? sum * RATIO : sum / RATIO; // Otherwise, divide for dollar to euro conversion
    };

    // Function to handle input events for converting currencies
    const handleInput = (inputId, outputId, currency) => {
        const inputElement = document.getElementById(inputId);  // The input field where the user types
        const outputElement = document.getElementById(outputId); // The field where the result is shown

        // Add event listener for when the user types in the input field
        inputElement.addEventListener('input', () => {
            let inputValue = inputElement.value; // Capture the current input value

            // Validate that the input contains only numbers or a decimal point
            if (!/^[0-9]*\.?[0-9]*$/.test(inputValue)) {
                // If invalid, remove the last character
                inputElement.value = inputValue.slice(0, -1);
                inputElement.classList.remove('valid');
                inputElement.classList.add('invalid');
                return; // Stop further processing if input is invalid
            }

            // If the input is valid and not empty
            if (inputValue !== "") {
                inputElement.classList.remove('invalid'); // Remove invalid class if it exists
                inputElement.classList.add('valid'); // Add valid class

                const parsedValue = parseFloat(inputValue); // Convert the string input to a number

                const result = calcTotal(parsedValue, currency); // Call calcTotal to calculate the conversion

                outputElement.value = result.toFixed(2); // Display the result in the output field, rounded to two decimal places
            } else {
                // If the input is cleared, also clear the output field
                outputElement.value = '';
                inputElement.classList.remove('invalid');
                inputElement.classList.add('valid');
            }
        });
    };

    // Set up input handling for euro to dollar conversion
    handleInput('euro', 'usdResult', 'euro');
    // Set up input handling for dollar to euro conversion
    handleInput('dollar', 'euroResult', 'dollar');
});
