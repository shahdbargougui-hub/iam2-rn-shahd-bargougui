import { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { firestoreErrorMessage } from './firestoreErrors';
import { tasksRepo, type Task } from './tasksRepo';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = tasksRepo.listen(
      (next) => {
        setTasks(next);
        setError(null);
        setLoading(false);
      },
      (err) => {
        setError(firestoreErrorMessage(err));
        setLoading(false);
      },
    );
    return unsubscribe;
  }, []);

  return { tasks, loading, error };
}

export function useTaskActions() {
  const { user } = useAuth();
  const [actionError, setActionError] = useState<string | null>(null);

  const run = async (action: () => Promise<unknown>) => {
    setActionError(null);
    try {
      await action();
    } catch (err) {
      setActionError(firestoreErrorMessage(err));
    }
  };

  return {
    actionError,
    addTask: (title: string) =>
      run(async () => {
        if (user === null) return;
        await tasksRepo.add(title, user.uid, user.email ?? '');
      }),
    toggleTask: (task: Task) => run(() => tasksRepo.setDone(task.id, !task.done)),
    deleteTask: (task: Task) => run(() => tasksRepo.remove(task.id)),
  };
}
