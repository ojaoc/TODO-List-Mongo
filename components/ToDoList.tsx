import React, { useState } from 'react';
import { Box, IconButton, Stack, Text } from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GoPlus } from 'react-icons/go';
import ToDoListItem from './ToDoListItem';
import mongoose from 'mongoose';

const ToDoList = () => {
  const [items, setItems] = useState([]);

  const isCreating =
    typeof items.find((item) => item.isCreating === true) === 'object';

  const handleOnDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }
    const newArr = items.filter((item) => items.indexOf(item) !== source.index); // Filters out element in old position
    newArr.splice(destination.index, 0, items[source.index]); // Then places it in the new position
    setItems(newArr);
  };

  const handleClickCreateItem = () => {
    setItems([
      {
        _id: new mongoose.Types.ObjectId().toHexString(),
        title: '',
        description: '',
        isCreating: true,
      },
      ...items,
    ]);
  };

  const handleChangeTitle = (e) => {
    const firstItem = items[0];
    firstItem.title = e.target.value;
    setItems([firstItem, ...items.slice(1)]);
  };

  const handleChangeDescription = (e) => {
    const firstItem = items[0];
    firstItem.description = e.target.value;
    setItems([firstItem, ...items.slice(1)]);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const firstItem = items[0];
    firstItem.isCreating = false;
    setItems([firstItem, ...items.slice(1)]);
  };

  const handleCloseForm = () => {
    setItems(items.slice(1));
  };

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
        onClick={handleClickCreateItem}
        isDisabled={isCreating}
        colorScheme="teal"
      />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="toDo">
          {({ droppableProps, innerRef, placeholder }) => (
            <Stack
              {...droppableProps}
              spacing="24px"
              direction="column"
              ref={innerRef}
            >
              {items.length < 1 && (
                <Box bg="white" w="100%" rounded="lg" boxShadow="xs" py="10">
                  <Text
                    color="gray.400"
                    fontWeight="semibold"
                    fontSize="xl"
                    align="center"
                  >
                    This list is empty!
                  </Text>
                </Box>
              )}
              {items.map(({ _id, title, description, isCreating }, index) =>
                isCreating ? (
                  <ToDoListItem
                    key={index}
                    handleCloseForm={handleCloseForm}
                    handleSubmitForm={handleSubmitForm}
                    handleChangeTitle={handleChangeTitle}
                    handleChangeDescription={handleChangeDescription}
                    draggableProvided={{}}
                    title={title}
                    description={description}
                    isCreating={true}
                  />
                ) : (
                  <Draggable key={_id} draggableId={_id} index={index}>
                    {(draggableProvided) => (
                      <ToDoListItem
                        handleCloseForm={() => null}
                        handleSubmitForm={() => null}
                        handleChangeTitle={() => null}
                        handleChangeDescription={() => null}
                        draggableProvided={draggableProvided}
                        title={title}
                        description={description}
                        isCreating={false}
                      />
                    )}
                  </Draggable>
                )
              )}
              {placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};
export default ToDoList;
