import ToDoList from '@/components/ToDoList';
import { Container } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Flex, Spacer } from '@chakra-ui/react';
import React, { useState } from 'react';
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
      (item) => item.isCreating === true
    ) === 'object';

  const handleOnDragStart = () => {
    if (isCreating) {
      Object.keys(items).forEach((key) => {
        if (
          typeof items[key].find((item) => item.isCreating === true) ===
          'object'
        ) {
          handleCloseForm(key)();
          return;
        }
      });
    }
  };

  const handleOnDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }
    const newObj = { ...items };
    const correspondingList = newObj[source.droppableId];
    newObj[source.droppableId] = correspondingList.filter(
      (item) => correspondingList.indexOf(item) !== source.index
    ); // Filters out element in old position

    newObj[destination.droppableId].splice(
      destination.index,
      0,
      correspondingList[source.index]
    ); // Then places it in the new position

    console.log(newObj[destination.droppableId]);

    newObj[destination.droppableId] = newObj[destination.droppableId].filter(
      (item) => item !== undefined
    );
    setItems(newObj);
  };

  const handleClickCreateItem = (listName) => () => {
    const newObj = { ...items };
    newObj[listName].unshift({
      _id: new mongoose.Types.ObjectId().toHexString(),
      title: '',
      description: '',
      isCreating: true,
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
    newObj[listName][0].isCreating = false;
    setItems(newObj);
  };

  const handleCloseForm = (listName) => () => {
    const newObj = { ...items };
    newObj[listName] = newObj[listName].slice(1);
    setItems(newObj);
  };

  return (
    <Container maxW="container.lg">
      <DragDropContext
        onDragStart={handleOnDragStart}
        onDragEnd={handleOnDragEnd}
      >
        <Flex>
          {lists.map((item, index) => {
            return (
              <>
                <ToDoList
                  key={index + '-List'}
                  listName={item}
                  items={items[item]}
                  handleClickCreateItem={handleClickCreateItem}
                  handleChangeTitle={handleChangeTitle}
                  handleChangeDescription={handleChangeDescription}
                  handleSubmitForm={handleSubmitForm}
                  handleCloseForm={handleCloseForm}
                  isCreating={isCreating}
                />
                {lists.length - 1 !== index && (
                  <Spacer key={index && '-spacer'} />
                )}
              </>
            );
          })}
        </Flex>
      </DragDropContext>
    </Container>
  );
}
