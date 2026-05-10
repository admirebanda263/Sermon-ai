// Configuration
const API_CONFIG = {
    // TODO: Replace with your actual AI API endpoint
    endpoint: 'https://api.example.com/generate-sermon',
    apiKey: 'your-api-key-here',
};

// Sample sermons for testing (remove after integrating with AI API)
const sampleSermons = {
    'john 3:16': `For God So Loved the World

    Good morning, beloved. Today we gather to reflect on one of the most profound verses in scripture: John 3:16.

    "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."

    This verse encapsulates the very heart of our faith. It speaks to the immeasurable love of God—a love so vast, so deep, that it compelled the Almighty to send His own Son to walk among us.

    Consider the love described here. It is not a love that judges from afar, but a love that enters into our pain and suffering. Jesus came not in judgment, but in mercy. He came to show us a better way—the way of compassion, forgiveness, and redemption.

    When we embrace this love, when we truly believe in Him, we are promised not just survival, but eternal life. This is not merely existence—it is a transformed existence, filled with purpose, peace, and the presence of the Holy Spirit.

    Brothers and sisters, I invite you today to accept this incredible gift. To believe not just with your mind, but with your heart. For in doing so, we join an eternal community of the redeemed, bound together in love.

    Amen.`,

    'love': `The Greatest Commandment

    Greetings, dear congregation. Today I want to talk about love—the most powerful force in the universe, and yet often the most misunderstood.

    Jesus told us, "Love your neighbor as yourself." But what does this truly mean?

    Love is not merely a feeling or an emotion. It is an action. It is a commitment to the well-being of another, even at cost to ourselves. Love is patient and kind. It does not envy or boast. Love is the foundation upon which all other virtues rest.

    In our modern world, we are surrounded by competing messages about what we should care for—money, status, power. Yet Jesus calls us to something radically different: to place others before ourselves, to serve, to forgive, to extend grace.

    When we love truly, as Christ loved us, we reflect the image of God. We become instruments of healing in a broken world. We become beacons of hope in darkness.

    I challenge each of you this week to perform one act of love without seeking recognition or reward. To love someone who may not love you back. To forgive someone who may not deserve it. In doing so, you participate in the redemptive work of Christ.

    Let us be a people defined by love.

    Amen.`,

    'forgiveness': `The Power of Forgiveness

    My beloved friends in Christ, today we gather to discuss one of the most liberating truths of our faith: forgiveness.

    Forgiveness is hard. When we have been hurt, betrayed, or wronged, our natural instinct is to hold onto that hurt, to build walls of resentment. Yet Jesus commands us to forgive—not just once, but seventy times seven.

    Why? Because unforgiveness is a prison we build for ourselves. We think we are punishing the other person, but in truth, we are binding ourselves to pain.

    Jesus demonstrated this ultimate forgiveness on the cross. Even as He suffered, He prayed, "Father, forgive them, for they do not know what they are doing." This is the example set before us.

    Forgiveness does not mean condoning what was wrong. It does not mean we forget or that there are no consequences. Rather, it means we release our right to revenge, and we entrust justice to God.

    When we forgive, we open the door to healing—both in our relationships and within ourselves. We become free to move forward. We become free to love again.

    This week, I invite you to identify someone you need to forgive. Whether it is a family member, a friend, or even yourself. Take that step toward freedom. Choose forgiveness.

    Amen.`,
};

// Generate Sermon Function
async function generateSermon() {
    const inputText = document.getElementById('inputText').value.trim();
    const outputText = document.getElementById('outputText');
    const generateBtn = document.getElementById('generateBtn');
    const spinner = document.getElementById('loadingSpinner');
    const errorMessage = document.getElementById('errorMessage');

    // Validation
    if (!inputText) {
        showError('Please enter a Bible verse, topic, or name.');
        return;
    }

    // Clear previous output and hide error
    outputText.value = '';
    errorMessage.classList.add('hidden');
    spinner.classList.remove('hidden');
    generateBtn.disabled = true;

    try {
        let sermon;

        // TODO: Uncomment the following lines and comment out the sample sermon logic
        // when you integrate with your actual AI API
        
        /*
        // Call AI API
        const response = await fetch(API_CONFIG.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_CONFIG.apiKey}`,
            },
            body: JSON.stringify({
                prompt: inputText,
                tone: 'inspirational',
                length: 'medium',
            }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        sermon = data.sermon;
        */

        // TEMPORARY: Use sample sermons for testing
        const lowerInput = inputText.toLowerCase();
        sermon = Object.keys(sampleSermons).find(key => 
            lowerInput.includes(key)
        );

        if (sermon) {
            sermon = sampleSermons[sermon];
        } else {
            // Generate a dynamic placeholder sermon if no match found
            sermon = generatePlaceholderSermon(inputText);
        }

        // Display the sermon with animation
        outputText.value = sermon;
        outputText.style.opacity = '0';
        setTimeout(() => {
            outputText.style.transition = 'opacity 0.5s ease';
            outputText.style.opacity = '1';
        }, 50);

    } catch (error) {
        console.error('Error generating sermon:', error);
        showError(`Error: ${error.message}. Please try again.`);
    } finally {
        spinner.classList.add('hidden');
        generateBtn.disabled = false;
    }
}

// Placeholder Sermon Generator (for testing)
function generatePlaceholderSermon(topic) {
    return `A Sermon on ${topic}

    Greetings, beloved congregation. Today we gather to reflect on the theme of ${topic}.

    This topic speaks to the heart of our faith and our daily lives. In scripture, we find wisdom that guides us toward a deeper understanding of God's purpose.

    As we contemplate ${topic}, we are reminded of the following principles:

    First, we must approach this matter with humility, recognizing that God's wisdom surpasses our own understanding.

    Second, we are called to seek truth in scripture, to allow the Word of God to illuminate our path.

    Third, we must apply these lessons to our lives, not merely as intellectual exercises, but as guides for living.

    In conclusion, I encourage each of you to spend time this week in prayer and reflection on ${topic}. Ask God to reveal how this truth applies to your unique circumstances and calling.

    Remember, dear friends, that we are not alone in our journey. We walk together as the body of Christ, supporting one another in faith and love.

    May you find peace, wisdom, and renewal in your contemplation of this sacred topic.

    Amen.`;
}

// Copy to Clipboard Function
function copyToClipboard() {
    const outputText = document.getElementById('outputText');
    
    if (!outputText.value) {
        showError('Nothing to copy. Generate a sermon first.');
        return;
    }

    navigator.clipboard.writeText(outputText.value).then(() => {
        // Visual feedback
        const copyBtn = document.getElementById('copyBtn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        copyBtn.style.backgroundColor = '#4CAF50';
        copyBtn.style.color = 'white';

        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.backgroundColor = '#e0e0e0';
            copyBtn.style.color = '#333';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        showError('Failed to copy to clipboard.');
    });
}

// Show Error Function
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
}

// Allow Enter key to generate sermon
document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    inputText.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateSermon();
        }
    });
});
