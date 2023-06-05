
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import {IConsolidate} from '../services/sumary/SumaryService.model';

export const exportExcel = async (payload: {excelData: IConsolidate[], fileName: string }) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;chartset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(payload.excelData);
    const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
    const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    const data = new Blob([excelBuffer], { type : fileType });
    FileSaver.saveAs(data, payload.fileName + fileExtension);
}