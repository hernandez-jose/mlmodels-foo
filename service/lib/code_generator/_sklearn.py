from sklearn.linear_model import SGDClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import FunctionTransformer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import RandomizedSearchCV

import pandas as pd
import numpy as np

training_data_location = './iris.csv'
training_data_location_url = 'path'
training_data_format = 'csv'
hyper_parameters = {
    'classifier__loss': ['log_loss', 'squared_epsilon_insensitive', 'modified_huber', 'hinge', 'perceptron', 'squared_error', 'huber', 'epsilon_insensitive', 'squared_hinge'], 
    'classifier__penalty': ['elasticnet', 'l2', 'l1', None], 
    'classifier__alpha': [269.9036136633546, 464.19718043058094, 237.47854538803725], 
    'classifier__l1_ratio': [0.6009733124333424, 0.07419289031337872, 0.9858239107960871], 
    'classifier__fit_intercept': [True, False], 
    'classifier__max_iter': [50, 218, 427], 
    'classifier__tol': [244.0797036295096, 389.2976116098582, 217.09804994044634, None], 
    'classifier__shuffle': [True, False], 
    'classifier__epsilon': [476.3224422165881, 184.98039023725548, 481.3679706407656], 
    'classifier__random_state': [3503074912, 3153838411, 1383376033, 'RandomState()'], 
    'classifier__learning_rate': ['adaptive', 'constant', 'optimal', 'invscaling'], 
    'classifier__eta0': [415.18303449461354, 361.37630505587776, 386.05676275884764], 
    'classifier__power_t': [437.6549569393594, 79.6164262715763, -262.0297762900091], 
    'classifier__early_stopping': [True, False], 
    'classifier__validation_fraction': [0.8847519143565822, 0.9372669979990113, 0.6669228848808636], 
    'classifier__n_iter_no_change': [118, 333, 330], 
    'classifier__class_weight': ['balanced', 'balanced', None, None], 
    'classifier__warm_start': [True, False], 
    'classifier__average': [330, 470, 278, True, False, True, False]
}
field_one_params = {}
field_two_params = {}

def reshape_to_2d(X):
    return np.array(X).reshape(-1, 1)

# use for numbers
field_one_num = Pipeline([
    ('reshape', FunctionTransformer(reshape_to_2d, validate=False)),
    # use scaler
    ('scaler', StandardScaler(**field_one_params))
])
# use for text
field_two_text = Pipeline([
    # use vectorizer
    ('vectorizer', TfidfVectorizer(**field_two_params))
])

transformers = [
    ('field_one_num', field_one_num, 'field_one')
]

preprocessor = ColumnTransformer(
    transformers=transformers
)
pipeline = Pipeline([
    ('features', preprocessor),
    # use estimator
    ('classifier', SGDClassifier(**hyper_parameters))
])

# load dataset
with open("myfile.txt", "w") as file1:
    file1.read()

# hyper param tunner
clf = RandomizedSearchCV(pipeline, hyper_parameters)

# train
search = clf.fit(iris.data, iris.target)
