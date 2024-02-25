from sklearn.model_selection import RandomizedSearchCV
from sklearn.pipeline import Pipeline
# from sklearn.preprocessing import StandardScaler
# from sklearn.preprocessing import FunctionTransformer
from sklearn import preprocessing
from sklearn.compose import ColumnTransformer
from sklearn.utils import discovery
import pandas as pd
import numpy as np

import inspect

estimator_type = 'classifier'
training_data_location = './data.csv'
data_preprocessing = [
    {
        'column_name': 'field_one',
        'data_type': 'string',
        'preprocessor': 'StandardScaler',
        'pre_processor_params': {'C': '0.01'},
        'is_target_field': False
    }
]
model_selection = [
    {
        'algorithm': 'SGDClassifier',
        'hyperparameters': {'alpha': '0.015'},
        'cv_params': {

        }
    },
    {
        'algorithm': 'LogisticRegression',
        'hyperparameters': None
    }
]
tuning_strategy = ''

def reshape_to_2d(X):
    return np.array(X).reshape(-1, 1)

def find_estimator(estimator_name):
    estimators = discovery.all_estimators(type_filter=estimator_type)
    for estimator in estimators:
        clf_name = estimator[0]
        clf_obj = estimator[1]
        if estimator_name in clf_name:
            return clf_obj
    return None

def build_estimator(estimator_list):
    index = 0
    for ms in estimator_list:
        clf = find_estimator(ms['algorithm'])
        if ms['hyperparameters'] is None:
            estimator_list[index]['clf'] = clf
        else:
            estimator_list[index]['clf'] = clf(**ms['hyperparameters'])
        index = index + 1
    return estimator_list

def find_preprocessor(preprocessor_name):
    for name, obj in inspect.getmembers(preprocessing):
        if inspect.isclass(obj):
            if preprocessor_name in name:
                return obj
    return None

def create_preprocessor():
    reshape_step = ('reshape', preprocessing.FunctionTransformer(reshape_to_2d, validate=False))

    pipeline_step_list = []
    for dp in data_preprocessing:
        preprocessor = find_preprocessor(dp['preprocessor'])
        args = dp['pre_processor_params'] if dp['pre_processor_params'] is not None else {}
        scaler = ('scaler', preprocessor(**args))
        pipeline_step = ''
        pipeline_step = (dp['column_name'], )
        pipeline_step_list.append(pipeline_step)

    num_pipeline = Pipeline([
        ('reshape', preprocessing.FunctionTransformer(reshape_to_2d, validate=False)),
        ('scaler', preprocessing.StandardScaler())
    ])

    return pipeline_step_list

def train():
    preprocessor = create_preprocessor()
    pipeline = Pipeline([
        ('features', preprocessor),
        ('classifier', ml_model(**hyper_parameters))
    ])

# clf = find_estimator('SGDClassifier')
# functions = discovery.all_functions()
# functions = discovery.all_displays()
# for name, func in functions:
#     print(func)

# inspect.getmembers(preprocessing)


find_preprocessor()
