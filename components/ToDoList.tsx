import { Box, IconButton, Stack, Text } from '@chakra-ui/react';
import { GoPlus } from 'react-icons/go';
import ToDoListItem from './ToDoListItem';

const ToDoList = () => {
  return (
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
      <Stack spacing="24px" direction="column">
        <ToDoListItem />
        <ToDoListItem />
        <ToDoListItem />
        <ToDoListItem />
        <ToDoListItem />
      </Stack>
    </Box>
  );
};
export default ToDoList;
