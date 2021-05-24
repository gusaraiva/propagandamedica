module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"node": true,
        "commonjs": true,
        "es6": true
	},
	"extends": ["eslint:recommended", "prettier","prettier/react"],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly",
		"jQuery": true,
        "$": true,
        "Materialize": true,
        "React": true,
        "es6": true
	},
	"parser":"babel-eslint",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true,
			"experimentalObjectRestSpread": true,
			"arrowFunctions":true,
			"modules":true,
			"spread": true
		},
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"prettier",
		"react-hooks"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		],
		"require-yield": "error",
        "no-var": "error",
        "semi": ["error", "never"],
        "max-params": ["error", 6],
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "comma-spacing": ["error", { "before": false, "after": true }],
        "camelcase": ["error", {"properties": "never"}],
        "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
        "block-spacing": "error",
        "strict": ["error", "never"],
        "require-await": "error",
        "no-self-compare": "error",
        "no-empty-function": "error",
        "eqeqeq": ["error", "always"],
        "dot-location": ["error", "property"],
        "curly": "error",
        "no-sparse-arrays": "error",
        "no-inner-declarations": "error",
        "no-func-assign": "error",
        "no-const-assign": "warn",
        "no-this-before-super": "warn",
        "no-undef": "warn",
        "no-unreachable": "warn",
        "no-unused-vars": "warn",
        "constructor-super": "warn",
		"valid-typeof": "warn",
		"no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 1 }],
		"object-curly-spacing": [2, "always"],
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn"
	}


}