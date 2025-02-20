import express, { Request, Response } from 'express';
import { spawn } from 'child_process';

const router = express.Router();

router.post('/predict-car-price', (req: Request, res: Response) => {
    const carData = req.body;

    console.log("Received carData in Express:", carData); // Debugging

    if (!carData || typeof carData !== 'object') {
        res.status(400).json({ error: "Invalid request data. Expected JSON object." });
    }

    // Spawn the Python process
    const pythonProcess = spawn('python3', ['src/services/car_categorizer.py']);

    // Convert JSON object to a properly formatted string and send it
    const jsonString = JSON.stringify(carData) + '\n'; 
    pythonProcess.stdin.write(jsonString);
    pythonProcess.stdin.end();

    console.log("Sent to Python:", jsonString); // Debugging

    let result = '';

    // Collect data from Python stdout
    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    // Handle completion of the Python process
    pythonProcess.on('close', () => {
        console.log("Raw output from Python:", result.trim()); // Debugging

        try {
            const jsonResponse = JSON.parse(result.trim());  
            res.json(jsonResponse);
        } catch (error) {
            console.error('JSON Parse Error:', error);
            res.status(500).json({ error: 'Failed to parse Python output.' });
        }
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error('Python stderr:', data.toString());
    });

    pythonProcess.on('error', (error) => {
        console.error('Python process error:', error);
        res.status(500).json({ error: 'Internal server error from Python process' });
    });
});

export default router;