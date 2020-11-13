# testing React hooks

- [counter-with-hooks.spec.js](counter-with-hooks.spec.js) and [counter2-with-hooks.spec.js](counter2-with-hooks.spec.js) test React components that uses hooks
- [use-counter.spec.js](use-counter.spec.js) shows how to test a React hook using `mountHook` function
- [custom-hook.mount-spec.js](custom-hook.mount-spec.js) manually creates a wrapper component around a custom hook that uses Redux provider
- [custom-hook.mount-hook-spec.js](custom-hook.mount-hook-spec.js) is skipped for now

![Hook test](images/hook.png)

Note: hooks are mounted inside a test component following the approach shown in [react-hooks-testing-library](https://github.com/testing-library/react-hooks-testing-library/blob/master/src/pure.js)
