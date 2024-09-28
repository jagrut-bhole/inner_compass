const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)








document.getElementById("cards").onmousemove = e => {
    for(const card of document.getElementsByClassName("card")) {
      const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
  
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };
  }
  async function fetchThought() {
    const response = await fetch('https://api.quotable.io/random?limit=1&maxLength=50');
    const data = await response.json();
    return data.content + " - " + (data.author || "Unknown");
}

async function createCard(rowId) {
  const card = document.createElement("div");
  card.classList.add(
      "w-96", 
      "h-36", 
      "bg-gradient-to-br", 
      "from-black/10", // Light translucent color at the start
      "to-white/10",   // Slightly more transparent at the end
      "backdrop-blur-lg",  // Apply backdrop blur for the frosted glass effect
      "border", 
      "border-white/30",   // A semi-transparent white border
      "rounded-md", 
      "p-2", 
      "mr-4", 
      "flex", 
      "items-center", 
      "justify-center", 
      "text-center", 
      "shadow-md", 
      "absolute", 
      "text-white",
      "z-999" // Ensure text is readable against the glass background
  );
  card.innerHTML = await fetchThought(); 
  document.getElementById(rowId).appendChild(card);
  return card;
}

function animateCard(card, delay) {
    const startX = window.innerWidth;

    gsap.fromTo(card, 
        { x: startX },
        { 
            x: -card.offsetWidth,
            duration: 10,
            ease: "linear", 
            delay: delay,
            onComplete: function() {
                card.remove(); 
            }
        }
    );
}

function generateRow(rowId, rowDelay) {
    setInterval(async () => {
        const card = await createCard(rowId);
        animateCard(card, Math.random() * rowDelay);
    }, 5000);
}

generateRow("row-1", 2);
generateRow("row-2", 1.5);
generateRow("row-3", 2.5);



