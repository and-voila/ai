import { WebClient } from '@slack/web-api';

const slackToken = process.env.SLACK_ACCESS_TOKEN;
const slackClient = new WebClient(slackToken);

const websiteNotificationChannelID = 'C05C5HKH0BW';

interface Message {
  name: string;
  email: string;
  company: string;
  message: string;
  phone: string;
}

async function sendToSlack(message: Message) {
  try {
    await slackClient.chat.postMessage({
      channel: websiteNotificationChannelID,
      text: '*HEY @ambreen @rebekah*',
      // eslint-disable-next-line camelcase
      link_names: true,
      blocks: [
        {
          type: 'divider',
        },
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: ':partying_face: *HEY NEW MESSAGE FROM AND_VOILA PAGE*',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'HEY <@UT2K50031> <@UT2K50GQ7>',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `* FullName: ${message.name}\n * Phone: ${message.phone}\n * Email: ${message.email}\n * Company: ${message.company}\n`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Message*:\n ${message.message}`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `\n\n\n\n${message.name} just submitted a form on rebekah-radice page. Please reach out to them.`,
          },
        },
        {
          type: 'divider',
        },
      ],
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

export async function POST(req: Request) {
  const { company, email, name, message, phone } =
    (await req.json()) as Message;

  if (!company || !email || !name || !message || !phone) {
    return new Response('Missing required fields', {
      status: 400,
    });
  }

  await sendToSlack({
    company,
    email,
    name,
    message,
    phone,
  });

  return new Response('success', {
    status: 200,
  });
}
