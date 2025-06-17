import { HostedZone, IHostedZone } from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';

// 💡 Komentari baris ini (file config tidak ada)
// import config from '../../../../config.json';

interface Props {}

export class Route53 extends Construct {
  public readonly hosted_zone: IHostedZone;

  constructor(scope: Construct, id: string, _props: Props) {
    super(scope, id);

    // 💡 Ganti config.domain_name dengan dummy value
    const configDummy = {
      domain_name: 'example.com',
    };

    this.hosted_zone = HostedZone.fromLookup(this, 'HostedZone', {
      domainName: configDummy.domain_name,
    });
  }
}
