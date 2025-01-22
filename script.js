document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const loadingRow = document.createElement("tr");
  loadingRow.id = "loading";
  loadingRow.innerHTML = `<td colspan="2" class="text-center">Loading...</td>`;
  output.appendChild(loadingRow);

  const createPromise = (name) => {
    const delay = Math.random() * 2 + 1;
    return new Promise((resolve) =>
      setTimeout(() => resolve({ name, time: delay.toFixed(3) }), delay * 1000)
    );
  };

  const promises = [
    createPromise("Promise 1"),
    createPromise("Promise 2"),
    createPromise("Promise 3"),
  ];

  const startTime = performance.now();

  Promise.all(promises).then((results) => {
    const totalTime = (performance.now() - startTime) / 1000;
    const loadingElement = document.getElementById("loading");
    if (loadingElement) {
      loadingElement.remove();
    }
    results.forEach((result) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${result.name}</td><td>${result.time}</td>`;
      output.appendChild(row);
    });
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `<td>Total</td><td>${totalTime.toFixed(3)}</td>`;
    output.appendChild(totalRow);
  });
});
