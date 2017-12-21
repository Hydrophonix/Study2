const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})?[-. ]?([0-9]{3})?[-. ]?([0-9]{2})?[-. ]?([0-9]{2})$/m;
const attachments = [
    {
        filename: 'logo.png',
        path: './mail-static/logo.png',
        cid: 'mail@logo.png'
    },
    {
        filename: 'happy.gif',
        path: './mail-static/happy.gif',
        cid: 'mail@happy.gif'
    },
    {
        filename: 'footer.png',
        path: './mail-static/footer.png',
        cid: 'mail@footer.png'
    }
];

module.exports = {
  phoneRegex,
  attachments
}
