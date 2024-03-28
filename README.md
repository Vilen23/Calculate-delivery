# Setup Guide for Running the Application with Docker

This guide explains how to clone the repository, build the Docker image, and run the image to run the application.

## Clone the Repository
```sh
git clone https://github.com/Vilen23/Calculate-delivery.git
cd Calculate-delivery
```
## Provide your database
- make sure to add your db link in .env file
```sh
DATABASE_URL="{Your url here}"
```
## Build the docker image
```sh
docker build -t your-image-name .
```

## Run the docker image
```sh
docker run -p 3000:3000 your-image-name
```

## Note: Ensure Docker is installed on your system before proceeding.

