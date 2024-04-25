// Ensure that the DOM is fully loaded before running the script
$(document).ready(function() {
    // Load additional HTML content for the clouds effect from an external file into the #cloudsContainer element
    $("#cloudsContainer").load("clouds.html");
});

// Listening for when the initial HTML document has been completely loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
    // Fetch the list of courses from a JSON file
    fetch('courses.json')
    .then(response => response.json())  // Parse the JSON in the response
    .then(data => {
        const courses = data;  // Store the parsed data in a variable

        // Extract a list of unique departments from the courses data
        const departments = [...new Set(courses.map(course => course.department))];

        // Get DOM elements for the department selector, course input field, and results container
        const departmentSelect = document.getElementById('departmentSelect');
        const courseInput = document.getElementById('courseInput');
        const results = document.getElementById('results');

        // Populate the department select dropdown with options
        departments.forEach(department => {
            const option = document.createElement('option');
            option.value = option.textContent = department;
            departmentSelect.appendChild(option);
        });

        // Function to filter courses based on the department and search query
        function filterCourses() {
            const selectedDepartment = departmentSelect.value;
            const searchQuery = courseInput.value.toLowerCase(); // Convert search query to lower case for case-insensitive comparison
            const filteredCourses = courses.filter(course =>
                (course.department === selectedDepartment || selectedDepartment === '') &&
                course.courseName.toLowerCase().includes(searchQuery)  // Check if the course name contains the search query
            );
            displayCourses(filteredCourses);
        }

        // Function to display filtered courses in the results section
        function displayCourses(filteredCourses) {
            results.innerHTML = '';  // Clear previous results
            filteredCourses.forEach(course => {
                const div = document.createElement('div');
                div.className = 'course';
                const exerciseClass = course.courseName.includes('תרגיל') ? 'exercise' : ''; // Add 'exercise' class if the course name includes 'תרגיל'
                div.innerHTML = `<span class="course-id">מספר קורס: ${course.id}</span><span><strong>חוג:</strong> ${course.department}</span><span class="course-title ${exerciseClass}">שם הקורס: ${course.courseName}</span><span class="lecturer-name"><strong>מרצים:</strong> ${course.lecturers}</span>`;
                results.appendChild(div);
            });
        }

        // Add event listeners to the department select and course input field to trigger filtering
        departmentSelect.addEventListener('change', filterCourses);
        courseInput.addEventListener('input', filterCourses);
    })
    .catch(error => console.error('Error loading the courses data:', error));  // Log any errors that occur during the fetch operation
});
