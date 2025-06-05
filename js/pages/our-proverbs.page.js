document.addEventListener("DOMContentLoaded", () => {
  let btn = document.querySelector(".next-proverb-btn");
  let proverbEl = document.querySelector(".proverb-text");
  let personEl = document.querySelector(".person-proverb");
  let addBtn = document.querySelector(".add-proverb-btn");

  const proverbs = [
    {
      proverb: "To be, or not to be: that is the question.",
      person: "William Shakespeare",
    },
    {
      proverb:
        "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
      person: "Jane Austen",
    },
    {
      proverb: "Big Brother is watching you.",
      person: "George Orwell",
    },
    {
      proverb: "It does not do to dwell on dreams and forget to live.",
      person: "J.K. Rowling",
    },
    {
      proverb: "The secret of getting ahead is getting started.",
      person: "Mark Twain",
    },
    {
      proverb:
        "The world breaks everyone, and afterward, many are strong at the broken places.",
      person: "Ernest Hemingway",
    },
    {
      proverb:
        "So we beat on, boats against the current, borne back ceaselessly into the past.",
      person: "F. Scott Fitzgerald",
    },
    {
      proverb: "Be yourself, everyone else is already taken.",
      person: "Oscar Wilde",
    },
    {
      proverb:
        "All happy families are alike; each unhappy family is unhappy in its own way.",
      person: "Leo Tolstoy",
    },
  ];

  if (btn && proverbEl && personEl) {
    btn.addEventListener("click", function () {
      if (proverbs.length > 0) {
        let random = Math.floor(Math.random() * proverbs.length);
        proverbEl.innerText = proverbs[random].proverb;
        personEl.innerText = proverbs[random].person;
      } else {
        proverbEl.innerText = "No proverbs available.";
        personEl.innerText = "";
      }
    });
  }

  if (addBtn) {
    addBtn.addEventListener("click", function () {
      const newProverb = prompt("Enter the new proverb:");
      if (!newProverb || newProverb.trim() === "") {
        alert("Proverb cannot be empty.");
        return;
      }
      const newPerson = prompt("Enter the author of the proverb:");
      if (!newPerson || newPerson.trim() === "") {
        alert("Author cannot be empty.");
        return;
      }

      proverbs.push({ proverb: newProverb, person: newPerson });

      if (proverbEl && personEl) {
        proverbEl.innerText = newProverb;
        personEl.innerText = newPerson;
      }
      alert("Proverb added!");
    });
  }

  if (proverbEl && personEl && proverbs.length > 0) {
    proverbEl.innerText = proverbs[0].proverb;
    personEl.innerText = proverbs[0].person;
  } else if (proverbEl) {
    proverbEl.innerText = "No proverbs available.";
  }
});
