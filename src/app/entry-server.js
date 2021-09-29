import { createApp } from './index'

export default context => {

    return new Promise((resolve, reject) => {

        const { app, router} = createApp()
           // set server-side router's location
           router.push(context.url)
        // wait until router has resolved possible async components and hooks
        router.onReady(() => {   
            const MatchedComponents = router.getMatchedComponents()
            if (!MatchedComponents.length) {
                return reject({ code: 404 })
            }
            resolve(app)
        }, reject)
    })
}