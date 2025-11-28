import { useState } from "react"
import { Platform, KeyboardAvoidingView, ScrollView } from "react-native"
import {
  Actionsheet, 
  ActionsheetBackdrop, 
  ActionsheetContent, 
  ActionsheetDragIndicatorWrapper, 
  ActionsheetDragIndicator, 
  Box, 
  Text, 
  VStack, 
  FormControl, 
  FormControlLabel, 
  FormControlLabelText, 
  Input, 
  InputField, 
  Button, 
  ButtonText, 
  HStack, 
  Toast, 
  ToastTitle, 
  useToast
} from "@gluestack-ui/themed"
import { api } from "../services/api"

interface CreateClassModalProps {
  isOpen: boolean
  onClose: () => void
  schoolId: string
  onSuccess: () => void
}

export function CreateClassModal({ isOpen, onClose, schoolId, onSuccess }: CreateClassModalProps) {
  const [name, setName] = useState("")
  const [type, setType] = useState<"morning" | "afternoon" | "night">("morning")
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  async function handleCreate() {
    if (!name.trim()) {
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast nativeID={id} action="error" variant="accent">
            <ToastTitle>O nome da turma é obrigatório</ToastTitle>
          </Toast>
        )
      })
      return
    }

    setLoading(true)
    try {
      await api.post(`/schools/${schoolId}/classes`, {
        name,
        type,
      })

      setName("")
      setType("morning")
      onSuccess()
      onClose()
    } catch (error) {
      console.log(error)
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast nativeID={id} action="error" variant="accent">
            <ToastTitle>Erro ao criar turma</ToastTitle>
          </Toast>
        )
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} zIndex={999}>
      <ActionsheetBackdrop />
      <ActionsheetContent zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          style={{ width: '100%' }}
          keyboardVerticalOffset={Platform.OS === "android" ? 0 : 0}
        >
          <ScrollView showsVerticalScrollIndicator={false}>

            <VStack w="$full" p="$4" space="md" pb="$12">
              <Text size="lg" bold>Nova Turma</Text>

              <FormControl>
                <FormControlLabel><FormControlLabelText>Nome da Turma</FormControlLabelText></FormControlLabel>
                <Input>
                  <InputField placeholder="Ex: 1° Ano B" value={name} onChangeText={setName} autoFocus={isOpen}/>
                </Input>
              </FormControl>

              <FormControl>
                <FormControlLabel><FormControlLabelText>Turno</FormControlLabelText></FormControlLabel>
                <HStack space="sm">
                  {['morning', 'afternoon', 'night'].map((t) => (
                    <Button
                      key={t}
                      flex={1}
                      variant={type === t ? "solid" : "outline"}
                      action={type === t ? "primary" : "secondary"}
                      onPress={() => setType(t as any)}
                      size="sm"
                    >
                      <ButtonText>
                        {t === 'morning' ? 'Manhã' : t === 'afternoon' ? 'Tarde' : 'Noite'}
                      </ButtonText>
                    </Button>
                  ))}
                </HStack>
              </FormControl>

              <Button mt="$4" onPress={handleCreate} isDisabled={loading}>
                <ButtonText>{loading ? "Salvando..." : "Criar Turma"}</ButtonText>
              </Button>
            </VStack>
          </ScrollView>  
        </KeyboardAvoidingView>
      </ActionsheetContent>
    </Actionsheet>
  )
}