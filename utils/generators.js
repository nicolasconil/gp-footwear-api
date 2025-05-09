import PDFDocument from 'pdfkit';

export const generatePDFBuffer = (user) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        let buffers = [];
        doc.on('data', buffers.push.bind(buffers)); // captura los datos pdf generados
        doc.on('end', () => {
            const buffer = Buffer.concat(buffers); // concatena los buffers de datos pdf
            resolve(buffer);
        });
        doc.fontSize(18).text(`Datos del usuario: ${user.name}`);
        doc.fontSize(12).text(`Correo: ${user.email}`);
        doc.fontSize(12).text(`Teléfono: ${user.phone}`);
        doc.fontSize(12).text(`Dirección: ${user.address}`);

        doc.end();
    });
};

export const generateCSV = (user) => {
    const csvData = [
        ['Campo', 'Valor'],
        ['Nombre', user.name],
        ['Correo', user.email],
        ['Teléfono', user.phone],
        ['Dirección', user.address]
    ];
    return csvData.map(row => row.join(',')).join('\n'); // convierte los datos en formato CSV
};

export const generateJSON = (user) => {
    return JSON.stringify(user, null, 2); // convierte los datos del usuario en JSON
};