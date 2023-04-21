import { Home } from '../screens/home';
import { Info } from '../screens/info';
import { Scan } from '../screens/scan';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../colors';

const Tab = createBottomTabNavigator();

const iconSize = 30;

export const ValidatorAppTabs = () => {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false, 
        tabBarActiveTintColor: colors.white, 
        tabBarInactiveTintColor: colors.tertiary,
        tabBarStyle: { height: 60, paddingBottom: 10, backgroundColor: colors.primary },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Scan"
        component={Scan}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={size}
              color={color}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};
