/**
 *
 * wyin
 * 4/28 028
 *
 */
export const Loading = {
    data() {
        return {
            loading: false
        };
    },
    methods: {
        showLoading() {
            this.loading = true;
        },
        hideLoading() {
            this.loading = false;
        }
    }
};