const express = require('express');
const router = express.Router();

const config = require('../config');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const nodeMailer = require('nodemailer');

const { phoneRegex, attachments } = require('./methods/index.js');

router.use('/', (req, res, next) => {
  req.check('name', 'Empty name field').notEmpty();
  req.check('sname', 'Empty second name field').notEmpty();
  req.check('email', 'Invalid email address').isEmail();
  req.check('phone', 'Invalid phone number').matches(phoneRegex);
  req.check('site', 'Empty site field').notEmpty();
  req.check('text', 'Empty text field').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    return res.render(
      'index',
      {
        title: 'Validation form ',
        errors: req.session.errors,
        data: req.body
      }
    );
  } else {
    req.session.errors = null
  }
  next();
});

router.post('/', (req, res) => {

    const htmlString = ejs.render(
      fs.readFileSync(path.join(__dirname, '../view/order-info.ejs')).toString(),
      req.body
    );

    const clientMailHtml = ejs.render(
      fs.readFileSync(path.join(__dirname, '../view/order-client-nodestart.ejs')).toString(),
      req.body
    );

    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: config.mailAuthN
    });

    const clientMailOptions = {
        from: `Hydrophonix <${config.email}>`, // sender address
        to: req.body.email, // receiver
        subject: 'Subject Node.js', // Subject line
        html: clientMailHtml,
        attachments: attachments
    };

    const mailOptions = {
        from: `Hydrophonix <${config.email}>`, // sender address
        to: config.email, // receiver
        subject: 'Successfull registered', // Subject line
        html: htmlString
    };

    transporter.sendMail(clientMailOptions, (error) => {
        if (error) {
            console.log(error.message);
            return res.send('Error!');
        }
        console.log('Mail 1 sent!');
    });

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error.message);
            return res.send('Error!');
        }
        console.log('Mail 2 sent!');
        res.redirect('/success');
    });

});

module.exports = router;
