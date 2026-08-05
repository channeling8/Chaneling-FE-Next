import type { NextConfig } from 'next'

type WebpackConfig = Parameters<NonNullable<NextConfig['webpack']>>[0]
type SvgRule = {
    test?: { test?: (value: string) => boolean }
    issuer?: unknown
    resourceQuery?: { not?: RegExp[] } | RegExp
    exclude?: RegExp
}

const nextConfig: NextConfig = {
    turbopack: {
        root: process.cwd(),
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    },
    webpack(config: WebpackConfig) {
        const fileLoaderRule = config.module.rules.find(
            (rule: unknown): rule is SvgRule =>
                typeof rule === 'object' &&
                rule !== null &&
                'test' in rule &&
                Boolean((rule as SvgRule).test?.test?.('.svg'))
        )

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/,
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule ? fileLoaderRule.issuer : /\.[jt]sx?$/,
                resourceQuery: { not: [...(fileLoaderRule?.resourceQuery?.not || []), /url/] },
                use: ['@svgr/webpack'],
            }
        )

        if (fileLoaderRule) {
            fileLoaderRule.exclude = /\.svg$/i
        }

        return config
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
        ],
    },
}

export default nextConfig
