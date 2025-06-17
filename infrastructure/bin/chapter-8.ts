#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { config } from 'dotenv';
import { Chapter8Stack } from '../lib/chapter-8-stack';
import { Chapter8PipelineStack } from '../lib/chapter-8-pipeline-stack';

// Load environment variables
config({ path: '.env.production' });

const app = new cdk.App();

// Dummy account for LocalStack
const defaultAccount = process.env.CDK_DEFAULT_ACCOUNT || '000000000000';
const defaultEnv = { region: 'us-east-1', account: defaultAccount };

// Determine CDK_MODE and deploy the appropriate stack
const mode = process.env.CDK_MODE || '';

if (['ONLY_DEV'].includes(mode)) {
  new Chapter8Stack(app, `Chapter8Stack-${process.env.NODE_ENV || ''}`, {
    env: defaultEnv,
  });
}

if (['ONLY_PROD'].includes(mode)) {
  new Chapter8Stack(app, `Chapter8Stack-${process.env.NODE_ENV || ''}`, {
    env: defaultEnv,
  });
}

if (['ONLY_PIPELINE'].includes(mode)) {
  new Chapter8PipelineStack(app, 'Chapter8PipelineStack', {
    env: defaultEnv,
  });
}
