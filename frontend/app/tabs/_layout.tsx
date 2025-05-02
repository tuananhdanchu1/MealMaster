import { Tabs } from 'expo-router';
import { Chrome as Home, Camera, ShoppingCart } from 'lucide-react-native';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const tabBarStyle = {
    backgroundColor: colors.cardBackground,
    paddingBottom: Platform.OS === 'ios' ? insets.bottom : 8,
    paddingTop: 8,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 60 + (Platform.OS === 'ios' ? insets.bottom : 0),
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontFamily: 'Montserrat-Medium',
          fontSize: 12,
          marginTop: -4,
          marginBottom: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Social',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="meal-planning"
        options={{
          title: 'Meals',
          tabBarIcon: ({ color }) => (
            <View style={styles.centerTabContainer}>
              <View style={[styles.centerTabButton, { backgroundColor: colors.primary }]}>
                <Camera color="white" size={24} strokeWidth={2.5} />
              </View>
              <Text style={[styles.tabLabel, { color: colors.textSecondary }]}>Meals</Text>
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="shopping"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, size }) => (
            <ShoppingCart color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerTabContainer: {
    alignItems: 'center',
    height: 60,
    width: 60,
    marginTop: -20,
  },
  centerTabButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  tabLabel: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    marginTop: 4,
  },
});