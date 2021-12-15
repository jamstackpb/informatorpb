module.exports = {
    mode: 'jit',
    darkMode: false, // or 'media' or 'class'
    purge: ['./src/**/*.{ts,tsx}', './ssg/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'pb': '#012404'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};