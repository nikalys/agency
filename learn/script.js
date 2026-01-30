// Learning Path Progress Tracker

document.addEventListener("DOMContentLoaded", () => {
  // Initialize progress tracking
  initializeProgress();
  
  // Set up topic toggles
  setupTopicToggles();
  
  // Set up step checkboxes
  setupStepCheckboxes();
  
  // Load saved progress
  loadProgress();
});

function initializeProgress() {
  const topics = document.querySelectorAll(".topic");
  const totalSteps = document.querySelectorAll(".step-checkbox").length;
  
  // Store total steps count
  localStorage.setItem("learnTotalSteps", totalSteps.toString());
}

function setupTopicToggles() {
  const toggles = document.querySelectorAll(".topic-toggle");
  
  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const topic = toggle.closest(".topic");
      const content = topic.querySelector(".topic-content");
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";
      
      // Toggle expanded state
      toggle.setAttribute("aria-expanded", !isExpanded);
      content.classList.toggle("expanded");
    });
  });
  
  // Expand first topic by default
  const firstTopic = document.querySelector(".topic");
  if (firstTopic) {
    const firstToggle = firstTopic.querySelector(".topic-toggle");
    const firstContent = firstTopic.querySelector(".topic-content");
    firstToggle.setAttribute("aria-expanded", "true");
    firstContent.classList.add("expanded");
  }
}

function setupStepCheckboxes() {
  const checkboxes = document.querySelectorAll(".step-checkbox");
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const step = checkbox.closest(".step");
      const stepId = step.dataset.step;
      
      if (checkbox.checked) {
        step.classList.add("completed");
        saveStepProgress(stepId, true);
      } else {
        step.classList.remove("completed");
        saveStepProgress(stepId, false);
      }
      
      updateProgress();
    });
  });
}

function saveStepProgress(stepId, completed) {
  const progress = getProgress();
  progress[stepId] = completed;
  localStorage.setItem("learnProgress", JSON.stringify(progress));
}

function getProgress() {
  const saved = localStorage.getItem("learnProgress");
  return saved ? JSON.parse(saved) : {};
}

function loadProgress() {
  const progress = getProgress();
  const checkboxes = document.querySelectorAll(".step-checkbox");
  
  checkboxes.forEach(checkbox => {
    const step = checkbox.closest(".step");
    const stepId = step.dataset.step;
    
    if (progress[stepId]) {
      checkbox.checked = true;
      step.classList.add("completed");
    }
  });
  
  updateProgress();
}

function updateProgress() {
  const checkboxes = document.querySelectorAll(".step-checkbox");
  const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
  const total = checkboxes.length;
  const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;
  
  // Update progress bar
  const progressFill = document.getElementById("progressFill");
  if (progressFill) {
    progressFill.style.width = `${percentage}%`;
  }
  
  // Update progress text
  const progressText = document.getElementById("progressText");
  if (progressText) {
    progressText.textContent = `${percentage}% Complete (${checked} of ${total} steps)`;
  }
  
  // Save overall progress
  localStorage.setItem("learnProgressPercentage", percentage.toString());
}

// Auto-expand topic when step is checked
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("step-checkbox") && e.target.checked) {
    const topic = e.target.closest(".topic");
    const toggle = topic.querySelector(".topic-toggle");
    const content = topic.querySelector(".topic-content");
    
    if (toggle.getAttribute("aria-expanded") === "false") {
      toggle.setAttribute("aria-expanded", "true");
      content.classList.add("expanded");
    }
  }
});

// Initialize progress on load
window.addEventListener("load", () => {
  updateProgress();
});
