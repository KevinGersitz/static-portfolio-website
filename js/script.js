document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('themeToggle');
    const body = document.body;
  
    // Load theme from localStorage on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-mode');
    }
  
    // Toggle theme and save preference
    toggleButton.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
  
      // Save to localStorage
      if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });
  });