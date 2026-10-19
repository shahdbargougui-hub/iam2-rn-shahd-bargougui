# s3-mini-shop

Séance 03 - Mini-Shop (DummyJSON) (IAM2, React Native avec Expo)

## Auteur

Bella

## Ce qui est réalisé

- Client fetch typé api<T>() avec ApiError et en-tête Bearer
- Catalogue à défilement infini avec useInfiniteQuery, tirer pour rafraîchir, états chargement, erreur et vide
- Filtre par catégorie et recherche avec délai (debounce)
- Fiche produit product/[id]
- Connexion DummyJSON, jeton dans SecureStore, session partagée avec un Context, profil /auth/me
- Panier local SQLite lu avec useQuery et modifié avec useMutation
- Défi (panier distant avec mise à jour optimiste) : fait ou non fait

## Captures d'écran

![Catalogue sur le téléphone](screenshots/s3-catalogue.png)

![Panier sur le téléphone](screenshots/s3-cart.png)

## Environnement

- Expo SDK : 57
- Téléphone : modèle et version du système
- Expo Go : version affichée dans l'application
- Compte de démonstration utilisé : emilys (compte public de DummyJSON)

## Réponse du défi

Trois lignes : pourquoi le panier renvoyé par DummyJSON n'apparaît pas ensuite dans GET /carts, et ce qui changerait avec un vrai serveur.

## Sortie de npx expo-doctor@latest

Collez ici la sortie complète de la commande, dans un bloc de code.
