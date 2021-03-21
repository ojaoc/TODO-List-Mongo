import React from 'react';
import { connectToDatabase } from '@/db';
import Item from '@/models/todoList/item';

const create = ({ dbRes }) => <p>{JSON.stringify(dbRes, null, 2)}</p>;

export async function getServerSideProps() {
  let result;

  connectToDatabase()
    .then(() => {
      const item = new Item({
        title: 'First todo',
        description: 'first todo desc.',
      });

      item
        .save()
        .then((res) => {
          result = res;
        })
        .catch((err) => {
          result = err;
        });
    })
    .catch(() => {
      result = { error: 'Connection bigoof' };
    });

  return {
    props: {
      dbRes: result,
    },
  };
}

// The solution is probably here https://stackoverflow.com/questions/62440264/mongoose-nextjs-model-is-not-defined-cannot-overwrite-model-once-compiled

export default create;
