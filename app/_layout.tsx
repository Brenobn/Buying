import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import { Slot } from "expo-router" 
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function Layout() { 
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaProvider>
        <Slot /> 
      </SafeAreaProvider>
    </GluestackUIProvider>
  )
}