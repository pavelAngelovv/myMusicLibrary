
import { deleteById, getByid } from "../api/data.js";
import { donate } from "../api/likes.js";
import { html, nothing } from "../lib.js";



const detailsTemplate = (album, isOwner, onDelete, onLike) => html`
<section id="details">
    <div id="details-wrapper">
      <p id="details-title">Album Details</p>
      <div id="img-wrapper">
        <img src="${album.imageUrl}" alt="example1" />
      </div>
      <div id="info-wrapper">
        <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
        <p>
          <strong>Album name:</strong><span id="details-album">${album.album}</span>
        </p>
        <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
        <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
        <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
      </div>
      

      <!--Edit and Delete are only for creator-->
      <div id="action-buttons">
      <div id="likes">Likes: <span id="likes-count">0</span></div>
        
        ${isOwner ? html`<a href="/edit/${album._id}" id="edit-btn">Edit</a>
        <a @click = ${onDelete} href="javascript:void(0)"  id="delete-btn">Delete</a>` : html`<a href="javascript:void(0)" id="like-btn">Like</a>` }
      </div>
    </div>
  </section>`



export async function showDetails(ctx) {
    const id = ctx.params.id
    const album = await getByid(id)
    let isOwner = false
    let userId = null
    if (ctx.user) {
        userId = ctx.user._id
         isOwner = Boolean(userId == album._ownerId)
    
    ctx.render(detailsTemplate(album, isOwner, onDelete, onLike))
    }
    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this album?')
        if (choice) {
            await deleteById(id)
            ctx.page.redirect('/catalog')
        }
    }

    async function onLike() {
      document.getElementById('like-btn').remove()
      await donate(id)
    }
}

