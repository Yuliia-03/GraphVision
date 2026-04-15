#!/usr/bin/env bash
cd backend
pip install -r requirements.txt
python manage.py makemigrations api
python manage.py migrate
python manage.py add_samples
python manage.py collectstatic --noinput