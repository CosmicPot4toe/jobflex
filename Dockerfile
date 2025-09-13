# Use slim image with Python
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    unixodbc \
    unixodbc-dev \
    gcc \
    g++ \
    libffi-dev \
    libssl-dev \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Add Microsoft ODBC driver repository
RUN curl -sSL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > /usr/share/keyrings/microsoft.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/microsoft.gpg] https://packages.microsoft.com/debian/11/prod bullseye main" > /etc/apt/sources.list.d/mssql-release.list

		RUN apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql17

# Create and set work directory
WORKDIR /app

# Install Python dependencies
COPY reqs.txt .
RUN pip install --upgrade pip && pip install -r reqs.txt

# Copy project files
COPY . .

WORKDIR /app/Jobflex

# Set default command
CMD ["gunicorn", "core.asgi:application", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]