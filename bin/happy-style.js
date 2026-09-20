#!/usr/bin/env node

import process from 'node:process';
import {readStdin} from 'redstd';
import {convert} from './convert.js';

const {stdout} = process;
const source = await readStdin();

stdout.write(convert(source));
