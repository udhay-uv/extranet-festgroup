#!/bin/bash


echo "Starting Frontend..."
cd frontend
npm install
npm run dev &

echo "Starting Backend..."
cd ../backend
npm install
npm run dev &

wait

echo "Both Frontend and Backend are running!"
