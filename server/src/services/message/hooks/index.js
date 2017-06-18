'use strict';

const globalHooks = require('../../../hooks');


exports.before = {
  all: [
    // call global hook
    globalHooks.myHook()
  ],
  find: [],
  get: [],
  create: [function (hook) {
    const name = hook.data.name;
    const text = hook.data.text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // Override the original data to be saved in DB
    if (text.trim() === '' || name.trim() === '') {
      throw new Error('empty string');
    } else if (text.length > 20) {
      throw new Error('longer than 20 characters');
    } else {
      hook.data = {
        text,
        name,
        createdAt: new Date()
      };
    }
    console.log(`You are using before create hook for the messages service`);
    console.log('before', hook.data);
    return Promise.resolve(hook);
  }],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
