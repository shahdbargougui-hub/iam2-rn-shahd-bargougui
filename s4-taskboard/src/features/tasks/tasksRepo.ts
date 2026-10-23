import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  type Timestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type Task = {
  id: string;
  title: string;
  done: boolean;
  ownerId: string;
  ownerEmail: string;
  createdAt: Timestamp | null;
  pending: boolean;
};

type TaskData = Omit<Task, 'id' | 'pending'>;

const tasksCollection = collection(db, 'tasks');

export const tasksRepo = {
  listen: (onChange: (tasks: Task[]) => void, onError: (error: Error) => void): Unsubscribe =>
    onSnapshot(
      query(tasksCollection, orderBy('createdAt', 'desc')),
      { includeMetadataChanges: true },
      (snapshot) => {
        onChange(
          snapshot.docs.map((d) => ({
            id: d.id,
            ...(d.data({ serverTimestamps: 'estimate' }) as TaskData),
            pending: d.metadata.hasPendingWrites,
          })),
        );
      },
      onError,
    ),
  add: (title: string, ownerId: string, ownerEmail: string) =>
    addDoc(tasksCollection, { title, done: false, ownerId, ownerEmail, createdAt: serverTimestamp() }),
  setDone: (id: string, done: boolean) => updateDoc(doc(db, 'tasks', id), { done }),
  remove: (id: string) => deleteDoc(doc(db, 'tasks', id)),
};
