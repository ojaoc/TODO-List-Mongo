import {
  Box,
  Flex,
  Icon,
  Text,
  Input,
  Textarea,
  Button,
  IconButton,
} from '@chakra-ui/react';
import React from 'react';
import { GoPrimitiveDot, GoX } from 'react-icons/go';

const ToDoListItem = ({
  draggableProvided,
  isCreating,
  handleCloseForm,
  handleSubmitForm,
  title,
  description,
  handleChangeTitle,
  handleChangeDescription,
}) => (
  <Box
    ref={draggableProvided.innerRef}
    {...draggableProvided.draggableProps}
    {...draggableProvided.dragHandleProps}
    bg="white"
    w="100%"
    rounded="lg"
    boxShadow="xs"
    px="2"
    py="3"
  >
    {isCreating ? (
      <form onSubmit={handleSubmitForm}>
        <Box px="3.5" py="2">
          <Flex align="center" justify="space-between">
            <Text color="gray.600" pl="1" fontWeight="semibold">
              Add item
            </Text>
            <IconButton
              onClick={handleCloseForm}
              aria-label="Close To Do form"
              icon={<GoX />}
              variant="ghost"
            />
          </Flex>
          <Flex py="4">
            <Input
              placeholder="Title"
              focusBorderColor="teal.500"
              value={title}
              onChange={handleChangeTitle}
            />
          </Flex>
          <Flex pb="4">
            <Textarea
              resize="none"
              placeholder="Description"
              focusBorderColor="teal.500"
              value={description}
              onChange={handleChangeDescription}
            />
          </Flex>
          <Flex justify="flex-end" pt="1">
            <Button size="sm" colorScheme="teal" type="submit">
              Submit
            </Button>
          </Flex>
        </Box>
      </form>
    ) : (
      <>
        <Flex alignItems="center" p="0">
          <Icon as={GoPrimitiveDot} mx="2" my="3" color="teal.500" />
          <Text fontSize="lg" fontWeight="semibold">
            {title}
          </Text>
        </Flex>
        <Flex p="3">
          <Text color="gray.500" fontWeight="light">
            {description}
          </Text>
        </Flex>
      </>
    )}
  </Box>
);

export default ToDoListItem;
