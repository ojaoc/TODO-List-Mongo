import { Box, IconButton, Stack, Text } from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GoPlus } from 'react-icons/go';
import ToDoListItem from './ToDoListItem';
import data from '../data';

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
      <DragDropContext>
        <Droppable droppableId="todo">
          {({ droppableProps, innerRef, placeholder }) => (
            <Stack
              {...droppableProps}
              spacing="24px"
              direction="column"
              ref={innerRef}
            >
              {data.map(({ _id, title, description }, index) => (
                <Draggable key={_id} draggableId={_id} index={index}>
                  {(draggableProvided) => (
                    <ToDoListItem draggableProvided={draggableProvided} />
                  )}
                </Draggable>
              ))}
              {placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};
export default ToDoList;
