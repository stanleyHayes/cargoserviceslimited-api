const validator = require("validator");
const Message = require("./../../../models/v1/message");

exports.createMessage = async (req, res) => {
    try {
        const {name, email, phone, subject, text} = req.body;
        if(!name || !email || !phone || !subject || !text)
            return res.status(400).json({message: 'Missing required fields'});
        if(!validator.isEmail(email)) return res.status(400).json({message: `Invalid email: ${email}`});
        if(!validator.isMobilePhone(phone)) return res.status(400).json({message: `Invalid email: ${phone}`});
        await Message.create({name, email, phone, subject, text});
        // send text message to both sender and recipient
        // send email to both sender and recipient
        res.status(201).json({message: 'Message sent successfully. We would respond very soon.'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
