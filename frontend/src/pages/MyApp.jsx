import { Flex, Text, Button ,Heading} from "@radix-ui/themes";

export default function MyApp() {
  return (
    <Flex direction="column" gap="3" p="4">
        <Heading mb="2" size="4">Typographic principles</Heading>
<Text>The goal of typography is to relate font size, line height, and line width in a proportional way that maximizes beauty and makes reading easier and more pleasant.</Text>

      <Text size="4" weight="bold">
        Hello from Radix Themes 🎉
      </Text>
      <Button>Let’s go</Button>
    </Flex>
  );
}
