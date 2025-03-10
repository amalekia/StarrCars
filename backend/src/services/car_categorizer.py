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
from sklearn.model_selection import cross_val_score
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
import matplotlib.pyplot as plt
import urllib3
from sklearn.metrics import silhouette_score, mean_squared_error, r2_score
from sklearn.neighbors import KNeighborsRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

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
        
        # One-hot encode categorical features
        df_encoded = pd.get_dummies(df, columns=['make_name', 'model_name'])
        
        # Store the expected one-hot encoded columns
        expected_columns = df_encoded.columns.tolist()
        
        # Ensure numerical columns are of float type
        numerical_cols = ['year', 'mileage', 'city_fuel_economy', 'highway_fuel_economy', 'horsepower', 'price']
        df_encoded[numerical_cols] = df_encoded[numerical_cols].astype(float)
        
        # Save expected columns for future transformations
        with open('expected_columns.json', 'w') as f:
            json.dump(expected_columns, f)
        
        return df_encoded
    except Exception as e:
        print(f"Error loading dataset: {e}", file=sys.stderr)
        sys.exit(1)

def process_input_data(car_data):
    """
    Processes incoming car data and ensures it matches the expected format used in training.
    """
    try:
        # Load expected columns from file
        with open('expected_columns.json', 'r') as f:
            expected_columns = json.load(f)

        # Convert input to DataFrame
        car_features_df = pd.DataFrame([car_data])
        
        # One-hot encode categorical features
        car_features_encoded = pd.get_dummies(car_features_df, columns=['make_name', 'model_name'])

        # Add missing columns and fill with 0
        if expected_columns:
            new_columns = pd.DataFrame(0, index=car_features_encoded.index, columns=expected_columns)
            car_features_encoded = pd.concat([car_features_encoded, new_columns], axis=1)
        
        # Remove extra columns
        car_features_encoded = car_features_encoded.loc[:, ~car_features_encoded.columns.duplicated()]

        # Ensure the DataFrame has the same column order as the training set
        car_features_encoded = car_features_encoded[expected_columns]
        
        return car_features_encoded
    except Exception as e:
        print(f"Error processing input data: {e}", file=sys.stderr)
        return None

def find_best_k_knn(X_transformed, y_sample):
    """
    Find the optimal number of neighbors (k) for KNN using cross-validation.
    """
    best_k = None
    best_score = float('-inf')
    
    for k in range(1, 21):
        knn = KNeighborsRegressor(n_neighbors=k)
        
        # Perform cross-validation
        scores = cross_val_score(knn, X_transformed, y_sample, cv=5, scoring='neg_mean_squared_error')
        
        # Average the cross-validation scores
        mean_score = scores.mean()
        
        # If this k gives a better score, update best_k
        if mean_score > best_score:
            best_score = mean_score
            best_k = k
    
    # print(f"Best number of neighbors (k) based on cross-validation: {best_k}")
    return best_k

def find_optimal_k(X_scaled):
    silhouette_scores = []
    distortions = []
    K_range = range(2, 11)
    for k in K_range:
        kmeans = MiniBatchKMeans(n_clusters=k, random_state=42, batch_size=1000)
        kmeans.fit(X_scaled)
        
        # Silhouette score
        silhouette_avg = silhouette_score(X_scaled, kmeans.labels_)
        silhouette_scores.append(silhouette_avg)
        
        # Inertia (distortion)
        distortions.append(kmeans.inertia_)
    
    # Plot the results
    # plt.figure(figsize=(10, 5))

    # plt.subplot(1, 2, 1)
    # plt.plot(K_range, distortions, marker='o')
    # plt.xlabel('Number of clusters (k)')
    # plt.ylabel('Distortion')
    # plt.title('Elbow Method (Distortion)')

    # plt.subplot(1, 2, 2)
    # plt.plot(K_range, silhouette_scores, marker='o', color='green')
    # plt.xlabel('Number of clusters (k)')
    # plt.ylabel('Silhouette Score')
    # plt.title('Silhouette Score for Optimal k')

    # plt.tight_layout()
    # plt.savefig('kmeans_optimal_k.png')
    # plt.show()

    # Choose the best k based on silhouette score
    optimal_k = K_range[np.argmax(silhouette_scores)]
    # print(f"Optimal number of clusters based on Silhouette Score: {optimal_k}")
    return optimal_k

def load_or_train_models(df, sample_size=10000):
    categorical_cols = [col for col in df.columns if col.startswith('make_name') or col.startswith('model_name')]
    numerical_cols = ['year', 'mileage', 'city_fuel_economy', 'highway_fuel_economy', 'horsepower']

    ct = load_model('scaler.joblib')  # Load the ColumnTransformer

    # If the model is not found, fit and save the ColumnTransformer
    if ct is None:
        ct = ColumnTransformer([
            ('categorical', OneHotEncoder(), categorical_cols),
            ('numerical', StandardScaler(), numerical_cols)
        ])
        df_sample = df.sample(n=min(sample_size, len(df)), random_state=42)
        X_sample = df_sample[categorical_cols + numerical_cols]  
        ct.fit(X_sample)  # Fit the transformer to the sample data
        save_model(ct, 'scaler.joblib')  # Save the fitted transformer

    # Load other models
    kmeans = load_model('kmeans.joblib')
    knn = load_model('knn.joblib')
    
    if not kmeans or not knn:
        df_sample = df.sample(n=min(sample_size, len(df)), random_state=42)
        X_sample = df_sample[categorical_cols + numerical_cols]  
        y_sample = df_sample['price']  # Target variable is 'price'

        # Apply transformations
        X_transformed = ct.fit_transform(X_sample)
        
        # Initialize the k-means clustering model
        optimal_k = find_optimal_k(X_transformed)
        kmeans = MiniBatchKMeans(n_clusters=optimal_k, random_state=42, batch_size=1000)
        kmeans.fit(X_transformed)
        
        # Train the KNN Regressor model
        knn = KNeighborsRegressor(n_neighbors=10)
        knn.fit(X_transformed, y_sample)  # Train with features and price as target
        
        save_model(kmeans, 'kmeans.joblib')
        save_model(knn, 'knn.joblib')

    return ct, kmeans, knn


