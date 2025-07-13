export default {
    plugins: {
        'postcss-nested': {},
        // optional but recommended:
        // 'postcss-preset-env': {
        //   stage: 3,
        //   features: { 'nesting-rules': false } // because we use postcss-nested
        // }
    },
}