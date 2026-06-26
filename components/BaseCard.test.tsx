import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { BaseCard } from './BaseCard';

describe('BaseCard', () => {
  test('renders children', () => {
    const { getByText } = render(<BaseCard>hello</BaseCard>);
    expect(getByText('hello')).toBeInTheDocument();
  });

  test('adds id when provided', () => {
    const { container } = render(<BaseCard id="my-card">x</BaseCard>);
    expect(container.querySelector('#my-card')).toBeInTheDocument();
  });

  test('applies variant classes', () => {
    const { container } = render(<BaseCard variant="interactive">x</BaseCard>);
    expect(container.firstChild).toHaveClass('shadow-lg');
  });

  test('does not add background class when className contains bg-', () => {
    const { container } = render(<BaseCard className="bg-red-500">x</BaseCard>);
    expect(container.firstChild).not.toHaveClass('bg-white');
  });

  test('transparent variant does not add background', () => {
    const { container } = render(<BaseCard variant="transparent">x</BaseCard>);
    expect(container.firstChild).not.toHaveClass('bg-white');
  });
});
