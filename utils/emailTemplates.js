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

export const orderConfirmationEmailTemplate = (name, orderId, total, shippingCost) => {
    return {
      subject: `Tu pedido ${orderId} ha sido recibido`,
      text: `¡Hola ${name}! Gracias por tu compra. Tu total es $${total}. El costo del envío es $${shippingCost}. Adjuntamos la factura.`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
        <h2> Gracias por tu compra, ${name}! </h2>
        <p> Recibimos tu pedido <strong> #${orderId} </strong>. </p>
        <p> Importe total: <strong> $${total} </strong> </p>
        <p> Costo de envío: <strong> $${shippingCost  } </strong> </p>
        <p> Adjuntamos la factura en PDF para tu registro. </p>
        <p> ¡Te avisaremos cuando tu pedido esté en camino! </p>
        </div>
      `
    };
  };

export const sendShippingNotificationEmailTemplate = (name, orderId, trackingNumber, carrier) => {
  return {
    subject: `Tu pedido ${orderId} fue enviado 🚚`,
    text: `¡Hola ${name}! Tu pedido ya fue despachado.\n\nTransportista: ${carrier || 'No disponible'}\nNúmero de seguimiento: ${trackingNumber || 'No disponible'}.`,
    html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2> ¡Hola ${name}! </h2>
            <p> Queríamos contarte que tu pedido <strong>#${orderId}</strong> ya fue despachado. </p>
            <p> Transportista: <strong>${carrier || 'No disponible'}</strong> </p>
            <p> Número de seguimiento: <strong>${trackingNumber || 'No disponible'}</strong> </p>
            <p style="text-align: center; margin-top: 20px;">
                <a href="https://www.correoargentino.com.ar/formularios/ondnc" 
                    style="background-color: #4CAF50;
                           color: #fff;
                           padding: 12px 20px;
                           text-decoration: none;
                           border-radius: 5px;
                           display: inline-block;">
                    Seguir mi envío
                </a>
            </p>
            <p> ¡Gracias por elegir GP Footwear! </p>
        </div>
      `
    };
};