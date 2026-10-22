document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      toggle.textContent = open ? "×" : "☰";
    });
  }

  // Current year in footers
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  // Home search sends the visitor to the destination catalogue
  const homeSearch = document.querySelector("#home-search");
  if (homeSearch) {
    homeSearch.addEventListener("submit", event => {
      event.preventDefault();
      const query = document.querySelector("#destination-search").value.trim();
      const category = document.querySelector("#travel-style").value;
      const params = new URLSearchParams();
      if (query) params.set("search", query);
      if (category !== "all") params.set("category", category);
      window.location.href = "destinations.html" + (params.toString() ? "?" + params.toString() : "");
    });
  }

  // Destination filtering
  const list = document.querySelector("#destination-list");
  if (list) {
    const search = document.querySelector("#destination-filter");
    const category = document.querySelector("#category-filter");
    const cards = [...list.querySelectorAll(".place-card")];
    const params = new URLSearchParams(window.location.search);
    search.value = params.get("search") || "";
    category.value = params.get("category") || "all";
    const filter = () => {
      const term = search.value.toLowerCase().trim();
      const chosen = category.value;
      let visible = 0;
      cards.forEach(card => {
        const nameMatches = card.dataset.name.includes(term) || card.querySelector("h3").textContent.toLowerCase().includes(term);
        const categoryMatches = chosen === "all" || card.dataset.category.split(" ").includes(chosen);
        const show = nameMatches && categoryMatches;
        card.hidden = !show;
        if (show) visible++;
      });
      const count = document.querySelector("#destination-count");
      const empty = document.querySelector("#no-destinations");
      count.textContent = `${visible} ${visible === 1 ? "destination" : "destinations"} to explore`;
      empty.hidden = visible !== 0;
    };
    search.addEventListener("input", filter);
    category.addEventListener("change", filter);
    filter();
  }

  // Fill the planning form from links on other pages
  const tripForm = document.querySelector("#trip-form");
  if (tripForm) {
    const params = new URLSearchParams(window.location.search);
    const destination = params.get("destination");
    const tour = params.get("tour");
    if (destination) document.querySelector("#trip-destination").value = destination;
    if (tour) document.querySelector('[name="notes"]').value = `Interested in the "${tour}" sample tour.`;
    const departure = document.querySelector("#departure-date");
    const returned = document.querySelector("#return-date");
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    departure.min = localDate;
    returned.min = localDate;
    departure.addEventListener("change", () => { returned.min = departure.value || localDate; });
    tripForm.addEventListener("submit", event => {
      event.preventDefault();
      if (departure.value && returned.value && returned.value < departure.value) {
        returned.setCustomValidity("Return date must be on or after the departure date.");
        returned.reportValidity();
        return;
      }
      returned.setCustomValidity("");
      const data = new FormData(tripForm);
      const styles = data.getAll("style");
      const summary = [
        "YOUR EXPLOREWORLD TRIP BRIEF",
        `Destination: ${data.get("destination")}`,
        `Departure: ${data.get("departure") || "Not decided"}`,
        `Return: ${data.get("return") || "Not decided"}`,
        `Travellers: ${data.get("travellers")}`,
        `Budget: ${data.get("budget")}`,
        `Interests: ${styles.length ? styles.join(", ") : "Not selected"}`,
        `Notes: ${data.get("notes") || "None"}`
      ].join("\\n");
      const result = document.querySelector("#trip-result");
      result.textContent = summary + "\\n\\nThis is a local demo summary. No booking was made and no data was sent.";
      result.hidden = false;
    });
  }

  // Demo-only enquiry forms: explain clearly that no network request is made
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(contactForm);
      const result = document.querySelector("#contact-result");
      result.textContent = `Thanks, ${data.get("name")}. Your enquiry is ready in this demo, but it has not been sent. Connect a secure backend or trusted form service to receive messages.`;
      result.hidden = false;
    });
  }
  const newsletter = document.querySelector("#newsletter-form");
  if (newsletter) {
    newsletter.addEventListener("submit", event => {
      event.preventDefault();
      document.querySelector("#newsletter-message").textContent = "Thanks! This demo does not subscribe you to a mailing list.";
      newsletter.reset();
    });
  }
});