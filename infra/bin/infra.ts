#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack';

// Load environment variables from files
const dotenv = require('dotenv');
dotenv.config({path: '.env.production.local'});
dotenv.config({path: '.env.local'});

const app = new App();
new InfraStack(app, 'PortfolioInfraStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});

