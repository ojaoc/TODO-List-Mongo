import React from 'react';
import connectToDatabase from '@/db';
import Item from '@/models/todoList/item';

const Create = ({ dbRes }) => <p>{JSON.stringify(dbRes, null, 2)}</p>;

export async function getServerSideProps() {
  let dbRes = { success: 'Connected' };

  await connectToDatabase();

  //const item = new Item({
  //  title: 'First todo',
  //  description: 'first todo desc.',
  //});

  //await item.save();

  return {
    props: {
      dbRes,
    },
  };
}

export default Create;
