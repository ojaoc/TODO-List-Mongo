import React, { useState } from 'react';
import { Box, IconButton, Stack, Text } from '@chakra-ui/react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { GoPlus } from 'react-icons/go';
import ToDoListItem from './ToDoListItem';

const ToDoList = ({
  listName,
  items,
  handleClickCreateItem,
  handleChangeTitle,
  handleChangeDescription,
  handleSubmitForm,
  handleCloseForm,
  isCreating,
}) => {
  return (
    <Box bg="gray.50" minW="280px" rounded="lg" px="5" py="6">
      <Text fontSize="lg" fontWeight="semibold">
        {listName}
      </Text>
      <IconButton
        w="100%"
        mt="3"
        mb="4"
        aria-label="Add new to do"
        icon={<GoPlus />}
        onClick={handleClickCreateItem(listName)}
        isDisabled={isCreating}
        colorScheme="teal"
      />
      <Droppable droppableId={listName}>
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
            {items.map(({ _id, title, description, creating }, index) =>
              creating ? (
                <ToDoListItem
                  key={index}
                  handleCloseForm={handleCloseForm(listName)}
                  handleSubmitForm={handleSubmitForm(listName)}
                  handleChangeTitle={handleChangeTitle(listName)}
                  handleChangeDescription={handleChangeDescription(listName)}
                  draggableProvided={{}}
                  title={title}
                  description={description}
                  isCreating={true}
                />
              ) : (
                <Draggable
                  key={_id}
                  draggableId={_id}
                  index={index}
                  isDragDisabled={isCreating}
                >
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
    </Box>
  );
};
export default ToDoList;
