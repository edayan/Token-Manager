import React, {useState} from 'react';
import {Button, Card} from 'flowbite-react';
import DialPad from './components/DialPad';
import axios from 'axios';
import TokenDisplay from './components/TokenDisplay';

function App() {
    const [generatedToken, setGeneratedToken] = useState('');
    const [validationResult, setValidationResult] = useState<undefined | boolean>(undefined);

    const handleGeneratedToken = (token: string) => {
        setGeneratedToken(token);
    };

    const validateToken = () => {
        // Make an API request to validate the generated token
        axios
            .post(
                'http://localhost:9090/api/token/validate',
                generatedToken,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(response => {
                setValidationResult(true);
            })
            .catch(error => {
                console.error('Error validating token:', error);
                setValidationResult(false);
            });
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-2/3">
                <Card>
                    <DialPad onGeneratedToken={handleGeneratedToken}/>
                </Card>
                {generatedToken && (
                    <Card>
                        <TokenDisplay token={generatedToken} validationResult={validationResult}/>
                        <Button className={`m-2 bg-blue-500 token-generate-button`} onClick={validateToken}>
                            Validate Token
                        </Button>
                    </Card>
                )}
            </Card>
        </div>
    );
}

export default App;
