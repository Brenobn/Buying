import { Box, Text, VStack, Heading, HStack, Icon, EditIcon } from "@gluestack-ui/themed"
import { Pressable } from "react-native"
import { School } from "../types"

interface SchoolCardProps {
  data: School
  onPress: () => void
}

export function SchoolCard({ data, onPress }: SchoolCardProps) {
  return (
    <Pressable onPress={onPress}>
      <Box
        bg="$white"
        p="$4"
        mb="$3"
        borderRadius="$md"
        hardShadow="2"
        borderColor="$borderLight200"
        borderWidth={1}
      >
        <HStack justifyContent="space-between" alignItems="center">
          <VStack space="xs">
            <Heading size="sm" color="$textDark900">
              {data.name}
            </Heading>
            <Text size="sm" color="$TextLight500">
              {data.address}
            </Text>
          </VStack>

          <Icon as={EditIcon} color="$coolGray400" />
        </HStack>
      </Box>
    </Pressable>
  )
}