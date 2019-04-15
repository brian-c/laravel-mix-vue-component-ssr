<template>
    <span class="counter" :data-negative="count < 0" :data-positive="count > 0">
        <button type="button" @click="count -= 1">-</button>
        <strong>{{ count }}</strong>
        <button type="button" @click="count += 1">+</button>
    </span>
</template>

<script>
    export default {
        props: {
            initialCount: {
                type: Number,
                default: 0,
            },
        },

        data() {
            return {
                count: 0,
            };
        },

        watch: {
            initialCount: {
                immediate: true,
                handler(newValue) {
                    this.count = newValue;
                },
            }
        },
    };
</script>

<style scoped>
    .counter {
        background: #8883;
    }

    .counter[data-negative] {
        background: #f003;
    }

    .counter[data-positive] {
        background: #0f03;
    }
</style>
