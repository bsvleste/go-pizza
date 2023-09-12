import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { UserTabRoutes } from "./user.tab.routes"
import { useAuth } from "@hooks/auth"

export function Routes() {
  const { user } = useAuth()
  return (
    <NavigationContainer>
      <UserTabRoutes />
    </NavigationContainer >
  )
}