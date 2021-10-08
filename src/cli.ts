#!/usr/bin/env node

import { Injector } from 'plume-ts-di';
import { Logger } from 'simple-logging-system';
import Creator from './creator/Creator';
import Config from './config/Config';
import installCliModule from './cli-module';
import ServerLogger from './logger/ServerLogger';

const injector = new Injector();
installCliModule(injector);

const config = injector.getInstance(Config);
config.initialize();
ServerLogger.setupServerLogs(config.get().verbose);
const logger = new Logger('cli');
logger.debug('Configuration used:', config.get());
injector.getInstance(Creator).create();
