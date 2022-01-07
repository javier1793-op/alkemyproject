function email(correo){

    const sgMail = require('@sendgrid/mail');
    const key = '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';
    
    sgMail.setApiKey(key);
    
    const message = {
        to:correo,
        from: 'javier17utn@gmail.com',
        subject: 'Alkemy challenge',
        text:'Registro realizado exitosamente!'
    
    }
    
    return (
    sgMail.send(message)
    .then((respose) => console.log("mensaje enviado"))
    .catch((err) => console.log(err)));
};

module.exports = {email};