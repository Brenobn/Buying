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
  useToast, 
  Icon, 
  CloseIcon
} from "@gluestack-ui/themed"
import { api } from "../services/api"

interface CreateSchoolModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function CreateSchoolModal({ isOpen, onClose, onSuccess }: CreateSchoolModalProps) {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  async function handleCreate() {
    if (!name.trim() || !address.trim()) {
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast nativeID={id} action="error" variant="accent">
            <ToastTitle>Preencha nome e endereço</ToastTitle>
          </Toast>
        )
      })
      return
    }

    setLoading(true)
    try {
      await api.post("/schools", {
        name,
        address
      })

      setName("")
      setAddress("")

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast nativeID={id} action="success" variant="accent">
            <ToastTitle>Escola cadastrada!</ToastTitle>
          </Toast>
        )
      })

      onSuccess()
      onClose()
    } catch (error) {
      console.log(error)
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast nativeID={id} action="error" variant="accent">
            <ToastTitle>Erro ao criar escola</ToastTitle>
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
          style={{ width: "100%" }}
          keyboardVerticalOffset={Platform.OS === "android" ? 0 : 0}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack w="$full" p="$4" space="md" pb="$20">
              <HStack justifyContent="space-between" alignItems="center">
                <Text size="lg" bold>Nova Escola</Text>
                <Button size="xs" variant="link" onPress={onClose} p="$0">
                  <Icon as={CloseIcon} size="md" color="$coolGray500" />
                </Button>
              </HStack>

              <FormControl>
                <FormControlLabel><FormControlLabelText>Nome da Escola</FormControlLabelText></FormControlLabel>
                <Input>
                  <InputField placeholder="Ex: Colégio Monteiro Lobato" value={name} onChangeText={setName} autoFocus={isOpen} />
                </Input> 
              </FormControl>

              <FormControl>
                <FormControlLabel><FormControlLabelText>Endereço completo</FormControlLabelText></FormControlLabel>
                <Input>
                  <InputField placeholder="Ex: Rua Dona Claudina, 450" value={address} onChangeText={setAddress}/>
                </Input>
              </FormControl>

              <Button mt="$4" bg="$blue600" onPress={handleCreate} isDisabled={loading}>
                <ButtonText>{loading ? "Salvando..." : "Cadastrar Escola"}</ButtonText>
              </Button>
            </VStack>
          </ScrollView>  
        </KeyboardAvoidingView>
      </ActionsheetContent>
    </Actionsheet>
  )
}