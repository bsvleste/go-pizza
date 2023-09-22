import React, { useEffect, useState } from "react";
import { Platform } from 'react-native';
import { useTheme } from 'styled-components/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Orders } from "@src/screens/Orders";
import { Home } from "@src/screens/Home";
import { BottomMenu } from "@src/components/BottomMenu";
import { QuerySnapshot, collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "@src/config/firebaseConfig";
const { Navigator, Screen } = createBottomTabNavigator()
export function UserTabRoutes() {
  const { COLORS } = useTheme()
  const [notifications, setNofications] = useState("0")
  const pizzasRef = collection(firestore, "orders")
  const queryPizza = query(pizzasRef, where('status', '==', "Pronto"))
  async function handleGetOrders() {
    onSnapshot(queryPizza, (snapShot) => {
      setNofications(String(snapShot.docs.length))
    })
  }
  useEffect(() => {
    handleGetOrders()
  }, [])
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
            <BottomMenu notifications={notifications} title="Pedidos" color={color} />
          )
        }}
      />
    </Navigator>
  )
}