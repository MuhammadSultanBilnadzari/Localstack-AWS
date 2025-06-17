import { DnsValidatedCertificate } from 'aws-cdk-lib/aws-certificatemanager';
import { IHostedZone } from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';

// 💡 Hapus baris ini:
// import config from '../../../../config.json';

interface Props {
  hosted_zone: IHostedZone;
}

export class ACM extends Construct {
  readonly certificate: DnsValidatedCertificate;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    // Ganti 'config' dengan dummy
    const configDummy = {
      domain_name: 'example.com',
    };

    this.certificate = new DnsValidatedCertificate(this, 'Certificate', {
      domainName: configDummy.domain_name,
      hostedZone: props.hosted_zone,
      region: 'us-east-1',
    });
  }
}
