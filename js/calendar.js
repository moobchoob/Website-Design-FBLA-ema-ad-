// Simple interactive calendar with localStorage events
(function(){
  const today = new Date()
  let viewMonth = today.getMonth()
  let viewYear = today.getFullYear()

  const monthYear = document.getElementById('monthYear')
  const cal = document.getElementById('calendar')
  const eventsList = document.getElementById('events')
  const prev = document.getElementById('prev')
  const next = document.getElementById('next')
  const modal = document.getElementById('event-modal')
  const form = document.getElementById('event-form')

  prev.addEventListener('click', ()=>{ changeMonth(-1) })
  next.addEventListener('click', ()=>{ changeMonth(1) })

  function changeMonth(delta){
    viewMonth += delta
    if(viewMonth<0){ viewMonth=11; viewYear-- }
    if(viewMonth>11){ viewMonth=0; viewYear++ }
    render()
  }

  function render(){
    cal.innerHTML = ''
    const first = new Date(viewYear,viewMonth,1)
    const last = new Date(viewYear,viewMonth+1,0)
    monthYear.textContent = first.toLocaleString('default',{month:'long'}) + ' ' + viewYear

    // week day labels
    const weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    for(const d of weekdays){
      const el = document.createElement('div')
      el.className = 'day-label'
      el.style.fontWeight = '700'
      el.style.textAlign = 'center'
      el.style.padding = '6px 0'
      el.textContent = d
      cal.appendChild(el)
    }

    // fill leading blanks
    for(let i=0;i<first.getDay();i++){
      const blank = document.createElement('div')
      blank.className = 'day'
      blank.style.background = 'transparent'
      cal.appendChild(blank)
    }

    for(let d=1; d<=last.getDate(); d++){
      const dateStr = `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
      const day = document.createElement('div')
      day.className = 'day'
      if(new Date(viewYear,viewMonth,d).toDateString() === today.toDateString()) day.classList.add('today')
      day.innerHTML = `<div class="date-num">${d}</div><div class="events" data-date="${dateStr}"></div>`
      day.addEventListener('click', ()=> openModalFor(dateStr))
      cal.appendChild(day)
    }

    renderEvents()
  }

  function eventsKey(){ return 'fluence-events' }
  function loadEvents(){ try{return JSON.parse(localStorage.getItem(eventsKey())||'{}')}catch(e){return {}} }
  function saveEvents(obj){ localStorage.setItem(eventsKey(), JSON.stringify(obj)) }

  function renderEvents(){
    const evs = loadEvents()
    // fill day boxes
    document.querySelectorAll('.events').forEach(el=>{
      const date = el.dataset.date
      el.innerHTML = ''
      if(evs[date]){
        evs[date].forEach(ev=>{
          const div = document.createElement('div')
          div.textContent = ev.title
          el.appendChild(div)
        })
      }
    })

    // list all upcoming events
    eventsList.innerHTML = ''
    const all = Object.entries(evs).sort()
    if(all.length===0){ eventsList.innerHTML = '<li>No events yet</li>'; return }
    for(const [date, arr] of all){
      for(const e of arr){
        const li = document.createElement('li')
        li.innerHTML = `<strong>${escapeHtml(e.title)}</strong> — ${date} ${e.time?(' @ '+e.time):''} ${e.link?('<a href="'+escapeAttr(e.link)+'" target="_blank">(link)</a>'):''}`
        eventsList.appendChild(li)
      }
    }
  }

  function openModalFor(date){
    modal.classList.remove('hidden')
    document.getElementById('evt-date').value = date
    document.getElementById('evt-title').focus()
  }

  document.getElementById('evt-cancel').addEventListener('click', ()=>{
    modal.classList.add('hidden')
    form.reset()
  })

  form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const title = document.getElementById('evt-title').value.trim()
    const date = document.getElementById('evt-date').value
    const time = document.getElementById('evt-time').value
    const link = document.getElementById('evt-link').value
    const desc = document.getElementById('evt-desc').value
    if(!title||!date) return
    const evs = loadEvents()
    evs[date] = evs[date] || []
    evs[date].push({title,time,link,desc})
    saveEvents(evs)
    modal.classList.add('hidden')
    form.reset()
    renderEvents()
  })

  // utils
  function escapeHtml(s){return (s||'').toString().replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')}
  function escapeAttr(s){return (s||'').toString().replace(/"/g,'')}

  render()
})();
