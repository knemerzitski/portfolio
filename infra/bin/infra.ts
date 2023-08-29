#!/usr/bin/env node

const dotenv = require('dotenv');
dotenv.config({path: '.env.production.local'});
dotenv.config({path: '.env.local'});

import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack';

const app = new App();
new InfraStack(app, 'PortfolioInfraStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});

