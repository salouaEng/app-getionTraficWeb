import React, { useState, useEffect } from "react";

const GenerateReference = ({ onGenerate }) => {
    const [generatedCode, setGeneratedCode] = useState("");

    useEffect(() => {
        generateRandomCode();
    }, []);

    const generateRandomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 24; // Define the length of the reference code
        let code = '';
        for (let i = 0; i < length; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setGeneratedCode(code);
        if (onGenerate) {
            onGenerate(code);
        }
    };

    return (
        <div>

        </div>
    );
};

export default GenerateReference;
