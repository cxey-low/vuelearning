
import { ref } from 'vue'


export default {
  setup() {
    const count = ref(8)
    return {
      count
    }
  }
}
