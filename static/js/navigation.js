// From ChatGPT to add navigation animation logic

document.addEventListener("DOMContentLoaded", function () {
    const page = document.getElementById("page-content");

    // Animate the new page in, based on the previous navigation direction
    const direction = sessionStorage.getItem("pageDirection");
    sessionStorage.removeItem("pageDirection");

    if (page && direction === "next") {
        page.classList.add("fly-in-from-right");
    } else if (page && direction === "back") {
        page.classList.add("fly-in-from-left");
    }

    // Set up every Next and Back button on the page
    const navigationButtons = document.querySelectorAll("[data-next], [data-back]");

    navigationButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            if (!page || button.disabled) return;

            // Determine the destination and direction
            const isNext = button.hasAttribute("data-next");
            const destination = isNext
                ? button.dataset.next
                : button.dataset.back;

            // Prevent repeated clicks during the animation
            navigationButtons.forEach(function (btn) {
                btn.disabled = true;
            });

            // Remember the direction for the next page
            sessionStorage.setItem(
                "pageDirection",
                isNext ? "next" : "back"
            );

            // Fly the entire page out in the appropriate direction
            page.classList.remove("fly-in-from-right", "fly-in-from-left");
            page.classList.add(
                isNext ? "fly-out-to-left" : "fly-out-to-right"
            );

            // Navigate once the animation finishes
            page.addEventListener("animationend", function (event) {
                if (event.target !== page) return;
                window.location.href = destination;
            }, { once: true });
        });
    });
});