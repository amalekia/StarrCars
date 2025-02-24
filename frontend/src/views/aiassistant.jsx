import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../styles/aiassistant.css';
import React, { useState } from 'react';

export default function AIAssistant() {
    const [loading, setLoading] = useState(false);
    const [avgPrice, setAvgPrice] = useState(null);
    const [lowerBound, setLowerBound] = useState(null);
    const [upperBound, setUpperBound] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
    
        fetch(`${process.env.REACT_APP_SERVER_URL}/predictor/predict-car-price`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                make: event.target.make.value,
                model: event.target.model.value,
                year: parseInt(event.target.year.value, 10),
                horsepower: parseInt(event.target.horsepower.value, 10),
                city_fuel_economy: parseInt(event.target['fuel-economy-city'].value, 10),
                highway_fuel_economy: parseInt(event.target['fuel-economy-highway'].value, 10),
                mileage: parseInt(event.target.mileage.value, 10),
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Response from backend:", data); // Debugging line
    
            if (data.average_price && data.lower_bound && data.upper_bound) {
                setAvgPrice(data.average_price);
                setLowerBound(data.lower_bound);
                setUpperBound(data.upper_bound);
            } else {
                console.error("Unexpected response structure:", data);
            }
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error:', error);
            setLoading(false);
        });
    };    

    return (
        <div className="ai-assistant-container">
            <h1>AI Assistant</h1>
            <p>Fill out the form below to get a competitive price range to buy or sell your vehicle for:</p>
            {loading ? (
                <div className="loading-screen">Loading...</div>
            ) : avgPrice && lowerBound && upperBound ? (
                <div className="estimated-price-container">
                    <h2>Estimated Price Range: ${lowerBound} - ${upperBound}</h2>
                    <h3>Average Price: ${avgPrice}</h3>
                    <Button className="reset-button" variant="outlined" onClick={() => { setAvgPrice(null); setLowerBound(null); setUpperBound(null); }}>Reset</Button>
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
                    <TextField id="year" label="Year" variant="filled" className="MuiTextField-root" type="number" />
                    <TextField id="horsepower" label="Horsepower" variant="filled" className="MuiTextField-root" type="number" />
                    <TextField id="fuel-economy-city" label="Fuel Economy City" variant="filled" className="MuiTextField-root" type="number" />
                    <TextField id="fuel-economy-highway" label="Fuel Economy Highway" variant="filled" className="MuiTextField-root" type="number" />
                    <TextField id="mileage" label="Mileage" variant="filled" className="MuiTextField-root" type="number" />
                    <Button className="MuiButton-outlined" variant="outlined" type="submit" sx={{ mt: 2 }}>Submit</Button>
                </Box>
            )}
        </div>
    );
}