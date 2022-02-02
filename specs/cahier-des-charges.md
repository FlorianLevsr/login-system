# Cahier des charges

## Présentation

Réaliser un login system sécurisé avec validation des inscriptions par un administrateur.

## MVP

- inscription
- login
- logout
- consultation d'un profil


## Stack envisagée

### Backend

- NodeJS
- Express 
- Mongo DB Atlas (cloud)
- Mongoose ODM
- Packages envisagés, à titre indicatif: json-web-token, argon

### Frontend

- Pas de front prévu pour le moment

## Routes

### MVP

- Root: /
- Login: /login
- Logout: /logout
- inscription: /signup
- member profile: /profile/:member-id

### Projet complet

- inscription en attente de validation: /pending-subscriptions
- validation de l'inscription: /validated-sub/:member-id
- refus de l'inscription: /refused-sub/:member-id

