<template>
  <n-data-table :class="$style.TableData" :columns="useTableColumns()" :data="data" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import useCalcNds from '@/composables/useCalcNds'
import { useTableColumns } from '@/composables/useTableColumns'

import { NDataTable } from 'naive-ui'

import { TableData } from '@/types/TableData'
import * as dataTable from '@/mock/dataTable.json'

const data = ref<TableData[]>(dataTable.data)
data.value.forEach((item) => (item.priceNds = useCalcNds(item.priceNotNds, item.nds)))
</script>

<style lang="scss" module>
.TableData {
  //
}
</style>
