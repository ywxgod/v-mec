/**
 *
 * wyin
 * 4/28 028
 *
 */
import {DomUtil} from "../utils/DomUtil";

export const ResizeHandler = {
    data() {
        return {
            dynamicHeight: 100,
            dynamicGap: 10
        };
    },
    methods: {
        onWindowResize() {
            const container = this.getContainer();
            if (!container) { return; }
            const { top } = DomUtil.offset(container);
            const { innerHeight } = window;
            this.dynamicHeight = innerHeight - top - this.dynamicGap;
        },
        getContainer() {
            return '';
        }
    },
    mounted() {
        if(!window) return;
        window.addEventListener('resize', this.onWindowResize);
        this.$nextTick(() => {
            this.onWindowResize();
        });
    },
    beforeDestroyed() {
        if(!window) return;
        window.removeEventListener('resize', this.onWindowResize);
    }
};