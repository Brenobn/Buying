import { Box, Center, Text } from "@gluestack-ui/themed";

export default function Home() {
  return (
    <Center flex={1} bg="$white">
      <Text size="2xl" bold color="$blue500">
        School Manager
      </Text>
      <Text>Agora sim! Tudo configurado.</Text>
    </Center>
  );
}