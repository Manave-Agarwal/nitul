// ===================================
// AGRONOVA - SMART FARMING WEBSITE
// ===================================

// 1. MOBILE NAVIGATION

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".navbar nav");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });

    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
        });
    });
}


// 2. CROP SEARCH

const cropSearch = document.querySelector(".search-bar input");
const cropCards = document.querySelectorAll(".crop-card");

if (cropSearch) {
    let noResults = document.querySelector(".no-results");

    if (!noResults) {
        noResults = document.createElement("p");
        noResults.className = "no-results";
        noResults.textContent = "No crops found. Try another name.";
        noResults.style.display = "none";

        document.querySelector(".crop-grid")?.after(noResults);
    }

    cropSearch.addEventListener("input", () => {
        const searchText = cropSearch.value.toLowerCase().trim();
        let visibleCount = 0;

        cropCards.forEach(card => {
            const matches = card.textContent.toLowerCase()
                .includes(searchText);

            card.style.display = matches ? "flex" : "none";

            if (matches) visibleCount++;
        });

        if (noResults) {
            noResults.style.display =
                visibleCount === 0 ? "block" : "none";
        }
    });
}


// 3. FERTILIZER CALCULATOR

const fertilizerCard = [...document.querySelectorAll(".tool-card")]
    .find(card =>
        card.textContent.toLowerCase().includes("fertilizer")
    );

if (fertilizerCard) {
    const fertilizerInputs = fertilizerCard.querySelectorAll("input");
    const fertilizerButton = fertilizerCard.querySelector("button");
    const fertilizerResult = fertilizerCard.querySelector(".result");

    if (fertilizerButton && fertilizerInputs.length >= 2) {
        fertilizerButton.addEventListener("click", () => {
            const area = Number(fertilizerInputs[0].value);
            const rate = Number(fertilizerInputs[1].value);

            if (
                !Number.isFinite(area) ||
                !Number.isFinite(rate) ||
                area <= 0 ||
                rate <= 0
            ) {
                fertilizerResult.textContent =
                    "Please enter valid positive numbers.";
                return;
            }

            const total = area * rate;

            fertilizerResult.innerHTML =
                `<strong>Calculated quantity: ${total.toFixed(2)} kg</strong>
                <br>Based on the area and application rate you entered.
                <br><small>Use a crop-specific soil test or local agricultural recommendation to confirm the correct rate.</small>`;
        });
    }
}


// 4. RANDOM FARMING TIPS

const farmingTips = [
    "Test your soil before applying fertilizers. Healthy soil means healthier crops.",
    "Use drip irrigation to reduce water wastage.",
    "Choose seeds suitable for your local climate.",
    "Rotate crops to help maintain soil fertility.",
    "Remove weeds regularly to reduce competition for nutrients.",
    "Check weather forecasts before irrigation or spraying.",
    "Use compost to improve soil structure and organic matter.",
    "Inspect plants regularly to identify pests early.",
    "Mulching helps conserve soil moisture.",
    "Keep proper records of planting, irrigation and harvest dates."
];

const tipCard = document.querySelector(".tip-card");
const tipText = document.querySelector(".tip-box p");
const tipButton = tipCard?.querySelector("button");

if (tipButton && tipText) {
    tipButton.addEventListener("click", () => {
        const currentTip = tipText.textContent;

        let newTip;

        do {
            newTip = farmingTips[
                Math.floor(Math.random() * farmingTips.length)
            ];
        } while (newTip === currentTip);

        tipText.textContent = newTip;
    });
}


// 5. BACK TO TOP

document.querySelectorAll('a[href="#home"]').forEach(link => {
    link.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});


// 6. FOOTER YEAR

const footerYear = document.querySelector("footer");

if (footerYear) {
    const yearText = document.createElement("small");
    yearText.textContent = `© ${new Date().getFullYear()} AgroNova. All rights reserved.`;

    if (!footerYear.querySelector(".copyright")) {
        yearText.className = "copyright";
        footerYear.appendChild(yearText);
    }
}

console.log("🌱 AgroNova Smart Farming Website Loaded!");