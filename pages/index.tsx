import { Box, IconButton, Container, Stack, Text } from '@chakra-ui/react';
import { GoPlus } from 'react-icons/go';
import ToDoListItem from '@/components/ToDoListItem';

export default function Home() {
  return (
    <Container maxW="container.lg">
      <Box bg="gray.50" maxW="350px" rounded="lg" px="5" py="6">
        <Text fontSize="lg" fontWeight="semibold">
          To do
        </Text>
        <IconButton
          w="100%"
          mt="3"
          mb="4"
          aria-label="Add new to do"
          icon={<GoPlus />}
        ></IconButton>
        <Stack direction="column">
          <ToDoListItem />
        </Stack>
      </Box>
    </Container>
  );
}
