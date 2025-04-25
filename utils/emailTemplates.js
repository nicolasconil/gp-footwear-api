/**
 * @param {String} name     Nombre de usuario
 * @param {String} url      URL de verificación
 */

export const verificationEmailTemplate = (name, url) => {
    return {
        subject: 'Verifica tu correo en GP Footwear',
        text: `¡Hola ${name}! verifica tu correo copiando y pegando este enlace en tu navegador: \n\n${url}`,
        html: `
            <div style='font-family: Arial, sans-serif; line-height:1.6; color: #333;">
            <h2> ¡Hola ${name}! </h2>
            <p> Gracias por registrarte en <strong> GP Footwear </strong>. Para completar tu registro, por favor hace click en el botón: </p>
            <p style="text-align: center;">
            <a href="${url}"
                style="background-color: #4CAF50;
                       color: #fff;
                       padding: 12px 20px;
                       text-decoration: none,
                       border-radius: 5px;
                       display: inline-block;">
                Verificar mi correo
            </a>
            </p>
            <p> Si no solicitaste este correo, podes ignorarlo. </p>                    
            </div>
        `
    };
};

/**
 * @param {String} name
 * @param {String} url
 */

export const passwordResetEmailTemplate = (name, url) => {
    return {
        subject: 'Recuperación de contraseña GP Footwear',
        text: `¡Hola ${name}! Solicitaron restablecer tu contraseña. Usa este enlace:\n\n${url}`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
            <h2> ¡Hola ${name}! </h2>
            <p> Recibimos una solicitud para restablecer tu contraseña. Hace click en el botón si fuiste vos: </p>
            <p style="text-align: center;">
            <a href="${url}"
                style="background-color: #f44336;
                       color: #fff;
                       padding: 12px 20px;
                       text-decoration: none;
                       border-radius: 5px;">
            Restablecer contraseña
          </a>
        </p>
        <p> Si no solicitaste este cambio, ignora este correo. </p>
      </div>
    `
    };
};

/**
 * @param {String} name 
 * @param {String} orderId 
 * @param {Number} total 
 */

export const orderConfirmationEmailTemplate = (name, orderId, total) => {
    return {
      subject: `Tu pedido ${orderId} ha sido recibido`,
      text: `¡Hola ${name}! Gracias por tu compra. Tu total es $${total}. Adjuntamos la factura.`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
        <h2> Gracias por tu compra, ${name}! </h2>
        <p> Recibimos tu pedido <strong> #${orderId} </strong>. </p>
        <p> Importe total: <strong> $${total} </strong> </p>
        <p> Adjuntamos la factura en PDF para tu registro. </p>
        <p> ¡Te avisaremos cuando tu pedido esté en camino! </p>
        </div>
      `
    };
  };