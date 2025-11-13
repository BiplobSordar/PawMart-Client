
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const OrdersPDF = ({ orders }) => {
    const generatePDF = () => {
        const doc = new jsPDF("p", "pt");


        doc.setFontSize(18);
        doc.text("My Orders Report", 40, 40);


        const tableColumn = [
            "Product",
            "Buyer",
            "Quantity",
            "Price",
            "Address",
            "Phone",
            "Date",
            "Status",
            "Notes",
        ];


        const tableRows = [];

        orders.forEach((order) => {
            const rowData = [
                order.listing?.name || "N/A",
                order.buyerName || "N/A",
                order.quantity || 1,
                order.price ? `${order.price}৳` : "Free",
                order.address || "N/A",
                order.phone || "N/A",
                order.date ? new Date(order.date).toLocaleDateString("en-GB") : "N/A",
                order.status || "N/A",
                order.notes || "",
            ];
            tableRows.push(rowData);
        });


        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 60,
            theme: "striped",
            styles: { fontSize: 10 },
            headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255] },
        });


        doc.save("orders.pdf");
    };

    return (
        <div className="flex justify-end mb-6">
            <button
                onClick={generatePDF}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition"
            >
                Download Orders PDF
            </button>
        </div>
    );
};

export default OrdersPDF;
