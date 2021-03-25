import ToDoList from '@/components/ToDoList';
import { Container } from '@chakra-ui/react';

export default function Home() {
  return (
    <Container maxW="container.lg">
      <ToDoList />
    </Container>
  );
}
