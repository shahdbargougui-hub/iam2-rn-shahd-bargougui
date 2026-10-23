import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Task } from '@/features/tasks/tasksRepo';

type Props = {
  task: Task;
  isMine: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

export function TaskRow({ task, isMine, onToggle, onDelete }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.body}>
        <Text style={[styles.title, task.done && styles.done]}>{task.title}</Text>
        <Text style={styles.meta}>
          {isMine ? 'Vous' : task.ownerEmail}
          {task.pending ? ' · en attente du serveur' : ''}
        </Text>
      </View>
      <Pressable style={styles.button} onPress={onToggle}>
        <Text style={styles.buttonText}>{task.done ? 'Rouvrir' : 'Terminer'}</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={onDelete}>
        <Text style={[styles.buttonText, styles.danger]}>Supprimer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#cbd5e1',
    backgroundColor: '#ffffff',
  },
  body: { flex: 1 },
  title: { fontSize: 16, color: '#0f172a' },
  done: { textDecorationLine: 'line-through', color: '#94a3b8' },
  meta: { fontSize: 12, color: '#64748b', marginTop: 2 },
  button: { paddingHorizontal: 8, paddingVertical: 6 },
  buttonText: { fontSize: 14, fontWeight: '600', color: '#1f2430' },
  danger: { color: '#b91c1c' },
});
