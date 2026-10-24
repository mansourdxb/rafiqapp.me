// Print only the element with class "print-area" (monthly timetable, imsakiya).
export const PRINT_CSS = `@media print{
body *{visibility:hidden!important}
.print-area,.print-area *{visibility:visible!important}
.print-area{position:absolute;inset:0 0 auto 0;margin:0;box-shadow:none!important;border:0!important}
.print-area .no-print{display:none!important}
.print-area .print-only{display:block!important}
.print-area .overflow-x-auto{overflow:visible!important}
@page{margin:12mm}
}`;
