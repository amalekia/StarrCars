import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

# Sample data
data = {
    'model': ['A', 'B', 'C', 'D', 'E'],
    'year': [2010, 2011, 2012, 2013, 2014],
    'mileage': [50000, 40000, 30000, 20000, 10000],
    'fuel_economy': [30, 25, 20, 35, 40],
    'horsepower': [200, 150, 180, 220, 160],
    'length': [180, 175, 170, 185, 190],
    'cluster': [0, 1, 0, 1, 0]  # Example clusters
}

# Create DataFrame
df = pd.DataFrame(data)

# Features and target
X = df[['year', 'mileage', 'fuel_economy', 'horsepower', 'length']]
y = df['cluster']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Perform GridSearchCV to find the best number of neighbors
param_grid = {'n_neighbors': range(1, 11)}
grid_search = GridSearchCV(KNeighborsClassifier(), param_grid, cv=5)
grid_search.fit(X_train_scaled, y_train)

# Best number of neighbors
best_n_neighbors = grid_search.best_params_['n_neighbors']
print(f"Best number of neighbors: {best_n_neighbors}")

# Create and train the KNN model with the best number of neighbors
knn = KNeighborsClassifier(n_neighbors=best_n_neighbors)
knn.fit(X_train_scaled, y_train)

# Evaluate the model
y_pred = knn.predict(X_test_scaled)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model accuracy: {accuracy}")

# Function to categorize a new car
def categorize_car(model, year, mileage, fuel_economy, horsepower, length):
    car_features = [[year, mileage, fuel_economy, horsepower, length]]
    car_features_scaled = scaler.transform(car_features)
    cluster = knn.predict(car_features_scaled)
    return cluster[0]

# Example usage
new_car = {
    'model': 'F',
    'year': 2015,
    'mileage': 15000,
    'fuel_economy': 32,
    'horsepower': 210,
    'length': 180
}

cluster = categorize_car(**new_car)
print(f"The new car belongs to cluster: {cluster}")