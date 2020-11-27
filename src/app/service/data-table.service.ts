import { Injectable } from '@angular/core';
declare var $;

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  constructor() { }

  dataTable(tableId,colunm, data, colunmDefs){
    if ($.fn.DataTable.isDataTable($(tableId))) {
      //This line clears the previous datatable for every show entries and pagination changes
     $(tableId).DataTable().clear().destroy();
    }
    return $(tableId).DataTable({
      retrieve: true,
      data: data, // This is the billData provided to show in data Table
      columns:colunm , // This is list of column names provided to display in data Table
      "deferRender": true,
      /* 2nd sub-array defines the values to be displayed in select(entries) to the user
      1st sub-array defines the no.of records to show as per user selection based on 2nd sub-array values */
      "lengthMenu": [[10, 50, -1], [10, 50, "All"]],
      "pageLength": 10, // This is the no of default rows/entries shown in datatable
      "pagingType": "full_numbers", // This shows pagination list
      // These are pagination style settings of datatable
      "oLanguage": {
          "oPaginate": {
              "sPrevious": "<<  Previous",
              "sNext": "Next >>",
              "sFirst": "First",
              "sLast": "Last"
          }
      },
      columnDefs:colunmDefs
    })
  }
}
