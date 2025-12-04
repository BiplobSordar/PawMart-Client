import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import pawLogo from "/pet.png";

const OrdersPDF = ({ orders }) => {
  const generatePDF = () => {
    const doc = new jsPDF("p", "pt");

   
    const imgWidth = 50;
    const imgHeight = 50;
    doc.addImage(pawLogo, "PNG", 40, 20, imgWidth, imgHeight);

   
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text("PawMart - Orders Report", 110, 40);

   
    doc.setFontSize(12);
    doc.setTextColor(100);
    const today = new Date().toLocaleDateString("en-GB");
    doc.text(`Generated on: ${today}`, 110, 60);

    
    const tableColumn = [
      "Product",
      "Seller",
      "Quantity",
      "Price",
      "Address",
      "Phone",
      "Date",
      "Status",
    ];

   
    const tableRows = orders.map((order) => [
      order.listing?.name || "N/A",
      order.sellerName ||  "N/A",
      order.quantity || 1,
      order.price ? `${order.price}৳` : "Free",
      order.address || "N/A",
      order.phone || "N/A",
      order.date ? new Date(order.date).toLocaleDateString("en-GB") : "N/A",
      order.status || "N/A",
    ]);

    
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 80,
      theme: "striped",
      headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255], fontStyle: "bold" },
      styles: { fontSize: 10, cellPadding: 5 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });


    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      "PawMart - www.pawmart.com | Connecting pets and products for adoption and sale.",
      40,
      pageHeight - 30
    );

    
    doc.save("PawMart_Orders_Report.pdf");
  };

  return (
    <div className="flex justify-end mb-6">
      <button
        onClick={generatePDF}
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition font-semibold"
      >
        Download Orders PDF
      </button>
    </div>
  );
};

export default OrdersPDF;
