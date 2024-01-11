<script setup lang="ts">

import { ref, computed } from 'vue'


const creator = ref([[{ row: 1, col: 1, bool: false }]])
const text = ref('')



const codeCreate = computed(() => {
    let reg = /^[a-zA-Z_]+/
    if (!text.value) {
        return ref('输入变量名')
    } else if (!reg.test(text.value)) {
        return ref('非法变量名')
    }
    let a: string = '0b'
    for (let row of creator.value) {
        for (let col of row) {
            a += String(Number(col.bool))
        }
        if (creator.value.indexOf(row) == creator.value.length - 1) { break }
        a += ',0b'
    }

    a = `byte ${text.value}[8]={${a}}`
    return ref(a)
})

for (let col = 1; col < 9; col += 1) {
    let a = [{ row: col, col: 1, bool: false }]
    for (let row = 2; row < 6; row += 1) {
        a.push({ row: col, col: row, bool: false })
    }
    creator.value[col - 1] = a

}

const clearAll = () => {
    for (let row of creator.value) {
        for (let col of row) {
            col.bool = false
        }
    }
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
    <div class="container-fluid">
        <div class="row text-center">
            <div class="col">
                <label class="form-label">变量名：</label>
                <input class="form-control mx-auto" style="width: 10%;" v-model="text">
                <button type="button" class="btn  btn-danger" @click="clearAll">清除</button>
                <table class="text-center mx-auto" id="codeCreator">

                    <tbody>
                        <tr v-for="rows in creator" :key="creator.indexOf(rows)">
                            <td v-for="col in rows" :key="10 * col.row + col.col">
                                <div class="btn-group">
                                    <input class="form-check-input  btn "
                                        :class="{ 'btn-primary': col.bool, 'btn-secondary': !col.bool }" type="checkbox"
                                        v-model="col.bool">

                                </div>
                            </td>
                        </tr>

                    </tbody>

                </table>

                <code>{{ codeCreate.value }}</code>
            </div>
        </div>
    </div>
    <br>
</template>