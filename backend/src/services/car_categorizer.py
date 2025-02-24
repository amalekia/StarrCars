import numpy as np
import json
import sys
import pandas as pd
import requests
import io
import os
from scipy.sparse import csr_matrix
from joblib import dump, load
from sklearn.cluster import MiniBatchKMeans
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import MaxAbsScaler
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def save_model(model, filename):
    dump(model, filename)

def load_model(filename):
    return load(filename) if os.path.exists(filename) else None

def load_dataset():
    url = "https://media.githubusercontent.com/media/amalekia/StarrCars/refs/tags/v0.1.0/backend/src/data/cars.csv"
    try:
        response = requests.get(url, verify=False)
        data = response.content.decode('utf-8')
        df = pd.read_csv(io.StringIO(data))
        df.dropna(inplace=True)
        df = pd.get_dummies(df, columns=['make_name', 'model_name'])
        numerical_cols = ['year', 'mileage', 'city_fuel_economy', 'highway_fuel_economy', 'horsepower', 'price']
        df[numerical_cols] = df[numerical_cols].astype(float)
        return df
    except Exception as e:
        print(f"Error loading dataset: {e}", file=sys.stderr)
        sys.exit(1)

def find_optimal_k(X_scaled):
    distortions = []
    K_range = range(1, 11)
    for k in K_range:
        kmeans = MiniBatchKMeans(n_clusters=k, random_state=42, batch_size=100)
        kmeans.fit(X_scaled)
        distortions.append(kmeans.inertia_)
    
    plt.figure()
    plt.plot(K_range, distortions, marker='o')
    plt.xlabel('Number of clusters (k)')
    plt.ylabel('Distortion')
    plt.title('Elbow Method to Determine Optimal k')
    plt.savefig('elbow_method.png')
    optimal_k = np.argmax(np.diff(distortions)) + 2
    return optimal_k

def load_or_train_models(df, sample_size=10000):
    scaler = load_model('scaler.joblib')
    kmeans = load_model('kmeans.joblib')
    knn = load_model('knn.joblib')
    
    if scaler and kmeans and knn:
        return scaler, kmeans, knn
    
    df_sample = df.sample(n=min(sample_size, len(df)), random_state=42)
    numerical_cols = ['year', 'mileage', 'city_fuel_economy', 'highway_fuel_economy', 'horsepower']
    X_sample = csr_matrix(df_sample[numerical_cols])
    
    scaler = MaxAbsScaler()
    X_scaled = scaler.fit_transform(X_sample)
    
    optimal_k = find_optimal_k(X_scaled)
    kmeans = MiniBatchKMeans(n_clusters=optimal_k, random_state=42, batch_size=100)
    kmeans.fit(X_scaled)
    
    knn = NearestNeighbors(n_neighbors=10)
    knn.fit(X_scaled)
    
    save_model(scaler, 'scaler.joblib')
    save_model(kmeans, 'kmeans.joblib')
    save_model(knn, 'knn.joblib')
    
    return scaler, kmeans, knn

def categorize_car_kmeans(scaler, kmeans, car_features):
    car_features_scaled = scaler.transform(csr_matrix(car_features))
    return kmeans.predict(car_features_scaled)[0]

def predict_price_range(df, scaler, knn, car_features):
    car_features_scaled = scaler.transform(csr_matrix(car_features))
    distances, indices = knn.kneighbors(car_features_scaled)
    closest_vehicles = df.iloc[indices[0]]
    avg_price = closest_vehicles['price'].mean()
    return avg_price - 1000, avg_price + 1000

def car_categorizer(df, scaler, kmeans, knn, car_data):
    try:
        car_features = np.array([[
            car_data['year'], car_data['mileage'], car_data['city_fuel_economy'],
            car_data['highway_fuel_economy'], car_data['horsepower']
        ]])
        cluster = categorize_car_kmeans(scaler, kmeans, car_features)
        df_sample = df.sample(n=min(10000, len(df)), random_state=42)
        df_sample['cluster'] = kmeans.labels_
        cluster_avg_price = df_sample[df_sample['cluster'] == cluster]['price'].mean()
        price_range_lower, price_range_upper = predict_price_range(df_sample, scaler, knn, car_features)
        return {"average_price": cluster_avg_price, "lower_bound": price_range_lower, "upper_bound": price_range_upper}
    except Exception as e:
        print(f"Error processing car data: {e}", file=sys.stderr)
        return {"error": "Invalid input data"}

if __name__ == "__main__":
    df = load_dataset()
    scaler, kmeans, knn = load_or_train_models(df)
    
    try:
        car_data = json.loads(sys.stdin.read())
        result = car_categorizer(df, scaler, kmeans, knn, car_data)
        print(json.dumps(result))
    except json.JSONDecodeError:
        print(json.dumps({"error": "Invalid JSON input"}))
    sys.stdout.flush()
    sys.exit(0)
