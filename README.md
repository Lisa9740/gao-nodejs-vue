# gao-nodejs-vue

## Projet de gestion d'attribution de postes informatique

La conception et le développement de ce projet s'est effectué dans le cadre de la formation de Simplon.

Ce projet utilise les technologies suivantes :

    backend : Nodejs
    frontend : Vue.js
    
## Initialisation du projet backend :

Après avoir fait un git clone de ce projet, vous devez effectué les actions suivantes :

    cd server
    npm install
    
 Accès base de données : 

    - créer et remplir le fichier config.json en prenant l'example de conf.example.json
    - npx sequelize db:migrate
    - npx sequelize db:seed:all
   
    

## Initialisation du projet frontend:

Après avoir fait un git clone de ce projet, vous devez effectué les actions suivantes :

    cd client
    npm install
    npm run serve

## Lancement du projet :
  cd client && npm run serve
  
  
## Identifiant de connexion :
    
    email : admin@gmail.com
    mot de passe : test

## TODO :
    - ajouter navbar
    - pouvoir supprimer une attribution
    - afficher attribution par date
    - ajouter pagination 
  
  
