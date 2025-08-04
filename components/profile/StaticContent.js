const content = {
    support: {
        title: 'Help & Support',
        body: `
            <p className="mb-4">For any questions, issues, or feedback, please don't hesitate to reach out to our customer support team.</p>
            <p className="mb-2"><strong>Email:</strong> support@hadotidailymart.com</p>
            <p className="mb-4"><strong>Phone:</strong> +91 12345 67890 (9 AM - 7 PM, Mon-Sat)</p>
            <p>Our team is dedicated to providing you with the best possible experience. We aim to respond to all queries within 24 hours.</p>
        `
    },
    refund: {
        title: 'Return & Refund Policy',
        body: `
            <p className="mb-4">We strive for quality and customer satisfaction. If you are not satisfied with an item, you can request a return or refund within <strong>24 hours</strong> of delivery for perishable goods and within <strong>3 days</strong> for non-perishable items.</p>
            <h4 className="font-semibold mt-6 mb-2">Conditions for Return:</h4>
            <ul className="list-disc list-inside mb-4">
                <li>Item must be in its original packaging.</li>
                <li>Proof of purchase (order ID, invoice) is required.</li>
                <li>Items like milk, bread, and eggs must be reported within 6 hours of delivery.</li>
                <li>No returns on opened or used products.</li>
            </ul>
            <h4 className="font-semibold mt-6 mb-2">Refund Process:</h4>
            <p>Once your return is approved, the refund will be processed within 5-7 business days to your original payment method or as store credit.</p>
        `
    }
}

const StaticContent = ({ page }) => {
    const { title, body } = content[page] || { title: 'Not Found', body: '<p>This page does not exist.</p>'};

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">{title}</h2>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: body }} />
        </div>
    );
};

export default StaticContent;