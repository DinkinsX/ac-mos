<script setup lang="ts">
import TableData from '@/components/TableData.vue'
import { NConfigProvider, GlobalThemeOverrides, ruRU, dateRuRU } from 'naive-ui'

const primaryColor = '#ffffff'
const secondaryColor = '#2080f0'
const themeACMOS: GlobalThemeOverrides = {
  common: {
    primaryColor: secondaryColor,
    primaryColorHover: secondaryColor,
    tableHeaderColor: secondaryColor,
    textColorBase: primaryColor,
    textColor1: primaryColor
  },
  DataTable: {
    thIconColorActive: primaryColor,
    thIconColor: primaryColor
  }
}
</script>

<template>
  <n-config-provider :locale="ruRU" :date-locale="dateRuRU" :theme-overrides="themeACMOS">
    <main>
      <TableData />
    </main>
  </n-config-provider>
</template>
