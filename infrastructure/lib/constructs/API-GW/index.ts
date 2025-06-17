import { Construct } from 'constructs';
import { RestApi, DomainName, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { ACM } from '../ACM';
import { Route53 } from '../Route53';

// 💡 Hapus baris ini:
// import config from '../../../../config.json';

interface Props {
  acm: ACM;
  route53: Route53;
  dynamoTable: Table;
}

export class ApiGateway extends Construct {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    // Dummy config
    const configDummy = {
      domain_name: 'example.com',
    };

    const api = new RestApi(this, 'API', {
      restApiName: 'MyAPI',
    });

    // Contoh domain name dengan dummy
    new DomainName(this, 'CustomDomain', {
      domainName: `api.${configDummy.domain_name}`,
      certificate: props.acm.certificate,
    });

    // Contoh endpoint Lambda (dummy handler)
    const lambdaIntegration = new LambdaIntegration({
      handler: 'index.handler',
      runtime: 'nodejs18.x',
      code: undefined!, // Ganti dengan real Lambda code
    } as any);

    api.root.addMethod('GET', lambdaIntegration);
  }
}
