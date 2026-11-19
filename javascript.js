const pageViews = document.querySelectorAll(".page-view");
const pageLinks = document.querySelectorAll(".nav ul a[href^='#']");

function showCurrentPage() {
    const pageId = window.location.hash.slice(1) || "home";
    const activePage = document.getElementById(pageId);
    const pageToShow = Array.from(pageViews).find((page) => page === activePage)
        || document.getElementById("home");

    pageViews.forEach((page) => {
        page.classList.toggle("is-active", page === pageToShow);
    });

    document.body.classList.toggle("home-active", pageToShow.id === "home");
    document.body.classList.toggle("about-active", pageToShow.id === "about");
    document.body.classList.toggle("achievements-active", pageToShow.id === "achievements");

    pageLinks.forEach((link) => {
        if (link.hash === `#${pageToShow.id}`) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

function transitionToCurrentPage() {
    const canUseViewTransition = typeof document.startViewTransition === "function"
        && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.body.classList.toggle("view-transitions-enabled", canUseViewTransition);

    if (canUseViewTransition) {
        document.startViewTransition(showCurrentPage);
    } else {
        showCurrentPage();
    }
}

window.addEventListener("hashchange", transitionToCurrentPage);
showCurrentPage();