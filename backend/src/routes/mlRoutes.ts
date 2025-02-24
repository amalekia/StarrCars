import express, { Request, Response } from 'express';
import { spawn } from 'child_process';

const router = express.Router();

router.post("/predict-car-price", async (req, res) => {
    try {
      const carData = req.body;
  
      const formattedCarData = {
        make_name: carData.make,
        model_name: carData.model,
        year: Number(carData.year),
        horsepower: Number(carData.horsepower),
        city_fuel_economy: Number(carData.city_fuel_economy),
        highway_fuel_economy: Number(carData.highway_fuel_economy),
        mileage: Number(carData.mileage),
      };
      
      console.log("Formatted car data (before sending to Python):", JSON.stringify(formattedCarData, null, 2));
      
      const pythonProcess = spawn("python3", ["../backend/src/services/car_categorizer.py"]);
      
      pythonProcess.stdin.write(JSON.stringify(formattedCarData) + "\n");
      pythonProcess.stdin.end();
  
      let result = "";
      pythonProcess.stdout.on("data", (data) => {
        result += data.toString();
      });
  
      pythonProcess.stderr.on("data", (data) => {
        console.error("Python stderr:", data.toString());
      });
  
      pythonProcess.on("close", (code) => {
        if (code === 0) {
          res.json(JSON.parse(result));
        } else {
          res.status(500).json({ error: "Python script failed" });
        }
      });
    } catch (error) {
      console.error("Error in Express route:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

export default router;