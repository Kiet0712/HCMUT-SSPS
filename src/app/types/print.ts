export interface PrintSettings {
  pageRange: 'all' | 'select'
  startPage: number
  endPage: number
  copies: number
  grayscale: boolean
  doubleSided: boolean
  layout: string
  pageSize: string
}

export interface PrintDialogProps {
  isOpen: boolean
  onClose: () => void
  file: File & { id: string }
}
