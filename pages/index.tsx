import ToDoList from '@/components/ToDoList';
import { Container } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Flex, Spacer } from '@chakra-ui/react';
import React, { useState, Fragment } from 'react';
import mongoose from 'mongoose';

export default function Home() {
  const lists = ['To Do', 'In Progress', 'Done'];
  const [items, setItems] = useState({
    'To Do': [],
    'In Progress': [],
    Done: [],
  });
  const isCreating =
    typeof [...items['To Do'], ...items['In Progress'], ...items['Done']].find(
      (item) => item.creating === true
    ) === 'object';

  const handleOnDragEnd = ({ source, destination, draggableId }) => {
    if (!destination) {
      return;
    }

    const newObj = { ...items };
    const correspondingList = newObj[source.droppableId];

    newObj[source.droppableId] = correspondingList.filter(
      (item) => item._id !== draggableId
    ); // Filters out element in old position

    newObj[destination.droppableId].splice(
      destination.index,
      0,
      correspondingList.find((item) => item._id === draggableId)
    ); // Then places it in the new position

    setItems(newObj);
  };

  const handleClickCreateItem = (listName) => () => {
    const newObj = { ...items };
    newObj[listName].unshift({
      _id: new mongoose.Types.ObjectId().toHexString(),
      title: '',
      description: '',
      creating: true,
    });
    setItems(newObj);
  };

  const handleChangeTitle = (listName) => (e) => {
    const newObj = { ...items };
    newObj[listName][0].title = e.target.value;
    setItems(newObj);
  };

  const handleChangeDescription = (listName) => (e) => {
    const newObj = { ...items };
    const firstItem = (newObj[listName][0].description = e.target.value);
    setItems(newObj);
  };

  const handleSubmitForm = (listName) => (e) => {
    e.preventDefault();
    const newObj = { ...items };
    newObj[listName][0].creating = false;
    setItems(newObj);
  };

  const handleCloseForm = (listName) => () => {
    const newObj = { ...items };
    newObj[listName] = newObj[listName].slice(1);
    setItems(newObj);
  };

  return (
    <Container maxW="container.lg">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Flex>
          {lists.map((item, index) => {
            return (
              <Fragment key={index}>
                <ToDoList
                  listName={item}
                  items={items[item]}
                  handleClickCreateItem={handleClickCreateItem}
                  handleChangeTitle={handleChangeTitle}
                  handleChangeDescription={handleChangeDescription}
                  handleSubmitForm={handleSubmitForm}
                  handleCloseForm={handleCloseForm}
                  isCreating={isCreating}
                />
                {lists.length - 1 !== index && <Spacer />}
              </Fragment>
            );
          })}
        </Flex>
      </DragDropContext>
    </Container>
  );
}
