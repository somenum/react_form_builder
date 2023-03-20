module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    extends: ["react-app", "react-app/jest"],
    rules: {
        "import/prefer-default-export": "off",
        "react/function-component-definition": [
            2,
            {
                namedComponents: "arrow-function",
                unnamedComponents: "arrow-function",
            },
        ],
        "react/prop-types": 0,
        "no-param-reassign": 0,
        "react/jsx-props-no-spreading": "off",
        "no-unused-vars": [
            "error",
            { vars: "all", args: "after-used", ignoreRestSiblings: false },
        ],
    },
};
