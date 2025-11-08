🕒 Vardiya Sistemi

Vardiya Sistemi, Ruby on Rails (Backend) ve Next.js (Frontend) kullanılarak geliştirilmiş basit ama işlevsel bir vardiya yönetim uygulamasıdır.

🚀 Özellikler

Vardiya Planı Yönetimi: Yeni vardiya planları (Schedules) oluşturun, mevcut planları listeleyin veya silin.

Vardiya Yönetimi: Her plan için özel vardiyalar (Shifts) ekleyin, görüntüleyin ve silin.

Modern Arayüz: Bootstrap tabanlı, sade ve duyarlı (responsive) bir kullanıcı arayüzü.

Uçtan Uca Testler: Cypress ve Cucumber ile yazılmış test senaryoları sayesinde iş akışları doğrulanır.

🧱 Kullanılan Teknolojiler
Backend

Ruby on Rails

SQLite3

Frontend

Next.js (React)

Bootstrap

Test

Cypress

Cucumber

📂 Proje Yapısı
vardiya_sistemi/
├── vardiya_backend/   # Ruby on Rails ile geliştirilen API sunucusu
├── vardiya_frontend/  # Next.js (React) ile geliştirilen kullanıcı arayüzü
└── vardiya_test/      # Cypress ve Cucumber ile yazılmış uçtan uca testler

⚙️ Kurulum ve Çalıştırma

Projeyi yerel ortamda çalıştırmak için aşağıdaki adımları takip edin.

🧩 Gereksinimler

Ruby ve Rails

Node.js ve npm

1️⃣ Backend Kurulumu
# Backend klasörüne gidin
cd vardiya_backend

# Gerekli gem'leri yükleyin
bundle install

# Veritabanını oluşturun ve migrate edin
rails db:migrate

# Test verilerini ekleyin
rails db:seed

2️⃣ Frontend Kurulumu
# Frontend klasörüne gidin
cd vardiya_frontend

# Gerekli npm paketlerini yükleyin
npm install

3️⃣ Uygulamayı Çalıştırma

Uygulamanın çalışabilmesi için hem backend hem de frontend sunucularının aynı anda çalışıyor olması gerekir.
Bunun için iki ayrı terminal kullanın:

Terminal 1 – Backend:

cd vardiya_backend
rails s


Backend sunucusu: http://localhost:3000

Terminal 2 – Frontend:

cd vardiya_frontend
npm run dev


Frontend sunucusu: http://localhost:3001

Artık tarayıcından http://localhost:3001
 adresine giderek uygulamayı kullanabilirsin.

🧪 Testleri Çalıştırma

Uçtan uca testleri çalıştırmak için:

# Backend ve frontend çalışıyor olmalı

# Test klasörüne gidin
cd vardiya_test

# Gerekli bağımlılıkları yükleyin (sadece ilk seferde)
npm install

# Cypress arayüzünü açın
npx cypress open


Açılan pencereden vardiya.feature dosyasını seçip testleri başlatabilirsiniz.
