import { jsPDF } from 'jspdf';
import { utils, write } from 'xlsx';

class ExportService {
  exportToCSV(data: any[], filename: string) {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    write(wb, `${filename}.csv`);
  }

  exportToJSON(data: any, filename: string) {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  exportToPDF(data: any, filename: string) {
    const doc = new jsPDF();
    doc.text(JSON.stringify(data, null, 2), 10, 10);
    doc.save(`${filename}.pdf`);
  }
}

export default ExportService;