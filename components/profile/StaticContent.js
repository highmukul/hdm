const content = {
    support: {
        title: 'Help & Support',
        body: `
            <p class="text-gray-600 leading-relaxed mb-6">For any questions, issues, or feedback, please don't hesitate to reach out to our customer support team. We're here to help!</p>
            <div class="space-y-4">
                <div class="p-4 bg-gray-50 rounded-lg">
                    <h4 class="font-semibold text-gray-800">Email Us</h4>
                    <a href="mailto:support@hadotidailymart.com" class="text-blue-600 hover:underline">support@hadotidailymart.com</a>
                    <p class="text-sm text-gray-500 mt-1">We aim to respond within 24 hours.</p>
                </div>
                <div class="p-4 bg-gray-50 rounded-lg">
                    <h4 class="font-semibold text-gray-800">Call Us</h4>
                    <p class="text-gray-700">+91 12345 67890</p>
                    <p class="text-sm text-gray-500 mt-1">Available from 9 AM to 7 PM, Monday to Saturday.</p>
                </div>
            </div>
        `
    },
    terms: {
        title: 'Terms & Conditions',
        body: `
            <p class="text-gray-600 leading-relaxed mb-4">Welcome to our app. By using our services, you agree to the following terms and conditions.</p>
            <h4 class="font-semibold text-lg mt-6 mb-2 text-gray-800">1. Account Responsibility</h4>
            <p class="text-gray-600 leading-relaxed">You are responsible for maintaining the confidentiality of your account and password and for restricting access to your device.</p>
            <h4 class="font-semibold text-lg mt-6 mb-2 text-gray-800">2. Prohibited Uses</h4>
            <p class="text-gray-600 leading-relaxed">You may not use the service for any illegal or unauthorized purpose. You must not, in the use of the Service, violate any laws in your jurisdiction.</p>
            <h4 class="font-semibold text-lg mt-6 mb-2 text-gray-800">3. Returns & Refunds</h4>
            <p class="text-gray-600 leading-relaxed">We accept returns on non-perishable items within 3 days of delivery. Perishable goods must be reported within 24 hours. All returns are subject to inspection.</p>
        `
    }
};

const StaticContent = ({ page }) => {
    const { title, body } = content[page] || { title: 'Page Not Found', body: '<p>The content you are looking for does not exist.</p>'};

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
            <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: body }} />
        </div>
    );
};

export default StaticContent;
