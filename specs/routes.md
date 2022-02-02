# BACK

|Méthode|URL|Controller|Description|
|-------|---|----------|-----------|
| POST | /login | userController | Pour s'identifier|
| GET | /logout | userController | Pour se déconnecter |
| POST | /signup | userController | Pour s'inscrire|
| GET | /member/:id | userController | Pour afficher le profil d'un utilisateur |
| GET | /pending-subscriptions | subscriptionController | Pour afficher les inscriptions en attente de validation |
| GET | /validated-sub/:member-id | subscriptionController | Pour valider une inscription |
| GET | /refused-sub/:member-id | subscriptionController | Pour refuser une inscription |
| -| -| -| -|