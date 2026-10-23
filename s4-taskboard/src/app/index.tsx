import { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { TaskRow } from '@/components/TaskRow';
import { useAuth } from '@/features/auth/AuthContext';
import { useTaskActions, useTasks } from '@/features/tasks/useTasks';

export default function BoardScreen() {
  const { user, signOut } = useAuth();
  const { tasks, loading, error } = useTasks();
  const { actionError, addTask, toggleTask, deleteTask } = useTaskActions();
  const [title, setTitle] = useState('');

  const submit = () => {
    const trimmed = title.trim();
    if (trimmed.length === 0) return;
    setTitle('');
    addTask(trimmed);
  };

  return (
    <View style={styles.container}>
      <View style={styles.account}>
        <Text style={styles.email}>Connecté : {user?.email}</Text>
        <Pressable onPress={signOut}>
          <Text style={styles.link}>Se déconnecter</Text>
        </Pressable>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Nouvelle tâche"
          placeholderTextColor="#94a3b8"
          onSubmitEditing={submit}
          returnKeyType="done"
        />
        <Pressable style={styles.add} onPress={submit}>
          <Text style={styles.addText}>Ajouter</Text>
        </Pressable>
      </View>
      {error !== null && <Text style={styles.error}>{error}</Text>}
      {actionError !== null && <Text style={styles.error}>{actionError}</Text>}
      {loading ? (
        <ActivityIndicator style={styles.spinner} />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(task) => task.id}
          renderItem={({ item }) => (
            <TaskRow
              task={item}
              isMine={item.ownerId === user?.uid}
              onToggle={() => toggleTask(item)}
              onDelete={() => deleteTask(item)}
            />
          )}
          ListEmptyComponent={<Text style={styles.empty}>Aucune tâche pour le moment.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  account: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f1f5f9',
  },
  email: { flex: 1, fontSize: 14, color: '#334155' },
  link: { fontSize: 14, fontWeight: '600', color: '#b91c1c' },
  form: { flexDirection: 'row', gap: 8, padding: 16 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#0f172a',
  },
  add: { backgroundColor: '#1f2430', borderRadius: 8, paddingHorizontal: 16, justifyContent: 'center' },
  addText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  error: { color: '#b91c1c', fontSize: 14, paddingHorizontal: 16, paddingBottom: 8 },
  spinner: { marginTop: 24 },
  empty: { textAlign: 'center', color: '#64748b', marginTop: 24 },
});
