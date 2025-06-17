import * as dotenv from 'dotenv';

// 💡 Hapus baris ini:
// import config from '../../config.json';

// 💡 Ganti config.* dengan dummy
const webConfigJSON = {
  domainName: 'example.com',
  backendSubdomain: 'backend',
  frontendSubdomain: 'frontend',
  backendDevSubdomain: 'dev-backend',
  frontendDevSubdomain: 'dev-frontend',
};

export const pipelineConfig = (env: string) => {
  if (env === 'Production') {
    const { parsed } = dotenv.config({ path: '.env.production' });

    return {
      buildCommand: 'yarn build:prod',
      deployCommand: 'yarn cdk deploy',
      branch: 'main',
      tag: 'chapter8-production-pipeline',
      githubToken: parsed?.GITHUB_TOKEN,
      workspaceId: parsed?.WORKSPACE_ID,
      channelId: parsed?.CHANNEL_ID,
      ...webConfigJSON,
    };
  }

  const { parsed } = dotenv.config({ path: '.env.development' });

  return {
    buildCommand: 'yarn build:dev',
    deployCommand: 'yarn cdk:dev deploy',
    branch: 'dev',
    tag: 'chapter8-development-pipeline',
    githubToken: parsed?.GITHUB_TOKEN,
    workspaceId: parsed?.WORKSPACE_ID,
    channelId: parsed?.CHANNEL_ID,
    ...webConfigJSON,
  };
};
