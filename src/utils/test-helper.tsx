import React from 'react';
import { mount, render, shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import { theme } from '@src/theme';
import { createRootReducer } from '@src/store/reducers';

export function renderWithTheme(tree: JSX.Element, options?: any) {
  return render(tree, {
    ...options,
    context: { theme },
  });
}

export function shallowWithTheme(tree: JSX.Element, options?: any) {
  return shallow(tree, {
    ...options,
    context: { theme },
  });
}

export function mountWithTheme(tree: JSX.Element, options?: any) {
  return mount(<ThemeProvider theme={theme}>{tree}</ThemeProvider>, options);
}

export function createInitialState() {
  const rootReducer = createRootReducer({} as any);
  return rootReducer(undefined, '' as any);
}
