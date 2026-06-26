import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { BaseCard } from './BaseCard';

describe('BaseCard', () => {
  it('renders children with the default card styles', () => {
    const markup = renderToStaticMarkup(
      <BaseCard>
        <div>Demo content</div>
      </BaseCard>,
    );

    expect(markup).toContain('rounded-lg');
    expect(markup).toContain('bg-white');
    expect(markup).toContain('Demo content');
  });
});
