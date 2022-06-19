const nodemailer = require('nodemailer');
const sparkPostTransport = require('nodemailer-sparkpost-transport');
const transporter = nodemailer.createTransport(sparkPostTransport({
  sparkPostApiKey: 'b58e0c8cdc97844c06e6e7e7f57eb4fe5df73067',
  host: 'https://api.eu.sparkpost.com/api/v1'
}));
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: "vincent.darcq@hotmail.fr",
      pass: "uTLhewpTC12;"
  }
});

module.exports.sendMail = async (nom, mail, msg, response) => {
    const htmlToSend = '<div style="width: 700px">' + msg + '</div>'
  let message = {
    to: 'vincent.darcq@hotmail.fr',
    from: 'Nderrated <no_reply@eventmap.fr>',
    subject: 'Message de ' + mail,
    html: htmlToSend,
    text: 'Hello Team! <br><br>Please find attached...<br><br>Thanks,<br>XXXXX'
  };
  await transport.sendMail(message).then((res, err) => {
    if (err) { return err; }
    return response.status(200).json("mail envoyé");
  });
}