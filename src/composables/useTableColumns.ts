import { h } from 'vue'
import useCalcNds from '@/composables/useCalcNds'
import { TableData } from '@/types/TableData'
import { NDatePicker, NInputNumber, NSwitch } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

export const useTableColumns = (): DataTableColumns<TableData> => [
  {
    title: 'Наименование СТЕ',
    key: 'steName',
    sorter: (row1, row2) => {
      return row1.steName > row2.steName ? -1 : 1
    },
  },
  {
    title: 'В наличие',
    key: 'isActual',
    render(row) {
      return h(NSwitch, {
        value: row.isActual,
        size: 'small',
        onUpdateValue(v) {
          row.isActual = v
          console.log(row)
        }
      })
    }
  },
  {
    title: 'Срок действия предоставленных сведений',
    key: 'priceEndDate',
    render(row) {
      return h(NDatePicker, {
        value: row.priceEndDate ? Number(row.priceEndDate) : row.priceEndDate,
        type: 'date',
        placeholder: 'Выберите дату',
        clearable: true,
        onUpdateValue(v: number | null) {
          if (v) row.priceEndDate = v.toString()
          else row.priceEndDate = null
          console.log(row)
        }
      })
    }
  },
  {
    title: 'Цена, руб. без НДС',
    key: 'priceNotNds',
    render(row) {
      return h(NInputNumber, {
        value: row.priceNotNds,
        showButton: false,
        placeholder: 'Введите значение',
        min: 10000,
        max: 999999999,
        onUpdateValue(v) {
          if (v) {
            row.priceNotNds = v
            row.priceNds = useCalcNds(row.priceNotNds, row.nds)
          }
          console.log(row)
        }
      })
    }
  },
  {
    title: 'НДС, %',
    key: 'nds',
    render(row) {
      return h(NInputNumber, {
        value: row.nds,
        showButton: false,
        placeholder: 'Введите значение',
        min: 1,
        max: 100,
        onUpdateValue(v) {
          if (v) {
            row.nds = v
            row.priceNds = useCalcNds(row.priceNotNds, row.nds)
          }
          console.log(row)
        }
      })
    }
  },
  {
    key: 'price',
    title: 'Цена, руб. с НДС',
    render(row) {
      return h('span', row.priceNds ? new Intl.NumberFormat('ru', { maximumFractionDigits: 0 }).format(row.priceNds) : '')
    }
  },
  {
    key: 'fillEndDate',
    title: 'Срок заполнения'
  }
]
