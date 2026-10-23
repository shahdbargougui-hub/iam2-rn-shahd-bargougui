import { FirebaseError } from 'firebase/app';

export function firestoreErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    if (error.code === 'permission-denied') {
      return 'Refusé par les règles de sécurité Firestore.';
    }
    if (error.code === 'unavailable') {
      return 'Firestore est injoignable. Vérifiez le réseau.';
    }
    return `Erreur Firestore : ${error.code}`;
  }
  return 'Erreur inattendue. Réessayez.';
}
