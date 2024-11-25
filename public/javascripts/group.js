function toggleForm() {
    const form = document.getElementById('groupForm');
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block'; // Show the form
    } else {
        form.style.display = 'none'; // Hide the form
    }
}