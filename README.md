"# kvy-project" 

Prérequis : Docker, Docker Compose, Java 17+, Node.js/npm.

Installation Backend : cd backend && mvnw clean install

Installation Frontend : cd frontend && npm install

Lancement de l'environnement : docker-compose up -d

Lancement des applications :

Backend : cd backend && mvnw spring-boot:run

Frontend : cd frontend && ng serve

Accès : Application sur http://localhost:4200, API sur http://localhost:8081.
