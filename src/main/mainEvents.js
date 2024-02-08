import DB from './db';

const electron = require('electron');
const os = require('os');
const fs = require('fs');
const path = require('path');

// const _ = require('lodash');
const https = require('https');
const store = new DB();

// store.asyncGetAll('users')
const { ipcMain, dialog } = electron;

store
  .updateOne('syncedDocuments', { id: 1705069057729 }, { _id: 3323 })
  .then((d) => {
    console.log(d, '*****');
  })
  .catch((d) => {
    console.log(d, '*****');
  });
// store.deleteMany('')

// db.insertOne(
//   "syncedDocuments",
//   { name: "Sanan", age: 24 },
//   (success, data, message) => {
//     console.log(data)
//     console.log(message,'***')

//   }
// );

const mainEvents = () => {
  // db.createCollection('newDocuments', callback(success, message)=>{
  //   if (success) {
  //     console.log(message);
  //   } else {
  //     console.log("error. ", message);
  //   }
  // });
  ipcMain.on('save:word', async (event, data) => {
    try {
      const result = await store.insertOne('words', data);
      // console.log(result, 'result');
      event.reply('save:word', { data: true });
    } catch (e) {
      event.reply('save:word', { err: true });
    }
  });
  ipcMain.on('get:words', async (event, data) => {
    try {
      const result = await store.getAll('words');
      console.log(result, 'result');
      event.reply('get:words', { data: result });
    } catch (e) {
      event.reply('get:words', { err: true });
    }
  });
  ipcMain.on('update:word', async (event, data) => {
    try {
      const updated = await store.updateOne('words', { id: data?.id }, { ...data });
      // console.log(result, 'result');
      const result = await store.getAll('words');
      event.reply('get:words', { data: result });
      event.reply('update:word', { data: result });
    } catch (e) {
      event.reply('update:word', { err: true });
    }
  });
  ipcMain.on('delete:word', async (event, data) => {
    try {
      const deleted = await store.deleteOne('words', { id: data?.id });
      // console.log(result, 'result');
      const result = await store.getAll('words');
      event.reply('get:words', { data: result });
      event.reply('delete:word', { data: result });
    } catch (e) {
      event.reply('delete:word', { err: true });
    }
  });
};

export default mainEvents;
