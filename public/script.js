
const form = document.getElementById("contact-form");

if (!form) {
    console.error("Contact form not found!");
} else {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        console.log("Form submission intercepted!");

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch("/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok || !result.success) {
                alert(result.message|| "Failed to send message.");
                return;
            }

            alert(result.message);
            form.reset();
        } catch (error) {
            console.error("Error:", error);
            alert("Network error. Check your connection.");
        }
    });
}
