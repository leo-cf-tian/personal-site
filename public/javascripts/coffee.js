// References to coffee elements to animate
const coffee = document.getElementById("coffee-with-person");
const coffeePrompt = document.getElementById("coffee-chat-prompt");
const coffeeBg = document.getElementById("coffee-bg");
const coffeeBgContainer = document.getElementById("coffee-bg-container");

// Animate graphics to show contact form
function contactFormShow() {
    // References to coffee elements to animate
    coffee.style.animation = "coffee-away 1s cubic-bezier(.84,.2,.8,.54) forwards";
    coffeePrompt.style.animation = "coffee-prompt-fade 1s ease-in-out forwards";
    coffeeBg.style.animation = "coffee-bg-in 3s cubic-bezier(.53,.8,.41,.99) forwards";

    // Change display of animated elements
    setTimeout(() => {
        coffee.style.display = "none";
        coffeePrompt.style.display = "none";
        coffeeBg.style.display = "flex";
        coffeeBgContainer.style.display = "flex";
    }, 2000)
}

// reference to contact form for FormData
const contactForm = document.getElementById('contact-form');

function submitContactForm(e) {
    e.preventDefault();

    fetch("/about-me/contact", {
        method: "POST",
        mode: 'same-origin',
        body: new FormData(contactForm)
    })
    .then(data => {
        if (data.ok) {
            contactForm.outerHTML = `
            <div class="form-confirmation">
                <h2>
                    Email Successfully Sent!
                </h2>
                <p>
                    I usually reply in 3-4 business days
                </p>
            </div>
            `
        }
    })
}