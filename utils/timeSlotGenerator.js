export const generateDeliverySlots = () => {
    const slots = [];
    const now = new Date();
    const timeRanges = ["9am - 11am", "11am - 1pm", "2pm - 4pm", "4pm - 6pm"];

    for (let i = 0; i < 3; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() + i);
        const day = i === 0 ? "Today" : i === 1 ? "Tomorrow" : date.toLocaleDateString(undefined, { weekday: 'long' });

        timeRanges.forEach(range => {
            slots.push({
                id: `${date.toISOString().split('T')[0]}-${range}`,
                day,
                range,
            });
        });
    }
    return slots;
};