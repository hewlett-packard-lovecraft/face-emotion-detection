#!/bin/bash

source ./.venv/bin/activate
pip -r requirements.txt
gunicorn -w 4 -b 0.0.0.0 'main:app' 