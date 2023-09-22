import React from "react";
import { Platform } from 'react-native';
import { useTheme } from 'styled-components/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Orders } from "@src/screens/Orders";
import { Home } from "@src/screens/Home";
import { BottomMenu } from "@src/components/BottomMenu";
const { Navigator, Screen } = createBottomTabNavigator()
export function UserTabRoutes() {
  const { COLORS } = useTheme()
  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.SECONDARY_900,
        tabBarInactiveTintColor: COLORS.SECONDARY_400,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0
        }
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu title="Cardapio" color={color} />
          )
        }}
      />
      <Screen
        name="orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu notifications='2' title="Pedidos" color={color} />
          )
        }}
      />
    </Navigator>
  )
}