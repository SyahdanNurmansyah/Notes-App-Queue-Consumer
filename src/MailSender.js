const nodemailer = require('nodemailer');

class MailSender {
    constructor () {

        this._transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,

            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    };


    // Parameter targetEmail merupakan alamat email tujuan, di mana nanti kita akan mendapatkannya dari pesan yang ada di queue. Kemudian, parameter content merupakan data notes yang didapat dari fungsi getNotes di NotesService (JSON).

    sendEmail (targetEmail, content) {

        const message = {
            from: 'Notes-App',
            to: targetEmail,
            subject: 'Ekspor Catatan',
            text: 'Terlampir hasil dari ekspor catatan',
            attachments: [
                {
                    filename: 'notes.json',
                    content,
                },
            ],
        };

        return this._transporter.sendMail(message);
    };
};

module.exports = MailSender;