def validate_models(X_transformed, kmeans, df_sample, knn):
    """
    Validate the trained models using MSE, R², and cluster consistency.
    """
    try:
        # K-Means clustering validation
        cluster_labels = kmeans.predict(X_transformed)
        silhouette_avg = silhouette_score(X_transformed, cluster_labels)
        # print(f"Silhouette Score for K-Means: {silhouette_avg:.4f}")
        
        # Validate KNN pricing predictions
        actual_prices = df_sample['price']
        predicted_prices = knn.predict(X_transformed)
        
        mse = mean_squared_error(actual_prices, predicted_prices)
        r2 = r2_score(actual_prices, predicted_prices)
        
        # print(f"KNN Price Prediction Validation:")
        # print(f"Mean Squared Error: {mse:.2f}")
        # print(f"R² Score: {r2:.4f}")
        
    except Exception as e:
        print(f"Error in model validation: {e}", file=sys.stderr)

def categorize_car_kmeans(ct, kmeans, car_features):
    # Apply the same column transformer that was used during training
    car_features_df = pd.DataFrame([car_features], columns=[
        'make_name', 'model_name', 'year', 'mileage', 'city_fuel_economy', 'highway_fuel_economy', 'horsepower'
    ])
    
    # Transform the car features using the pre-fitted column transformer
    car_features_transformed = ct.transform(car_features_df)
    
    # Predict the cluster for the given car features
    return kmeans.predict(car_features_transformed)[0]

def predict_price_range(df, ct, knn, car_features):
    # Transform the car features using the column transformer
    car_features_transformed = ct.transform(car_features)

    # Get the k-nearest neighbors
    distances, indices = knn.kneighbors(car_features_transformed)

    # Get the predicted prices for the nearest neighbors
    closest_vehicles = df.iloc[indices[0]]  # Select the rows of the nearest neighbors
    predicted_prices = closest_vehicles['price'].values  # Extract the prices of the nearest neighbors

    # Calculate the mean and standard deviation of the predicted prices
    avg_price = predicted_prices.mean()
    std_dev = predicted_prices.std() or 1000 

    # Return the price range
    return avg_price - std_dev, avg_price + std_dev


def car_categorizer(df, ct, kmeans, knn, car_data):
    try:
        # Process the input car data
        car_features_encoded = process_input_data(car_data)
        if car_features_encoded is None:
            return {"error": "Invalid input data"}

        # Ensure ColumnTransformer is fitted
        if not hasattr(ct, 'transform') or not hasattr(ct, 'fit_transform'):
            categorical_cols = [col for col in df.columns if col.startswith('make_name') or col.startswith('model_name')]
            numerical_cols = ['year', 'mileage', 'city_fuel_economy', 'highway_fuel_economy', 'horsepower']
            ct.fit(df[categorical_cols + numerical_cols])

        # Convert input to numpy array
        car_features_transformed = ct.transform(car_features_encoded)

        # Ensure KMeans and KNN models are valid
        if not kmeans or not knn:
            return {"error": "Models not found"}

        # Predict the cluster
        cluster = kmeans.predict(car_features_transformed)[0]

        # Sample from the dataset
        df_sample = df.sample(n=min(10000, len(df)), random_state=42)

        # Add the cluster labels to the sampled data
        df_sample['cluster'] = kmeans.labels_

        # Calculate the average price of cars in the same cluster
        cluster_avg_price = df_sample[(df_sample['cluster'] == cluster) & 
                              (df_sample['make_name_' + car_data['make_name']] == 1)]['price'].mean()

        # Predict the price range using KNN regressor
        price_range_lower, price_range_upper = predict_price_range(df_sample, ct, knn, car_features_encoded)

        return {
            "average_price": round(cluster_avg_price, 2),
            "lower_bound": round(price_range_lower, 2),
            "upper_bound": round(price_range_upper, 2)
        }
    except Exception as e:
        print(f"Error processing car data: {e}", file=sys.stderr)
        return {"error": f"Invalid input data: {e}"}


if __name__ == "__main__":
    df = load_dataset()
    ct, kmeans, knn = load_or_train_models(df)
    
    try:
        car_data = json.loads(sys.stdin.read())
        result = car_categorizer(df, ct, kmeans, knn, car_data)
        print(json.dumps(result))
    except json.JSONDecodeError:
        print(json.dumps({"error": "Invalid JSON input"}))
    sys.stdout.flush()
    sys.exit(0)