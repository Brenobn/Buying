import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import { Slot } from "expo-router" 
import { SafeAreaProvider } from "react-native-safe-area-context"
import { makeServer } from "../src/services/server"

if (process.env.NODE_ENV === "development") {
  //@ts-ignore
  if (window.server) {
    //@ts-ignore
    window.server.shutdown()
  }
  makeServer()
}

export default function Layout() { 
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaProvider>
        <Slot /> 
      </SafeAreaProvider>
    </GluestackUIProvider>
  )
}