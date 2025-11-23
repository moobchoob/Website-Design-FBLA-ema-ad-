// Lightweight site interactions
document.addEventListener('click', (e) => {
  // close modals when clicking background
  if (e.target.matches('.modal')) {
    e.target.classList.add('hidden')
  }
})

// Lessons: add local lesson card
(function(){
  const form = document.getElementById('add-lesson-form')
  const grid = document.getElementById('lessons-grid')
  if (!form || !grid) return

  form.addEventListener('submit', (ev)=>{
    ev.preventDefault()
    const title = document.getElementById('lesson-title').value.trim()
    const link = document.getElementById('lesson-link').value.trim()
    const desc = document.getElementById('lesson-desc').value.trim()
    if(!title) return
    const card = document.createElement('article')
    card.className = 'lesson-card'
    card.innerHTML = `<div class="lesson-image">Img</div><div class="lesson-body"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(desc)}</p><div class="lesson-links"><a class="btn small" href="${escapeAttr(link)||'#'}">Resource</a></div></div>`
    grid.prepend(card)
    form.reset()
  })

  function escapeHtml(s){return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')}
  function escapeAttr(s){if(!s) return '' ; return s.replace(/"/g,'')}
})()
