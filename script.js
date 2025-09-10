// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get all required elements
    const form = document.getElementById("mobileForm");
    const brandInput = document.getElementById("brand");
    const modelInput = document.getElementById("model");
    const outputDiv = document.getElementById("output");
    const submitBtn = document.getElementById("submitBtn");

    // Check if all required elements are found
    if (!form || !brandInput || !modelInput || !outputDiv || !submitBtn) {
        console.error("One or more required elements not found in DOM.");
        return;
    }

    // Add form submit event listener
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const brand = brandInput.value.trim();
        const model = modelInput.value.trim();

        // Validate inputs
        if (!brand || !model) {
            outputDiv.innerHTML = `<div class="error">❌ Please fill in both brand and model fields.</div>`;
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = "Loading...";
        outputDiv.innerHTML = `<div class="loading">🔄 Loading phone details...</div>`;

        // Simulate processing time
        setTimeout(() => {
            try {
                const query = `${brand} ${model} mobile phone`;
                const searchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                const specsURL = `https://www.gsmarena.com/results.php3?sQuickSearch=yes&sName=${encodeURIComponent(brand + ' ' + model)}`;

                outputDiv.innerHTML = `
                    <div class="phone-details success">
                        <p><strong>Brand:</strong> ${brand}</p>
                        <p><strong>Model:</strong> ${model}</p>
                        <a href="${searchURL}" target="_blank">🔍 Search on Google</a>
                        <a href="${specsURL}" target="_blank">📱 View Specs on GSMArena</a>
                    </div>
                `;
            } catch (error) {
                console.error("Error:", error);
                outputDiv.innerHTML = `<div class="error">❌ Could not load phone details. Error: ${error.message}</div>`;
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = "Submit";
            }
        }, 1000);
    });

    // Add keyboard support
    [brandInput, modelInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                form.dispatchEvent(new Event('submit'));
            }
        });
    });
});