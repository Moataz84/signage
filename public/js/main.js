async function logout() {
  await fetch("/api/logout", {method: "POST"})
  window.location.href = "/"
}

function getPost() {
  new Quill(".editor", {
    theme: "snow",
    modules: {
      toolbar: []
    }
  })
}

function generatePreviews() {
  const posts = document.querySelectorAll(".post-preview");
  [...posts].forEach(post => {
    const textPreview = post.querySelector(".text-preview")
    const tempElement = document.createElement("div")
    tempElement.innerHTML = textPreview.getAttribute("data-post-body")
    textPreview.textContent = `${tempElement.textContent.substring(0, 200)} ...`
    textPreview.removeAttribute("data-post-body")
  })
}

function setPostData() {
  const body = document.querySelector(".post-form").getAttribute("data-body")
  quill.container.firstChild.innerHTML = body
}

function confirmDelete(e) {
  const post = e.target
  const postId = post.getAttribute("data-post-id")
  const title = post.getAttribute("data-post-title")
  const confirmed = confirm(`Are you sure you want to delete "${title}"? This action is irreversible.`)
  if (!confirmed) return
  socket.emit("post-delete", postId)
  window.location.reload()
}

function scaleText() {
  const resizeObserver = new ResizeObserver(() => {
    const width = document.querySelector(".date-bubble").getBoundingClientRect().width
    const factor = width / 240
    document.querySelectorAll(".date-bubble *").forEach(elem => {
      const fontSize = parseInt(elem.getAttribute("data-size")) * factor
      elem.style.fontSize = `${fontSize}px`
    })
  })
  
  resizeObserver.observe(document.querySelector(".layout"))
}