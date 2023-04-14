const nodeMailer = require('nodemailer');
const dotenv = require(dotenv);
dotenv.config();

let customerName = "Goodnews";
let comicBookName = "Batman and Catwoman";
let downloadLink = "https://www.google.com";
let previewImageLink = "cid:comicImagePreview";

//The actual email body
const html2 = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Congratulations on Your Comic Book Purchase!</title>
  </head>
  <body>
    <h1>Congratulations on Your Comic Book Purchase!</h1>
    <p>Dear ${customerName},</p>
    <p>Thank you for purchasing our <strong>${comicBookName}</strong> comic book. We hope you enjoy reading it as much as we enjoyed providing it for you.</p>
    <p>Please click the following link to download your copy:</p>
    <a href="${downloadLink}">Download ${comicBookName}</a>
    <br>
    <img src="${previewImageLink}" alt="${comicBookName} Cover Page">
    <p>If you have any questions or concerns about your purchase, please don't hesitate to contact us.</p>
    <p>Thank you again for your business.</p>
    <p>Sincerely,</p>
    <p>The ComicSpace Team</p>
  </body>
</html>
`
//Test email body
const html = `
<h1>Hello World</h1>
<p>Node mailer is very useful</p>
<img src="cid:comicImagePreview" width="100%" >
`;

// const emails = ['orjimichael2340@gmail.com', 'm.mail@mail.com'];
const emailRecipient = 'orjimichael2240@gmail.com';

async function main() {
  //email account setup and login. You need to pass in your emails credentials and thus use this app to control it.
  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSWORD
    }
  });

  //This is where the actual email message is built. Things like CC, recipients, attachments and so on are configured here.
  const info = await transporter.sendMail({
    from: `ComicSpace Inc <${process.env.GMAIL_ADDRESS}>`,
    to: emailRecipient,
    subject: `${comicBookName} Download Link`,
    html: html2,

    //each attachment you create requires an Id, which you can reference in the email body later on. See example above in html1 variable
    attachments: [{
      filename: 'img1.jpg',
      path: './img1.jpg',
      cid: 'comicImagePreview'
    },
      // {
      //     filename: 'img1.png',
      //     path: './img1.png'
      // }
    ]
  });

  //Displays info about mails sent, successful and failed.
  console.log("Message send: " + info.messageId);
  console.log(info.accepted);
  console.log(info.rejected);
}

//the main function is called. A catch clause is added at the end incase it crashes.
main().catch(e => console.log(e));

