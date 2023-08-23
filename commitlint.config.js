module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'github-issue-number': (parsed) => {
          const { header, body, footer } = parsed;
          const regex = /(#\d{1,6})/i;
          const isValid =
            regex.test(header) || regex.test(body) || regex.test(footer);

          if (!isValid) {
            return [
              false,
              "Message must include a GitHub issue number with a hash sign plus up to a 6-digit issue key, e.g. '#123456'",
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
    'github-issue-number': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
  },
};
