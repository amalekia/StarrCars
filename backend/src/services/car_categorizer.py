import numpy as np
import json
import sys
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.neighbors import NearestNeighbors

import requests
# Load dataset
url = "https://raw.githubusercontent.com/yourusername/yourrepo/main/dataset.csv"


# Create DataFrame
df = pd.read_csv(data)

# Features
X = df[['make', 'model', 'year', 'mileage', 'fuel_economy', 'horsepower', 'color']]

# Standardize the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Perform K-means clustering
kmeans = KMeans(n_clusters=3, random_state=42)
df['cluster'] = kmeans.fit_predict(X_scaled)

# Function to categorize a new car using K-means
def categorize_car_kmeans(make, model, year, mileage, fuel_economy, horsepower, color):
    car_features = [[make, model, year, mileage, fuel_economy, horsepower, color]]
    car_features_scaled = scaler.transform(car_features)
    cluster = kmeans.predict(car_features_scaled)
    return cluster[0]

# Use KNN to find the 10 closest related vehicles
knn = NearestNeighbors(n_neighbors=10)
knn.fit(X_scaled)

# Function to predict price range
def predict_price_range(new_car):
    car_features = [[new_car['make'], new_car['model'], new_car['year'], new_car['mileage'], new_car['fuel_economy'], new_car['horsepower'], new_car['color']]]
    car_features_scaled = scaler.transform(car_features)
    distances, indices = knn.kneighbors(car_features_scaled)

    closest_vehicles = df.iloc[indices[0]]
    print("The 10 closest related vehicles are:")
    print(closest_vehicles)

    avg_price = closest_vehicles['price'].mean()
    return {
        "lower_bound": avg_price - 1000,
        "upper_bound": avg_price + 1000
    }

def car_catergorizer(car_data):

    cluster = categorize_car_kmeans(car_data['make'], car_data['model'], car_data['year'], car_data['mileage'], car_data['fuel_economy'], car_data['horsepower'], car_data['color'])

    price_range = predict_price_range(car_data)
    print(f"The suggested price range for the new car is: {price_range}")

if __name__ == "__main__":
    car_data = json.loads(sys.stdin.read())
    result = car_catergorizer(car_data)
    # Return result as JSON
    print(json.dumps(result))
