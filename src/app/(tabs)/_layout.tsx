import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarIconStyle: { display: 'none' },
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: { fontSize: 14 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Profil' }} />
      <Tabs.Screen name="contacts" options={{ title: 'Contacts' }} />
    </Tabs>
  );
}
