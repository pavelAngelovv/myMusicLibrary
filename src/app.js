
import { page, render } from './lib.js'
import { showLogin } from './views/login.js'
import { showRegister } from './views/register.js'
import { updateNav } from './views/nav.js'
import { getUserData } from './util.js'
import { showHome } from './views/home.js'
import { showCatalog } from './views/catalog.js'
import { showCreate } from './views/create.js'
import { showDetails } from './views/details.js'
import { showEdit } from './views/edit.js'


const main = document.querySelector('main')



page(decorateContext)


page('/register', showRegister)
page('/login', showLogin)
page('/', showHome)
page('/catalog', showCatalog)
page('/create', showCreate)
page('/catalog/:id', showDetails)
page('/edit/:id', showEdit)
page('/*', showHome)

updateNav()
page.start()


function decorateContext(ctx, next) {
    ctx.render = renderMain
    ctx.updateNav = updateNav
    const user = getUserData()
    if (user) {
        ctx.user = user
    }
    next()
}

function renderMain(content) {
    render(content, main)
}