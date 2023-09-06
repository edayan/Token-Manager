import React, { useState } from 'react';
import { Button, Toast } from 'flowbite-react';

function DialPad() {
    const [chosenDigits, setChosenDigits] = useState([] as number[]);

    // Function to handle button click
    const handleButtonClick = (digit: number) => {
        if (chosenDigits.includes(digit)) {
            // If the digit is already in chosenDigits, remove it
            removeDigitFromChosenDigits(digit);
        } else {
            // Otherwise, add it to chosenDigits
            setChosenDigits((prevChosenDigits) => [...prevChosenDigits, digit]);
        }
    };

    // Function to remove a digit from chosenDigits
    const removeDigitFromChosenDigits = (digit: number) => {
        setChosenDigits((prevChosenDigits) =>
            prevChosenDigits.filter((button) => button !== digit)
        );
    };

    // Function to render buttons for digits
    const renderDigitButtons = () => {
        const digits = Array.from(Array(10).keys());
        return digits.map((digit, index) => (
            <Button
                key={index}
                className={`m-2 ${isDigitChosen(digit) ? 'bg-green-500' : ''}`}
                onClick={() => handleButtonClick(digit)}
            >
                {digit}
            </Button>
        ));
    };

    // Function to check if a button is chosen
    const isDigitChosen = (digit: number) => {
        return chosenDigits.includes(digit);
    };

    // Function to split the chosen digits into rows of 5
    const splitChosenDigitsInTwoRows = () => {
        const rows = [];
        for (let i = 0; i < chosenDigits.length; i += 5) {
            rows.push(chosenDigits.slice(i, i + 5));
        }
        return rows;
    };

    return (
        <div className="flex flex-row">
            <div className="flex flex-col items-center justify-center">
                <h2>Click to choose digits</h2>
                {/* Render three rows of digits (0-2, 4-6, 7-9) */}
                <div className="flex">{renderDigitButtons().slice(1, 4)}</div>
                <div className="flex">{renderDigitButtons().slice(4, 7)}</div>
                <div className="flex">{renderDigitButtons().slice(7, 10)}</div>
                <div className="flex">
                    {/* Digit 0 alone in the last row in the middle */}
                    <div className="flex-grow"></div>
                    {renderDigitButtons()[0]}
                    <div className="flex-grow"></div>
                </div>
            </div>

            {/* Display chosen digits as Toasts on the right */}
            <div className="flex flex-col items-center justify-center ml-4">
                <h2>Chosen digits for token</h2>
                {splitChosenDigitsInTwoRows().map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {row.map((button, index) => (
                            <Toast
                                key={index}
                                className="m-2 chosen-digit-toast"
                                style={{backgroundColor: 'lightgreen'}}
                                onClick={() => removeDigitFromChosenDigits(button)}
                            >
                                {button}
                            </Toast>
                        ))}
                    </div>
                ))}

                <div className="flex">
                    <Button
                        className={`m-2 bg-red-500 token-generate-button`}
                        style={{ width: 'calc(5 * var(--toast-size))' }}
                        disabled={chosenDigits.length === 0} // Disable when no chosen digits
                    >
                        Generate Token
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default DialPad;
