# Unit Tests - Lolzinho API

This document describes how to run and create unit tests for the Lolzinho API project.

## Configuration

The project uses Jest as a testing framework. The configuration is in the `jest.config.js` file.

## Running Tests

To run all unit tests:

```bash
npm test
```

To run tests with watch mode (useful during development):

```bash
npm test -- --watch
```

To run a specific test:

```bash
npm test -- -t 'test name'
```

## Test Structure

Tests follow the structure of the source code directories:

- Tests are placed in `__tests__` directories close to the files being tested
- Test files have the suffix `.test.ts` or `.spec.ts`

Example:

```
src/
  resources/
    freeWeek/
      service.ts
      __tests__/
        service.test.ts
```

## Test Coverage

Test coverage is automatically generated when running `npm test`. The report is displayed in the terminal and also generated in HTML in the `coverage/` folder.

### Best Practices

1. **Isolate tests**: Use mocks for external APIs and other services
2. **Clear naming**: Test names should describe what is being tested
3. **Test error cases**: Make sure to test failure scenarios
4. **Keep tests independent**: Each test should be independent of others
