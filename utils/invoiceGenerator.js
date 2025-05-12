import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateInvoice = (order, filePath) => {
    return new Promise((resolve, reject) => {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true});
        }
        
        const doc = new PDFDocument({ size: 'A4', margin: 50 });
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        const logoPath = path.resolve('assets', 'logo.png');
        if (fs.existsSync(logoPath)) {
            doc.image(logoPath, 50, 45, { width: 100 });
        }
        
        doc.fontSize(20).text('Factura de compra', 50, 160);
        doc.fontSize(12).text(`Factura Nº: FAC-${order._id.toString().slice(-6).toUpperCase()}`);
        doc.text(`Fecha: ${new Date(order.createdAt).toLocaleDateString()}`);
        doc.text(`Orden ID: ${order._id}`);
        doc.moveDown();

        doc.fontSize(14).text('Datos del cliente: ', { underline: true });
        if (order.user) {
            doc.text(`Nombre: ${order.user.fullName}`);
            doc.text(`Email: ${order.user.email}`);
            if (order.user.phone?.number) doc.text(`Teléfono: ${order.user.phone.number}`);
        } else if (order.shipping?.guestInfo) {
            doc.text(`Nombre: ${order.shipping.guestInfo.fullName}`);
            doc.text(`Email: ${order.shipping.guestInfo.email}`);
            if (order.shipping.guestInfo.phone?.number) doc.text(`Teléfono: ${order.shipping.guestInfo.phone.number}`);
        }

        doc.fontSize(14).text('Dirección de envio: ', { underline: true });
        const delivery = order.shipping;
        if (delivery.deliveryAddress) {
            doc.text(`Dirección: ${delivery.deliveryAddress.street} ${delivery.deliveryAddress.number}`);
            if (delivery.deliveryAddress.apartment) {
                doc.text(`Departamento: ${delivery.deliveryAddress.apartment}`);
            }
            doc.text(`Ciudad: ${delivery.deliveryAddress.city}`);
            doc.text(`Provincia: ${delivery.deliveryAddress.province}`);
            doc.text(`Código postal: ${delivery.destinationPostalCode}`);
        } else if (delivery.guestInfo?.address) {
            const addr = delivery.guestInfo.address;
            doc.text(`Dirección: ${addr.street} ${addr.number}`);
            if (addr.apartment) {
                doc.text(`Departamento: ${addr.apartment}`);
            }
            doc.text(`Ciudad: ${addr.city}`);
            doc.text(`Provincia: ${addr.province}`);
            doc.text(`Código postal: ${addr.postalCode}`);
        }
        doc.moveDown();

        doc.fontSize(14).text('Productos: ', { underline: true });
        doc.moveDown(0.5);

        order.products.forEach((item, index) => {
            doc.fontSize(12).text(`${index + 1}. ${item.product.name}`);
            doc.text(`  Cantidad: ${item.quantity}`);
            if (item.size) doc.text(`   Talle: ${item.size}`);
            if (item.color) doc.text(`  Color: ${item.color}`);
            doc.text(`  Precio unitario: $${item.price.toFixed(2)}`);
            doc.moveDown(0.5);
        });

        doc.moveDown();
        doc.fontSize(12).text(`Costo de envío: $${(delivery?.shippingCost ?? 0).toFixed(2)}`);
        doc.fontSize(14).text(`Total: $${order.totalAmount.toFixed(2)}`, { align: 'right' });

        doc.end();

        stream.on('finish', () => resolve(filePath));
        stream.on('error', reject);
    });
};