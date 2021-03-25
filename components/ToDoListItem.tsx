import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { GoPrimitiveDot } from 'react-icons/go';

const ToDoListItem = ({ draggableProvided }) => (
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
    <Flex alignItems="center">
      <Icon as={GoPrimitiveDot} mx="2" my="3" color="teal.500" />
      <Text fontSize="lg" fontWeight="semibold">
        Title
      </Text>
    </Flex>
    <Flex alignItems="center" p="3">
      <Text color="gray.500" fontWeight="light">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo
        ornare pellentesque. Curabitur egestas, ante sed tempus consequat, nibh
        urna lobortis nisi, non aliquet erat sem ac nibh. Nunc scelerisque a
        erat sed tempor. Aenean venenatis nec mi quis gravida. Praesent eu diam
        lacinia, elementum urna non, sodales lacus. Praesent tincidunt tellus a
        enim luctus semper. Curabitur eu risus vel velit tincidunt faucibus et
        id tortor. Aliquam fringilla efficitur augue, sed iaculis felis porta
        eu. Nunc tincidunt tellus tortor, nec egestas enim rhoncus convallis.
        Nulla sit amet libero nec leo volutpat cursus.
      </Text>
    </Flex>
  </Box>
);

export default ToDoListItem;
