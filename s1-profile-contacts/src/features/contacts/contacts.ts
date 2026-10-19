export type Role = 'student' | 'teacher' | 'admin';

export type Contact = {
  id: string;
  name: string;
  role: Role;
  phone?: string;
  email?: string;
};

export const ROLE_LABELS: Record<Role, string> = {
  student: 'Étudiant',
  teacher: 'Enseignant',
  admin: 'Administration',
};

export const CONTACTS: Contact[] = [
  { id: '1', name: 'Ahmed Ben Ali', role: 'student', email: 'ahmed@example.com' },
  { id: '2', name: 'Sarra Trabelsi', role: 'teacher', phone: '+216 22 987 654' },
  { id: '3', name: 'Youssef Mansour', role: 'admin' },
  { id: '4', name: 'Mariem Khelifi', role: 'student' },
];

export function getContactById(id: string | undefined): Contact | undefined {
  return CONTACTS.find((contact) => contact.id === id);
}
