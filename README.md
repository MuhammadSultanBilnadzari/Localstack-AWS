# 🚀 Localstack + Docker

# 🧪 Localstack AWS CDK Demo

## 🚀 Fitur Utama

- ✅ Deploy DynamoDB, Lambda, API Gateway, dan S3 secara lokal dengan LocalStack
- ✅ Gunakan AWS CDK (`cdklocal`) untuk mengelola infrastruktur
- ✅ Server Express lokal untuk mengakses Lambda logic langsung
- ✅ Simulasi CRUD ke DynamoDB
- ✅ Tanpa biaya AWS, ideal untuk development


## 📦 Struktur Folder

- Localstack-AWS/
- ├── infrastructure/     # CDK source
- ├── server/             # Express server untuk local testing


## 🛠️ Instalasi

# #️⃣ Clone Repository
    git clone https://github.com/MuhammadSultanBilnadzari/Localstack-AWS.git
    cd Localstack-AWS

# #️⃣ Jalankan LocalStack
    localstack start

# #️⃣ Install Dependency CDK
    cd infrastructure/
    yarn install
    npm install -g aws-cdk-local

# #️⃣ Deploy ke LocalStack
    yarn cdklocal bootstrap
    yarn cdklocal deploy


# #️⃣ Masuk ke Folder `server/`
    cd ../server


# ⚙️ Buat `.env` file di folder server/
    PORT=3000
    REGION=us-east-1
    TABLE_NAME=todolist-cdklocal
    DYNAMODB_ENDPOINT=http://localhost:4566
    AWS_ACCESS_KEY_ID=dummy
    AWS_SECRET_ACCESS_KEY=dummy
    

## 🖥️ Pastikan berada di folder server/ untuk menjalankan Server Lokal
    yarn dev


## 📡 API Endpoint

### 🔹 Healthcheck

    GET /healthcheck

### 🔹 Get All Todos

    GET /

### 🔹 Create Todo

    curl --request POST http://localhost:3000/ \
          --header 'Content-Type: application/json' \
          --data '{
            "todo": {
              "todo_name": "Test Item",
              "todo_description": "Test description",
              "todo_completed": true
            }
          }'


## 🧪 Contoh Tes dengan Curl

    curl --request GET http://localhost:3000/healthcheck
    
    curl --request GET http://localhost:3000/

    curl --request GET http://localhost:3000/name-or-id


## ⚠️ Catatan

* Pastikan LocalStack berjalan sebelum menjalankan server.
* Semua operasi DynamoDB akan hilang saat LocalStack dihentikan (non-persistent).
* Jangan gunakan di production.


# 🧑‍💻 Author
- Muhammad Sultan Bilnadzari
- 📍 Lhokseumawe, Aceh
- 📅 15 June 2025
