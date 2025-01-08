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
                <div>
                    <h2>Estimated Price Range: {priceRange}</h2>
                </div>
            ) : (
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <TextField id="filled-basic" label="Make" variant="filled" />
                    <TextField id="filled-basic" label="Model" variant="filled" />
                    <TextField id="filled-basic" label="Year" variant="filled" />
                    <TextField id="filled-basic" label="Length" variant="filled" />
                    <TextField id="filled-basic" label="Fuel Economy" variant="filled" />
                    <TextField id="filled-basic" label="Mileage" variant="filled" />
                    <TextField id="filled-basic" label="Condition" variant="filled" />
                    <Button variant="outlined" type="submit">Submit</Button>
                </Box>
            )}
        </div>
    );
}