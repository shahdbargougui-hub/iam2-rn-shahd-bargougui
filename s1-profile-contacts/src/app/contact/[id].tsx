import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { getContactById, ROLE_LABELS } from '@/features/contacts/contacts';

export default function ContactDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const contact = getContactById(id);

  if (!contact) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Contact introuvable' }} />
        <Text style={styles.name}>Contact introuvable</Text>
        <Text style={styles.line}>Identifiant demandé : {id}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: contact.name }} />
      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.line}>Rôle : {ROLE_LABELS[contact.role]}</Text>
      <Text style={styles.line}>Téléphone : {contact.phone ?? 'non renseigné'}</Text>
      <Text style={styles.line}>E-mail : {contact.email ?? 'non renseigné'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 8, padding: 24, backgroundColor: '#ffffff' },
  name: { fontSize: 24, fontWeight: '700', color: '#1f2430', marginBottom: 8 },
  line: { fontSize: 16, color: '#374151' },
});
