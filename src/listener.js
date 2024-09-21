class Listener {
    constructor (notesService, mailSender) {

        this._notesSevice = notesService;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }

    async listen(message) {

        try {
            const { userId, targetEmail } = JSON.parse(message.content.toString());

            const notes = await this._notesSevice.getNotes(userId);
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(notes));

            // Fungsi sendEmail hanya menerima content dalam bentuk string, itulah alasan mengapa kita menggunakan JSON.stringify pada pengiriman notes.

            console.log(result);

        }   catch (error) {
            console.error(error);
        };
    };
};

module.exports = Listener;