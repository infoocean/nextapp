import react from 'react';
import PDFService from '../invoicepdf';
export default function MyApp() {
    const Receipt_title = "SALES ORDER";
    //generate pdf
    const handlDownloadpdf = async (item: any,Receipt_title: string) => {
      PDFService.generateSimplePDF(item, Receipt_title);
    };
    const item = {
      id:1
    }
  return (
    <>
      <button className="btn btn-danger mb-3" onClick={ ()=>{ handlDownloadpdf(item, Receipt_title)}}>PDF </button>
    </>
  )
}