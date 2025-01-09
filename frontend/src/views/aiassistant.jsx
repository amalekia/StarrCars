import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../styles/aiassistant.css';
import React, { useState } from 'react';

export default function AIAssistant() {
    const [loading, setLoading] = useState(false);
    const [priceRange, setPriceRange] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        // Simulate a backend call
        setTimeout(() => {
            setPriceRange('$20,000 - $25,000');
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="ai-assistant-container">
            <h1>AI Assistant</h1>
            <p>Fill out the form below to get a competitive price range to buy or sell your vehicle for:</p>
            {loading ? (
                <div className="loading-screen">Loading...</div>
            ) : priceRange ? (
                <div className="estimated-price-container">
                    <h2>Estimated Price Range: {priceRange}</h2>
                    <Button className="reset-button" variant="outlined" onClick={() => setPriceRange(null)}>Reset</Button>
                </div>
            ) : (
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '100%' }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <TextField id="make" label="Make" variant="filled" className="MuiTextField-root" />
                    <TextField id="model" label="Model" variant="filled" className="MuiTextField-root" />
                    <TextField id="year" label="Year" variant="filled" className="MuiTextField-root" />
                    <TextField id="length" label="Length" variant="filled" className="MuiTextField-root" />
                    <TextField id="fuel-economy" label="Fuel Economy" variant="filled" className="MuiTextField-root" />
                    <TextField id="mileage" label="Mileage" variant="filled" className="MuiTextField-root" />
                    <TextField id="condition" label="Condition" variant="filled" className="MuiTextField-root" />
                    <Button className="MuiButton-outlined" variant="outlined" type="submit" sx={{ mt: 2 }}>Submit</Button>
                </Box>
            )}
        </div>
    );
}