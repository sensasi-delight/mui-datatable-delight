import type { Config } from 'jest'
import type { TsJestTransformerOptions } from 'ts-jest'

export default {
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!**/vendor/**'
    ],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    transform: {
        '.(ts|tsx)': [
            'ts-jest',
            {
                /**
                 * @todo REMOVE THIS OPTION WHEN ALL FILES ARE TYPES SAFE
                 */
                diagnostics: false
            } satisfies TsJestTransformerOptions
        ]
    },
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/coverage',
        'package.json',
        'package-lock.json',
        'reportWebVitals.ts',
        'setupTests.ts',
        'index.tsx'
    ]
} satisfies Config
