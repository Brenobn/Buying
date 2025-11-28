import { useEffect, useState } from "react"
import { FlatList } from "react-native"
import { Box, Center, Spinner, Text, VStack, Heading, Fab, FabIcon, AddIcon } from "@gluestack-ui/themed"
import { api } from "../src/services/api"
import { School } from "../src/types"
import { SchoolCard } from "../src/components/SchoolCard"
import { CreateSchoolModal } from "../src/components/CreateSchoolModal"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"

export default function Home() {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
 
  async function fetchSchools() {
    try {
      const response = await api.get("/schools")
      setSchools(response.data.schools) 
    } catch (error) {
      console.log("Erro ao buscar escolas:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSchools()
  }, [])

  if (loading) {
    return (
      <Center flex={1} bg="$coolGray100">
        <Spinner size="large" color="$blue500" />
        <Text mt="$2">Carregando escolas...</Text>
      </Center>
    )
  }

  return (
    <Box flex={1} bg="$coolGray100">
      <SafeAreaView style={{ flex: 1 }}>
        <VStack flex={1} p="$4" space="md">
          <Heading size="xl" color="$blue600">
            Escolas Públicas
          </Heading>

          <FlatList
            data={schools}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SchoolCard 
                data={item} 
                onPress={() => {
                  console.log("👉 CLIQUEI NO ID:", item.id)
                  router.push(`/school/${item.id}`)
                }} 
              />
            )}
            contentContainerStyle={{ paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <Center mt="$10">
                <Text>Nenhuma escola cadastrada.</Text>
              </Center>
            )}
          />
        </VStack>

        <Fab size="lg" placement="bottom right" bg="$blue600" onPress={() => setShowModal(true)}>
          <FabIcon as={AddIcon} />
        </Fab>

        <CreateSchoolModal 
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={() => fetchSchools()}
        />
      </SafeAreaView>
    </Box>
  );
}