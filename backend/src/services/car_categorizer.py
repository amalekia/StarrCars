import numpy as np
import json
import sys
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MaxAbsScaler
from sklearn.cluster import MiniBatchKMeans
from sklearn.neighbors import NearestNeighbors
from scipy.sparse import csr_matrix
from joblib import dump, load
import requests
import io
import os

def save_model(model, filename):
    dump(model, filename)

def load_model(filename):
    return load(filename) if os.path.exists(filename) else None

def load_or_train_model(sample_size=10000):
    scaler = load_model('scaler.joblib')
    kmeans = load_model('kmeans.joblib')
    knn = load_model('knn.joblib')
    
    if scaler and kmeans and knn:
        return scaler, kmeans, knn
    
    scaler, kmeans, knn = train_models(sample_size)
    
    save_model(scaler, 'scaler.joblib')
    save_model(kmeans, 'kmeans.joblib')
    save_model(knn, 'knn.joblib')
    
    return scaler, kmeans, knn

def train_models(sample_size):
    url = "https://media.githubusercontent.com/media/amalekia/StarrCars/refs/tags/v0.1.0/backend/src/data/cars.csv"
    response = requests.get(url, verify=False)
    data = response.content.decode('utf-8')
    df = pd.read_csv(io.StringIO(data))
    df.dropna(inplace=True)
    df = pd.get_dummies(df, columns=['make_name', 'model_name'])
    
    numerical_cols = ['year', 'mileage', 'city_fuel_economy', 'highway_fuel_economy', 'horsepower', 'price']
    df[numerical_cols] = df[numerical_cols].astype(float)
    
    df_sample = df.sample(n=min(sample_size, len(df)), random_state=42)
    
    scaler = MaxAbsScaler()
    X_sample = csr_matrix(df_sample[numerical_cols[:-1]])
    scaler.fit(X_sample)
    
    X_scaled = scaler.transform(X_sample)
    kmeans = MiniBatchKMeans(n_clusters=3, random_state=42, batch_size=100)
    kmeans.fit(X_scaled)
    
    knn = NearestNeighbors(n_neighbors=10)
    knn.fit(X_scaled)
    
    return scaler, kmeans, knn

def categorize_car_kmeans(scaler, kmeans, car_features):
    car_features_sparse = csr_matrix(car_features)
    car_features_scaled = scaler.transform(car_features_sparse)
    return kmeans.predict(car_features_scaled)[0]

def predict_price_range(df, scaler, knn, car_features):
    car_features_sparse = csr_matrix(car_features)
    car_features_scaled = scaler.transform(car_features_sparse)
    distances, indices = knn.kneighbors(car_features_scaled)
    closest_vehicles = df.iloc[indices[0]]
    avg_price = closest_vehicles['price'].mean()
    return avg_price - 1000, avg_price + 1000

def car_categorizer(df, scaler, kmeans, knn, car_data):
    car_features = np.array([[car_data['year'], car_data['mileage'], car_data['city_fuel_economy'], car_data['highway_fuel_economy'], car_data['horsepower']]])
    
    # Predict cluster
    cluster = categorize_car_kmeans(scaler, kmeans, car_features)
    
    # Sample the dataset (must match KMeans training set)
    df_sample = df.sample(n=min(10000, len(df)), random_state=42)
    df_sample['cluster'] = kmeans.labels_
    
    # Compute cluster's average price
    cluster_avg_price = df_sample[df_sample['cluster'] == cluster]['price'].mean()
    
    # Predict price range
    price_range_lower, price_range_upper = predict_price_range(df_sample, scaler, knn, car_features)
    
    return {
        "average_price": cluster_avg_price, 
        "lower_bound": price_range_lower, 
        "upper_bound": price_range_upper
    }

def load_dataset():
    url = "https://media.githubusercontent.com/media/amalekia/StarrCars/refs/tags/v0.1.0/backend/src/data/cars.csv"
    df = pd.read_csv(url)
    df.dropna(inplace=True)
    df = pd.get_dummies(df, columns=['make_name', 'model_name'])
    df['price'] = df['price'].astype(float)  # Ensure 'price' column exists
    return df

if __name__ == "__main__":
    scaler, kmeans, knn = load_or_train_model()
    df = load_dataset()
    
    car_data = json.loads(sys.stdin.read())
    result = car_categorizer(df, scaler, kmeans, knn, car_data)
    print(json.dumps(result))
    sys.stdout.flush()
    sys.exit(0)