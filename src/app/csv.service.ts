import { Injectable } from '@angular/core';
import * as download from 'downloadjs';

@Injectable({
  providedIn: 'root'
})
export class CSVService {

  constructor() { }

  convertSpecialChars(str: string): string {
    const specialChars: any = {
        'ě': 'e',
        'š': 's',
        'č': 'c',
        'ř': 'r',
        'ž': 'z',
        'ý': 'y',
        'á': 'a',
        'í': 'i',
        'é': 'e',
        'ť': 't',
        'ň': 'n',
        'ú': 'u',
        'ů': 'u',
        'ó': 'o',
        'Š': 'S',
        'Č': 'C',
        'Ř': 'R',
        'Ž': 'Z',
        'Ý': 'Y',
        'Á': 'A',
        'Í': 'I',
        'É': 'E',
        'Ť': 'T',
        'Ň': 'N',
        'Ú': 'U',
        'Ó': 'O',
    };
    return str.replace(/[ěščřžýáíéťňúůóŠČŘŽÝÁÍÉŤŇÚÓ]/g, function (m) {
        return specialChars[m];
    });
  }

  convertToCSV(arr: any) {
    return arr.map((obj: any) => {
      return Object.keys(obj).map(key => {
        if (Array.isArray(obj[key])) {
          return obj[key].map((item: any) => {
            return Object.keys(item).map(key => {
              return this.convertSpecialChars(`${key}:${item[key]}`);
            }).join(',');
          }).join(';');
        }
        return this.convertSpecialChars(`${key}:${obj[key]}`);
      }).join(',');
    }).join('\n');
  }

  saveCSV(data: any, prefix?: string) {
    download(this.convertToCSV(data), `${prefix}Export ${new Date().toISOString()}.csv`, "text/plain");
  }
}
