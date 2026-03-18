// ============================================================
// ODTÜ Website — Main JS
// ============================================================

// ------------------------------------------------------------
// Navigation: hamburger toggle + active link
// ------------------------------------------------------------
function initNav() {
  const hamburger = document.querySelector('.nav__hamburger')
  const mobileNav = document.querySelector('.nav__mobile')

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-open')
      mobileNav.classList.toggle('is-open')
      document.body.style.overflow = mobileNav.classList.contains('is-open') ? 'hidden' : ''
    })

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-open')
        mobileNav.classList.remove('is-open')
        document.body.style.overflow = ''
      })
    })
  }

  // Mark active link
  const currentPath = window.location.pathname
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(link => {
    const href = link.getAttribute('href')
    if (href === currentPath || (currentPath.endsWith(href) && href !== '/')) {
      link.classList.add('active')
    }
    // Home page
    if ((currentPath === '/' || currentPath.endsWith('index.html')) && href === '/') {
      link.classList.add('active')
    }
  })
}

// ------------------------------------------------------------
// Scroll reveal (Intersection Observer)
// ------------------------------------------------------------
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  )

  document.querySelectorAll('.reveal, .reveal-group').forEach(el => observer.observe(el))
}

// ------------------------------------------------------------
// Count-up animation for stats
// ------------------------------------------------------------
function countUp(el, target, duration = 1800, suffix = '') {
  const isDecimal = target % 1 !== 0
  const start = performance.now()

  function step(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = eased * target

    el.textContent = isDecimal
      ? current.toFixed(2) + suffix
      : Math.floor(current).toLocaleString('tr-TR') + suffix

    if (progress < 1) requestAnimationFrame(step)
    else el.textContent = isDecimal
      ? target.toFixed(2) + suffix
      : target.toLocaleString('tr-TR') + suffix
  }

  requestAnimationFrame(step)
}

function initCountUp() {
  const statNumbers = document.querySelectorAll('[data-count]')
  if (!statNumbers.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target
          const target = parseFloat(el.dataset.count)
          const suffix = el.dataset.suffix || ''
          countUp(el, target, 1800, suffix)
          observer.unobserve(el)
        }
      })
    },
    { threshold: 0.5 }
  )

  statNumbers.forEach(el => observer.observe(el))
}

// ------------------------------------------------------------
// Init
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initNav()
  initReveal()
  initCountUp()
})
