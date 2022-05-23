module.exports = {
    content: ['./src/**/*.tsx'],
    plugins: [require('@tailwindcss/typography')],
    theme: {
        extend: {
            height: {
                '80vh': '80vh',
            },
        },
    },
};
