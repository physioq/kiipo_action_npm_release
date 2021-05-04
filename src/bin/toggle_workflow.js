#!/usr/bin/env node
require('@babel/register')
const {main} = require('../index.js')

/* eslint-disable no-console */
main().catch((err) => { 
  console.error(err)
  process.exit(1)
})
/* eslint-enable no-console */

