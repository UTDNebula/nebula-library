import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

type LogoModule = {
  default: React.ComponentType<Record<string, unknown>>;
  [exportName: string]: React.ComponentType<Record<string, unknown>> | unknown;
};

const logoDirectory = __dirname;
const projectLogoFiles = fs
  .readdirSync(logoDirectory)
  .filter(
    (fileName) =>
      /^.+Logo\.tsx$/.test(fileName) && fileName !== 'NebulaLogo.tsx',
  )
  .sort();

const projectLogos = projectLogoFiles.map((fileName) => {
  const logoModule = require(path.join(logoDirectory, fileName)) as LogoModule;
  const combinationName = Object.keys(logoModule).find((exportName) =>
    /LogoCombination$/.test(exportName),
  );

  if (!combinationName || typeof logoModule[combinationName] !== 'function') {
    throw new Error(
      `${fileName} must export a named project logo combination component`,
    );
  }

  return {
    fileName,
    standalone: logoModule.default,
    combinationName,
    combination: logoModule[combinationName] as React.ComponentType<
      Record<string, unknown>
    >,
  };
});

describe('NebulaLogo', () => {
  const { default: NebulaLogo } = require('./NebulaLogo') as {
    default: React.ComponentType<Record<string, unknown>>;
  };

  it('renders the shared Nebula SVG contract', () => {
    const markup = renderToStaticMarkup(<NebulaLogo />);

    expect(markup).toMatch(/^<svg[^>]*>/);
    expect(markup).toContain('viewBox="0 0 501.29 381.89"');
    expect(markup).toContain('fill="#fff"');
    expect(markup.match(/<path/g)?.length).toBeGreaterThan(5);
  });

  it('forwards className, style, and fill', () => {
    const markup = renderToStaticMarkup(
      <NebulaLogo
        className="nebula-logo"
        style={{ width: 32 }}
        fill="#123456"
      />,
    );

    expect(markup).toContain('class="nebula-logo"');
    expect(markup).toContain('width:32px');
    expect(markup).toContain('fill="#123456"');
  });
});

describe('project logos', () => {
  it('automatically discovers every project logo file', () => {
    expect(projectLogoFiles.length).toBeGreaterThan(0);
  });

  describe.each(projectLogos)(
    '$fileName',
    ({ standalone, combinationName, combination }) => {
      it('renders a standalone 384-square SVG', () => {
        const markup = renderToStaticMarkup(React.createElement(standalone));

        expect(markup).toMatch(/^<svg[^>]*>/);
        expect(markup).toContain('width="384"');
        expect(markup).toContain('height="384"');
        expect(markup).toContain('viewBox="0 0 384 384"');
        expect(markup).toContain('fill="#573dff"');
        expect(markup.match(/<path/g)?.length).toBeGreaterThan(0);
      });

      it('forwards standalone props', () => {
        const markup = renderToStaticMarkup(
          React.createElement(standalone, {
            className: 'project-logo',
            style: { width: 40 },
            fill: '#654321',
          }),
        );

        expect(markup).toContain('class="project-logo"');
        expect(markup).toContain('width:40px');
        expect(markup).toContain('fill="#654321"');
      });

      it('renders a 512-square combination with both logo slots', () => {
        const markup = renderToStaticMarkup(
          React.createElement(combination, {
            slotProps: {
              nebulaLogo: { className: 'nebula-slot', fill: '#111111' },
              projectLogo: { className: 'project-slot', fill: '#222222' },
            },
          }),
        );

        expect(markup).toContain('width="512"');
        expect(markup).toContain('height="512"');
        expect(markup).toContain('viewBox="0 0 512 512"');
        expect(markup).toContain('class="nebula-slot"');
        expect(markup).toContain('fill="#111111"');
        expect(markup).toContain('class="project-slot"');
        expect(markup).toContain('fill="#222222"');
        expect(combinationName).toMatch(/LogoCombination$/);
      });

      it('applies the duotone contract', () => {
        const markup = renderToStaticMarkup(
          React.createElement(combination, { duotone: true }),
        );

        expect(markup).toContain('fill="#000"');
        expect(markup).toContain('fill="#573dff"');
        expect(markup).not.toContain('fill="currentColor"');
      });
    },
  );

  it('keeps standalone SVG contracts consistent across project logo files', () => {
    const standaloneContracts = projectLogos.map(({ standalone }) => {
      const markup = renderToStaticMarkup(React.createElement(standalone));
      return {
        size: [markup.includes('width="384"'), markup.includes('height="384"')],
        viewBox: markup.includes('viewBox="0 0 384 384"'),
        defaultFill: markup.includes('fill="#573dff"'),
      };
    });

    for (const contract of standaloneContracts) {
      expect(contract.size).toEqual([true, true]);
      expect(contract.viewBox).toBe(true);
      expect(contract.defaultFill).toBe(true);
    }
  });

  it('keeps combination SVG contracts consistent across project logo files', () => {
    const combinationContracts = projectLogos.map(({ combination }) => {
      const markup = renderToStaticMarkup(
        React.createElement(combination, { duotone: true }),
      );
      return {
        size: [markup.includes('width="512"'), markup.includes('height="512"')],
        viewBox: markup.includes('viewBox="0 0 512 512"'),
        nebulaFill: markup.includes('fill="#000"'),
        projectFill: markup.includes('fill="#573dff"'),
      };
    });

    for (const contract of combinationContracts) {
      expect(contract.size).toEqual([true, true]);
      expect(contract.viewBox).toBe(true);
      expect(contract.nebulaFill).toBe(true);
      expect(contract.projectFill).toBe(true);
    }
  });
});
