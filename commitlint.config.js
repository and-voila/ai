module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'linear-issue-number': (parsed) => {
          const { header, body, footer } = parsed;
          const regex =
            /(close[sd]?|fix(es|ed)?|resolve[sd]?|complete[sd]?)?\s*AV-\d{1,7}/i;
          const isValid =
            regex.test(header) || regex.test(body) || regex.test(footer);

          if (!isValid) {
            return [
              false,
              "Message must include a Linear issue number with any of the magic words in the format 'AV-#######', 'Close AV-#######', 'Fix AV-#######', 'Resolve AV-#######', 'Complete AV-#######', or simply 'AV-#######'",
            ];
          }
          return [true, ''];
        },
      },
    },
  ],
  rules: {
    'header-max-length': [2, 'always', 72],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'revert'],
    ],
    'scope-enum': [2, 'never', ['custom-scope', '*']],
    'subject-case': [2, 'always', 'lower-case'],
    'body-max-line-length': [2, 'always', Infinity],
    'body-leading-blank': [2, 'always'],
    'linear-issue-number': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
  },
};
