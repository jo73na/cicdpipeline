var nodemailer = require('nodemailer');
var transport = nodemailer.createTransport({
    host: "smtp.zeptomail.in",
    port: 587,
    auth: {
    user: "emailapikey",
    pass: "PHtE6r0PFO7j2TUroRUC5v64QMatN458+b9iK1MWuI0XDfJQTE1T+N9/kzK2r0h5UvAUEPSfzo1ps+ycsbiEcD3tNmdEDmqyqK3sx/VYSPOZsbq6x00btlocd0TdVo/me9dt1CHVs9/ZNA=="
    }
});

var mailOptions = {
    from: '"Example Team" <no-reply@hrumbles.ai>',
    to: 'kamesh.t@technoladders.com',
    subject: 'Test Email',
    html: 'Test email sent successfully.',
};

transport.sendMail(mailOptions, (error, info) => {
    if (error) {
    return console.log(error);
    }
    console.log('Successfully sent');
});