export function showAlert(type, message) {
  const container = document.getElementById("alertContainer");

  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;

  const span = document.createElement("span");
  span.textContent = message;
  alert.appendChild(span);

  const closeBtn = document.createElement("button");
  closeBtn.className = "alert-close";
  closeBtn.textContent = "×";
  closeBtn.addEventListener("click", function () {
    closeAlert(this);
  });
  alert.appendChild(closeBtn);

  container.appendChild(alert);

  setTimeout(() => {
    alert.classList.add("alertON");
  }, 10);

  setTimeout(() => {
    closeAlert(alert);
  }, 4000);
}

function closeAlert(element) {
  const alert = element.closest(".alert");
  alert.classList.remove("alertON");
  alert.classList.add("alertOFF");

  setTimeout(() => {
    alert.remove();
  }, 400);
}
