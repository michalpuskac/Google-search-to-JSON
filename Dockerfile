# Use an official Python runtime as a parent image
FROM python:3.11-slim-buster

# Set the working directory in the container to /app
WORKDIR /app

# Copy the requirements file into the container's working directory
COPY requirements.txt /app/

# Install any dependencies
RUN pip install -r /app/requirements.txt

# Copy the entire project source code into the container's working directory
COPY ./src /app/src
COPY ./static /app/static
COPY ./templates /app/templates
COPY ./.env /app/.env
COPY ./tests /app/tests
COPY ./requirements.txt /app/requirements.txt


# Define the command to run the application
CMD ["python", "/app/src/app.py"]

# (Optional) Expose the port your Flask app runs on (default Flask port is 5000)
EXPOSE 5000