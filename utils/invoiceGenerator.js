import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateInvoice = (order, filePath) => {
    return new Promise((resolve, reject) => {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true});
        }
        
        const doc = new PDFDocument();
        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

        doc.fontSize(25).text('Factura', { align: 'center' });
        doc.moveDown();

        doc.fontSize(14).text(`Fecha: ${new Date().toLocaleDateString()}`);
        doc.text(`ID de orden: ${order._id}`);
        doc.text(`Cliente: ${order?.user?.fullName || 'Anónimo'}`);
        doc.moveDown();

        doc.text('Productos: ');
        order.products.forEach(({ product, quantity }) => {
            doc.text(`- ${product.name} x ${quantity} - $${product.price}`);
        });

        doc.moveDown();
        doc.text(`Total: $${order.total}`);

        doc.end();

        stream.on('finish', () => resolve(filePath));
        stream.on('error', reject);
    });
};