import { useEffect, useState } from "react"
import { useLocalSearchParams, Stack } from "expo-router"
import { 
  Box, Text, VStack, Heading, Center, Spinner, HStack, 
  Badge, BadgeText, Fab, FabIcon, AddIcon, Icon, 
  ClockIcon, CalendarDaysIcon, 
  TrashIcon
} from "@gluestack-ui/themed"
import { FlatList, Alert, Pressable } from "react-native"
import { api } from "../../src/services/api"
import { School, SchoolClass } from "../../src/types"
import { CreateClassModal } from "../../src/components/CreateClassModal"

export default function SchoolDetails() {
  const { id } = useLocalSearchParams()
  const [school, setSchool] = useState<School | null>(null)
  const [classes, setClasses] = useState<SchoolClass[]>([])
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

  async function fetchData() {
    if (!id) return

    try {
      const [schoolRes, classesRes] = await Promise.all([
        api.get(`/schools/${id}`),
        api.get(`/schools/${id}/classes`)
      ])

      const schoolData = schoolRes.data?.school;
      const classesData = classesRes.data?.schoolClasses;

      if (schoolData) {
        setSchool(schoolData)
      } else {
        console.warn("API retornou vazio para a escola")
      }

      if (classesData) {
        setClasses(classesData)
      }

    } catch (error) {
      console.log("Erro na requisição:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [id])

  if (loading) {
    return <Center flex={1} bg="$coolGray100"><Spinner size="large" color="$blue600"/></Center>
  }

  if (!school) {
    return (
      <Center flex={1} bg="$coolGray100">
        <Text>Escola não encontrada.</Text>
        <Text size="xs" color="$textLight400">Tente voltar e clicar novamente.</Text>
      </Center>
    )
  }

  async function handleDeleteClass(classId: string) {
    Alert.alert(
      "Ecluir Turma",
      "Tem certeza que deseja apagar essa turma?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/schools/${id}/classes/${classId}`)
              setClasses(prev => prev.filter(c => c.id !== classId))
            } catch (error) {
              console.log("Erro ao deletar:", error)
              Alert.alert("Erro", "Não foi possível excluir a turma.")
            }
          }
        }
      ]
    )
  }

  return (
    <Box flex={1} bg="$coolGray100">
      <Stack.Screen 
        options={{ 
          title: "Detalhes da Escola", 
          headerStyle: { backgroundColor: '#F3F4F6' },
          headerShadowVisible: false
        }} 
      />

      <VStack flex={1} px="$4" pt="$2" space="lg">
        
        <Box bg="$white" p="$5" borderRadius="$xl" hardShadow="2">
          <VStack space="xs">
            <Text size="xs" color="$blue600" bold textTransform="uppercase">
              Instituição de Ensino
            </Text>
            <Heading size="xl" color="$textDark900" lineHeight="$md">
              {school.name}
            </Heading>
            <HStack alignItems="center" space="xs" mt="$1">
              <Icon as={CalendarDaysIcon} size="sm" color="$textLight400" />
              <Text size="sm" color="$textLight500">
                {school.address}
              </Text>
            </HStack>
          </VStack>
        </Box>

        <VStack flex={1} space="md">
          <HStack justifyContent="space-between" alignItems="center">
            <Heading size="md" color="$textDark700">
              Turmas
            </Heading>
            <Badge size="md" variant="solid" action="info" borderRadius="$full">
              <BadgeText>{classes.length} ativas</BadgeText>
            </Badge>
          </HStack>

          <FlatList
            data={classes}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Box 
                bg="$white" 
                p="$4" 
                mb="$3" 
                borderRadius="$lg" 
                borderLeftWidth={6} 
                borderLeftColor={
                  item.type === 'morning' ? '$orange400' : 
                  item.type === 'afternoon' ? '$yellow400' : '$purple500'
                }
                hardShadow="1"
              >
                <HStack justifyContent="space-between" alignItems="center">
                  <VStack>
                    <Heading size="md" color="$textDark800">{item.name}</Heading>
                    <HStack alignItems="center" space="xs" mt="$1">
                      <Icon as={ClockIcon} size="xs" color="$textLight400"/>
                      <Text size="xs" color="$textLight500">
                        {item.type === 'morning' ? '07:00 - 12:00' : 
                         item.type === 'afternoon' ? '13:00 - 18:00' : '19:00 - 22:30'}
                      </Text>
                    </HStack>
                  </VStack>

                  <HStack alignItems="center" space="md">
                    <Badge 
                      variant="outline" 
                      action={item.type === 'morning' ? 'warning' : item.type === 'afternoon' ? 'success' : 'info'}
                    >
                      <BadgeText fontWeight="$bold">
                        {item.type === 'morning' ? 'Manhã' : item.type === 'afternoon' ? 'Tarde' : 'Noite'}
                      </BadgeText>
                    </Badge>

                      <Pressable onPress={() => handleDeleteClass(item.id)}>
                        <Icon as={TrashIcon} color="$red400" size="md" />
                      </Pressable>
                  </HStack>
                </HStack>
              </Box>
            )}
            ListEmptyComponent={() => (
              <Center mt="$10" p="$4" bg="$white" borderRadius="$lg" opacity={0.6}>
                <Text bold color="$textLight400">Nenhuma turma cadastrada nesta escola.</Text>
                <Text size="xs" color="$textLight300">Use o botão + para criar a primeira.</Text>
              </Center>
            )}
          />
        </VStack>
      </VStack>
      
      <Fab size="lg" placement="bottom right" bg="$blue600" onPress={() => setShowModal(true)}>
        <FabIcon as={AddIcon} />
      </Fab>

      <CreateClassModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        schoolId={id as string}
        onSuccess={() => fetchData()}
      />
    </Box>
  );
}