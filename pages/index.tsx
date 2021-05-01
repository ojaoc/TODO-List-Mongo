import ToDoList from '@/components/ToDoList';
import { Container } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Flex, Spacer } from '@chakra-ui/react';
import React, { useState, Fragment } from 'react';
import mongoose from 'mongoose';
import axios from 'axios';
import connectToDatabase from '@/db';
import { ToDo, InProgress, Done } from '@/models/todoList/item';

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

  const handleOnDragEnd = async ({ source, destination, draggableId }) => {
    if (!destination) {
      return;
    }

    const newObj = { ...items };
    const correspondingList = newObj[source.droppableId];

    newObj[source.droppableId] = correspondingList.filter(
      (item) => item._id !== draggableId
    ); // Filters out element in old position

    const newOrderItem = correspondingList.find(
      (item) => item._id === draggableId
    );
    newOrderItem.order = destination.index;

    newObj[destination.droppableId].splice(destination.index, 0, newOrderItem); // Then places it in the new position

    setItems(newObj);

    await axios.put('/', {
      ...newOrderItem,
      collection: destination.droppableId,
    });
  };

  const handleClickCreateItem = (listName) => () => {
    const newObj = { ...items };
    newObj[listName].unshift({
      _id: new mongoose.Types.ObjectId().toHexString(),
      title: '',
      description: '',
      order: 0,
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
    newObj[listName][0].description = e.target.value;
    setItems(newObj);
  };

  const handleSubmitForm = (listName) => async (e) => {
    e.preventDefault();
    const newObj = { ...items };
    newObj[listName][0].creating = false;
    setItems(newObj);

    await axios.post('/', { ...newObj[listName][0], collection: listName });
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

export async function getServerSideProps({ req }) {
  await connectToDatabase();
  if (req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', async () => {
      let item;

      const obj = JSON.parse(body);
      const newDoc = {
        _id: obj._id,
        title: obj.title,
        description: obj.description,
        order: obj.order,
      };

      switch (obj.collection) {
        case 'To Do':
          item = new ToDo(newDoc);
          break;
        case 'In Progress':
          item = new InProgress(newDoc);
          break;
        case 'Done':
          item = new Done(newDoc);
          break;
      }

      await item.save();
    });
  } else if (req.method === 'PUT') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', async () => {
      let item;

      const obj = JSON.parse(body);

      switch (obj.collection) {
        case 'To Do':
          item = ToDo.findOneAndUpdate(
            { _id: `ObjectId(${obj._id})` },
            { order: obj.order }
          );
          break;
        case 'In Progress':
          item = InProgress.findOneAndUpdate(
            { _id: `ObjectId(${obj._id})` },
            { order: obj.order }
          );
          break;
        case 'Done':
          item = Done.findOneAndUpdate(
            { _id: `ObjectId(${obj._id})` },
            { order: obj.order }
          );
          break;
      }

      await item.save();
    });
  }

  return {
    props: {},
  };
}
