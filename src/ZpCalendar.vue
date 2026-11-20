<script setup lang="ts">
import { computed } from 'vue'
import { parseDate, getLocalTimeZone, today } from '@internationalized/date'
import { CalendarRoot, CalendarHeader, CalendarHeading, CalendarPrev, CalendarNext, CalendarGrid,
  CalendarGridHead, CalendarGridBody, CalendarGridRow, CalendarHeadCell, CalendarCell, CalendarCellTrigger } from 'reka-ui'
const props = withDefaults(defineProps<{ label?: string; min?: string; max?: string; disabled?: boolean }>(), { label: '选择日期' })
const selected = defineModel<string>()
function readDate(value?: string) {
  if (!value) return undefined
  try { return parseDate(value) } catch { return undefined }
}
const day = computed(() => readDate(selected.value))
const first = computed(() => readDate(props.min))
const last = computed(() => readDate(props.max))
const initialMonth = computed(() => {
  const date = day.value ?? today(getLocalTimeZone())
  if (first.value && date.compare(first.value) < 0) return first.value
  if (last.value && date.compare(last.value) > 0) return last.value
  return date
})
</script>

<template>
  <CalendarRoot v-slot="{ grid, weekDays }" class="zp-calendar" locale="zh-CN" :week-starts-on="1"
    fixed-weeks prevent-deselect :calendar-label="label"
    :model-value="day ?? null" :min-value="first" :max-value="last" :disabled="disabled" :default-placeholder="initialMonth"
    @update:model-value="selected = $event?.toString()">
    <CalendarHeader class="zp-cal-header">
      <CalendarPrev aria-label="上个月">‹</CalendarPrev><CalendarHeading /><CalendarNext aria-label="下个月">›</CalendarNext>
    </CalendarHeader>
    <CalendarGrid v-for="month in grid" :key="month.value.toString()">
      <CalendarGridHead><CalendarGridRow>
        <CalendarHeadCell v-for="weekday in weekDays" :key="weekday">{{ weekday }}</CalendarHeadCell>
      </CalendarGridRow></CalendarGridHead>
      <CalendarGridBody><CalendarGridRow v-for="week in month.rows" :key="week[0].toString()">
        <CalendarCell v-for="date in week" :key="date.toString()" :date="date">
          <CalendarCellTrigger :day="date" :month="month.value" />
        </CalendarCell>
      </CalendarGridRow></CalendarGridBody>
    </CalendarGrid>
  </CalendarRoot>
</template>
