declare module 'vite-plugin-prerender' {
    import { Plugin } from 'vite'
    interface PrerenderOptions {
        routes: string[]
    }
    export default function prerender(options: PrerenderOptions): Plugin
}
