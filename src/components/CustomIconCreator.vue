<script setup lang="ts">

import { ref } from 'vue'
const creator = ref([[{ row: 1, col: 1, bool: false }], []])

for (let row = 1; row < 5; row += 1) {
    let a = [{ row: row, col: 1, bool: false }]
    for (let col = 1; col < 8; col += 1) {
        a.push({ row: row, col: col, bool: false })
    }
    creator.value.push(a)

}


/**
 * byte Heart[8] = {
0b00000,
0b01010,
0b11111,
0b11111,
0b01110,
0b00100,
0b00000,
0b00000
};
 */

</script>
<template>

    <table>
        <tbody>
            <tr v-for="col"

        </tbody>
    </table>
</template>