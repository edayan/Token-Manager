import React, {useState} from 'react';
import {Alert, Button, Card} from "flowbite-react";
import DialPad from "./components/DialPad";
import axios from 'axios';
import {HiInformationCircle} from "react-icons/hi";
import {formatAsCreditCardNumber} from "./util/FormatUtil";

function App() {
    const [generatedToken, setGeneratedToken] = useState('');
    const [validationResult, setValidationResult] = useState<undefined | boolean>(undefined);

    const handleGeneratedToken = (token: string) => {
        setGeneratedToken(token);
    };

    const validateToken = () => {
        // Make an API request to validate the generated token
        axios.post('http://localhost:9090/api/token/validate',
            generatedToken, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                setValidationResult(true);
            })
            .catch(error => {
                console.error('Error validating token:', error);
                setValidationResult(false);
            });
    }

    let formattedToken = formatAsCreditCardNumber(generatedToken);
    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-2/3"> {/* Adjust the width as needed */}
                <Card>
                    <DialPad onGeneratedToken={handleGeneratedToken}/>
                </Card>
                {generatedToken && (
                    <Card>
                        <h2 className="text-xl m-auto font-bold mb-4">Generated Token</h2>
                        <p className="text-blue-600 m-auto font-bold bg-gray-200 p-2 rounded">{formattedToken}</p>
                        <Button
                            className={`m-2  bg-blue-500 token-generate-button`}
                            onClick={validateToken}
                        >
                            Validate Token
                        </Button>
                    </Card>
                )}
                {validationResult !== undefined && (
                    <Card>
                        {validationResult ? ( // If validationResult is true, show success message
                            <Alert
                                color="success"
                                icon={HiInformationCircle}
                            >
                                {formattedToken} is a valid token
                            </Alert>
                        ) : ( // If validationResult is false, show failure message
                            <Alert
                                color="failure"
                                icon={HiInformationCircle}
                            >
                                {formattedToken} is not a valid token
                            </Alert>
                        )}
                    </Card>
                )}
            </Card>
        </div>
    );
}

export default App;
