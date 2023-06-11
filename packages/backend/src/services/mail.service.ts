import NodeMailer from 'nodemailer';
import { EmailProperties } from '../types';

class MailService {
  private nodeMailer: typeof NodeMailer;

  public constructor(nodeMailer: typeof NodeMailer) {
    this.nodeMailer = nodeMailer;
  }

  private generateTransporterConfig() {
    return {
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    };
  }

  private createTransporter(): NodeMailer.Transporter {
    const transporterConfig = this.generateTransporterConfig();
    return this.nodeMailer.createTransport(transporterConfig);
  }

  private generateEmailConfig({ to, link, recovery = false }: EmailProperties) {
    return {
      from: process.env.SMTP_USER,
      to,
      subject: `Activation account on ${process.env.API_URL}`,
      text: '',
      html: recovery
        ? `
            <div>
              <h1>Your new password:</h1>
              <strong>${link}</strong>
            </div>
          `
        : `
            <div>
              <h1>For activate account follow this link</h1>
              <a href="${link}">${link}</a>
            </div>
          `
    };
  }

  public async sendActivationMail({ to, link, recovery }: EmailProperties): Promise<unknown> {
    const transporter = this.createTransporter();
    const emailConfig = this.generateEmailConfig({
      to,
      link,
      recovery
    });

    const emailTransporter = await transporter.sendMail(emailConfig);
    return emailTransporter;
  }
}

export const mailService = new MailService(NodeMailer);
