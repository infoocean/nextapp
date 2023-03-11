import axios from "axios";
import { api_url } from "../pages/api/hello";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autoTable";

class PDFService {
    generateSimplePDF = async (item: any, Receipt_title:string) => {
                const doc = new jsPDF("l", "mm", "a4");
                doc.setFontSize(25);
                doc.text("Qatar International School", 30, 21);
                doc.setFontSize(12);
                doc.text("Qatar International School", 31, 27);
                doc.setFontSize(12);
                doc.text("United Nations St, West Bay, P.O. Box: 5697", 31, 32.5);
                doc.text("Doha, Qatar", 31, 37.5);
                doc.setFontSize(12);
                doc.text("Telephone: 44833456", 235, 20);
                doc.text("Website: www.qis.org", 236, 26);
                doc.text("Email:  qisfinance@qis.org", 236, 32);
                doc.setFont("courier");
                doc.setFontSize(30);
                doc.text(`${Receipt_title}`, 120, 60);
                doc.setFontSize(15);
                doc.text("Recept Number   : ", 30, 90);
                doc.text(` RTC00000000123`, 85, 90);
                doc.text("Tranaction Type : ", 30, 100);
                doc.text(" Amex", 85, 100);
                doc.text("Invoice Number  : ", 180, 90);
                doc.text(`INV-0000002634`, 235, 90);
                doc.text("Tranaction Date : ", 180, 100);
                doc.text(`02/11/1999`, 235, 100);
                doc.setFontSize(15);
                doc.text("Tranaction Amount : ", 180, 110);
                doc.text(` $2450`, 242, 110);
                const head = [["SL.No", "ITEM NAME", "AMOUNT(QAR)"]];
                doc.setFontSize(20);
                autoTable(doc, {
                  theme: "grid",
                  margin: { top: 120, left: 30 },
                  tableWidth: 250,
                  styles: { fontSize: 15 },
                  head: head,
                  body: [["1","Swimming", "$2500"],
                  ["2","Swimming and Running", "$2000"],
                  ["3","Swimming, Dancing and Singing", "$1500"]],
                  didDrawCell: (data: any) => {},
                });
                  doc.setFontSize(20);
                  doc.text("Grand Total : ", 200, 170);
                  doc.text(` $2450`, 255, 170);
                  doc.save("Document.pdf");
      };
};
export default new PDFService();