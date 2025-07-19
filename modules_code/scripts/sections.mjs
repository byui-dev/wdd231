export function populateSections(sections) {
  const sectionSelect = document.querySelector("#sectionNumber");
  sectionSelect.innerHTML = ""; // Clear previous options if any
  sections.forEach((section) => {
    const option = document.createElement("option");
    option.value = section.sectionNumber;
    option.textContent = `${section.sectionNumber}`;
    sectionSelect.appendChild(option);
  });
}