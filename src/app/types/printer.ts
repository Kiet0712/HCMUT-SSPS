export interface PrinterHistorySettings {
    time: string,
    fileName: string,
    copies: number,
    pages: number,
    studentId: string
  }
  
export interface PrinterDialogProps {
  isOpen: boolean
  onClose: () => void
  printer: PrinterHistorySettings
}
  