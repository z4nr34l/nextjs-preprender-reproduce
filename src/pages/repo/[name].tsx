import type {
    InferGetStaticPropsType,
    GetStaticProps,
    GetStaticPaths,
} from 'next'

type Repo = {
    name: string
    stargazers_count: number
}

export const getStaticPaths = (async () => {
    return {
        paths: [
            {
                params: {
                    name: 'next.js',
                },
            }, // See the "paths" section below
        ],
        fallback: true, // false or "blocking"
    }
}) satisfies GetStaticPaths

export const getStaticProps = (async (context) => {
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const repo = await res.json()
    return { props: { repo } }
}) satisfies GetStaticProps<{
    repo: Repo
}>

export default function Page({
                                 repo,
                             }: InferGetStaticPropsType<typeof getStaticProps>) {
    return repo.stargazers_count
}