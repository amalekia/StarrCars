import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.neighbors import NearestNeighbors

# Sample data
data = {
    'make': ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan'],
    'model': ['A', 'B', 'C', 'D', 'E'],
    'year': [2010, 2011, 2012, 2013, 2014],
    'mileage': [50000, 40000, 30000, 20000, 10000],
    'fuel_economy': [30, 25, 20, 35, 40],
    'horsepower': [200, 150, 180, 220, 160],
    'length': [180, 175, 170, 185, 190],
    'price': [16000, 21000, 17000, 22000, 15000]  # Example prices
}

# Create DataFrame
df = pd.DataFrame(data)

# Features
X = df[['make', 'model', 'year', 'mileage', 'fuel_economy', 'horsepower', 'length']]

# Standardize the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Perform K-means clustering
kmeans = KMeans(n_clusters=2, random_state=42)
df['cluster'] = kmeans.fit_predict(X_scaled)

# Function to categorize a new car using K-means
def categorize_car_kmeans(make, model, year, mileage, fuel_economy, horsepower, length):
    car_features = [[make, model, year, mileage, fuel_economy, horsepower, length]]
    car_features_scaled = scaler.transform(car_features)
    cluster = kmeans.predict(car_features_scaled)
    return cluster[0]

# Example usage
new_car = {
    'make': 'Ford',
    'model': 'F',
    'year': 2015,
    'mileage': 15000,
    'fuel_economy': 32,
    'horsepower': 210,
    'length': 180
}

cluster = categorize_car_kmeans(**new_car)
print(f"The new car belongs to cluster: {cluster}")

# Use KNN to find the 10 closest related vehicles
knn = NearestNeighbors(n_neighbors=10)
knn.fit(X_scaled)

# Find the 10 closest vehicles
car_features = [[new_car['make'], new_car['model'], new_car['year'], new_car['mileage'], new_car['fuel_economy'], new_car['horsepower'], new_car['length']]]
car_features_scaled = scaler.transform(car_features)
distances, indices = knn.kneighbors(car_features_scaled)

# Function to predict price range
def predict_price_range():
    closest_vehicles = df.iloc[indices[0]]
    print("The 10 closest related vehicles are:")
    print(closest_vehicles)

    avg_price = closest_vehicles['price'].mean()
    return f"${avg_price - 1000} - ${avg_price + 1000}"

# Predict price range for the new car
price_range = predict_price_range()
print(f"The suggested price range for the new car is: {price_range}")
