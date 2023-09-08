import React from 'react';
import {Alert} from 'flowbite-react';
import {HiInformationCircle} from 'react-icons/hi';
import {formatAsCreditCardNumber} from "../util/FormatUtil";

interface TokenDisplayProps {
    token: string;
    validationResult?: boolean;
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({token, validationResult}) => {
    const formattedToken = formatAsCreditCardNumber(token);

    return (
        <div>
            <h2 className="text-xl m-auto font-bold mb-4">Generated Token</h2>
            <p className="text-blue-600 m-auto font-bold bg-gray-200 p-2 rounded">{formattedToken}</p>
            {validationResult !== undefined && (
                <Alert
                    color={validationResult ? 'success' : 'failure'}
                    icon={HiInformationCircle}
                >
                    {formattedToken} is {validationResult ? 'valid' : 'not valid'} token
                </Alert>
            )}
        </div>
    );
};

export default TokenDisplay;