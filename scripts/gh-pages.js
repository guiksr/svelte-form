const ghpages = require('gh-pages');

ghpages.publish(
    '__sapper__/export/svelte-form',
    {
        branch: 'master',
        repo: 'https://github.com/guiksr/svelte-form.git',
        user: {
            name: 'guiksr',
            email: '31513429+guiksr@users.noreply.github.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)
