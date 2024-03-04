import PDFDocument from 'pdfkit';
import handlebars from 'handlebars';

export function generateInvoicePDF(purchaseData) {
  const doc = new PDFDocument();

  // Use Handlebars to create a dynamic template
  const template = handlebars.compile(getDefaultTemplate());
  const content = template(purchaseData);

  // Customize the PDF content based on the template
  doc.text(content);

  // Return the PDF as a buffer
  return new Promise((resolve) => {
    const buffers = [];
    doc.on('data', (buffer) => buffers.push(buffer));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.end();
  });
}

function getDefaultTemplate() {
  // Define a default template using Handlebars syntax
  return `
    Invoice for Course Purchase

    Course Details:
    Title: {{ title }}
    Category: {{ category.join(', ') }}
    Description: {{ description }}
    Duration: {{ duration }}
    Price: {{ price }}
    Instructor: {{ instructorId }}
    What You Will Learn: {{ whatYouWillLearn.join(', ') }}

    Purchase Details:
    Purchase Date: {{ purchaseDate }}
    Invoice ID: {{ invoiceId }}

    Thank you for purchasing our course!
  `;
}
