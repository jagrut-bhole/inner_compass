const mongoose = require('mongoose');
const Question = require('./models/blogs');
require('dotenv').config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Mongodb is connected...");
    populateBlogs();
  })
  .catch((err) => console.log("MongoDB Connection error", err));

// Function to populate questions
async function populateBlogs() {
    const blogs = [
      {
        "title": "Understanding Depression: Signs and Symptoms",
        "content": "Depression is more than just feeling sad. Learn to recognize its signs and symptoms.",
        "author": "Dr. Emily Chen",
        "date": "2024-09-15T10:00:00Z",
        "pageContent": "Depression is a complex mental health condition that affects millions of people worldwide. It's characterized by persistent feelings of sadness, hopelessness, and loss of interest in activities once enjoyed. However, depression is more than just feeling 'blue' or having a bad day.\n\nCommon signs and symptoms of depression include:\n\n1. Persistent sad, anxious, or 'empty' mood\n2. Feelings of hopelessness or pessimism\n3. Irritability\n4. Loss of interest or pleasure in hobbies and activities\n5. Decreased energy or fatigue\n6. Difficulty concentrating, remembering, or making decisions\n7. Sleep disturbances (insomnia or oversleeping)\n8. Appetite and/or weight changes\n9. Thoughts of death or suicide\n10. Physical aches or pains without clear physical cause\n\nIt's important to note that everyone experiences depression differently, and not all people will have all symptoms. If you or someone you know is experiencing several of these symptoms for two weeks or more, it's crucial to seek professional help.\n\nDepression is a treatable condition. Treatment options include psychotherapy (such as cognitive-behavioral therapy), medication (such as antidepressants), or a combination of both. Lifestyle changes like regular exercise, maintaining a healthy diet, and ensuring adequate sleep can also help manage symptoms.\n\nRemember, seeking help is a sign of strength, not weakness. If you're struggling with depression, reach out to a mental health professional, your primary care physician, or a trusted friend or family member. You don't have to face depression alone."
      },
      {
        "title": "The Importance of Self-Care in Mental Health",
        "content": "Self-care isn't selfish. It's essential for maintaining good mental health.",
        "author": "Sarah Johnson, LMHC",
        "date": "2024-09-20T14:30:00Z",
        "pageContent": "In our fast-paced world, it's easy to neglect our own needs while trying to meet the demands of work, family, and social obligations. However, self-care is not a luxury—it's a necessity for maintaining good mental health and overall well-being.\n\nSelf-care refers to activities and practices that we engage in on a regular basis to reduce stress and enhance our well-being. It's about taking care of your physical, emotional, and mental health.\n\nHere are some reasons why self-care is crucial for mental health:\n\n1. Stress Reduction: Regular self-care activities can help lower stress levels, reducing the risk of burnout and mental health issues.\n\n2. Improved Emotional Regulation: When you take care of yourself, you're better equipped to handle life's challenges and regulate your emotions.\n\n3. Enhanced Self-Esteem: Prioritizing your needs sends a message to yourself that you are worthy of care and attention, boosting self-esteem.\n\n4. Better Physical Health: Mental and physical health are interconnected. Taking care of your body through exercise, proper nutrition, and adequate sleep can improve your mental state.\n\n5. Increased Productivity: When you're well-rested and feeling good, you're more likely to be productive and efficient in your daily tasks.\n\nSelf-care looks different for everyone, but here are some general ideas:\n\n- Practice mindfulness or meditation\n- Engage in regular physical exercise\n- Maintain a healthy sleep schedule\n- Eat a balanced diet\n- Spend time in nature\n- Pursue hobbies and interests\n- Connect with friends and loved ones\n- Set boundaries and learn to say 'no'\n- Seek professional help when needed\n\nRemember, self-care isn't selfish. It's about taking care of yourself so that you can be your best self for others too. Start small and be consistent. Even dedicating 15-30 minutes a day to self-care can make a significant difference in your mental health and overall quality of life."
      },
      {
        "title": "Breaking the Stigma: Mental Health in the Workplace",
        "content": "Mental health issues affect 1 in 5 employees. It's time to create supportive work environments.",
        "author": "Michael Torres, HR Specialist",
        "date": "2024-09-25T09:15:00Z",
        "pageContent": "Mental health issues in the workplace are more common than many people realize. According to recent studies, 1 in 5 employees experience a mental health condition each year. Despite this prevalence, there's still a significant stigma surrounding mental health in professional settings. It's time to break this stigma and create more supportive work environments.\n\nThe Impact of Mental Health on Work:\n- Decreased productivity\n- Increased absenteeism\n- Higher turnover rates\n- Strained workplace relationships\n- Reduced job satisfaction\n\nBreaking the stigma around mental health in the workplace is crucial for several reasons:\n\n1. Improved Employee Well-being: When employees feel supported in managing their mental health, their overall well-being improves.\n\n2. Increased Productivity: Addressing mental health concerns can lead to better focus, creativity, and efficiency.\n\n3. Better Workplace Culture: Open discussions about mental health foster a more inclusive and supportive work environment.\n\n4. Reduced Healthcare Costs: Early intervention and support for mental health issues can reduce long-term healthcare costs for both employees and employers.\n\n5. Talent Retention: Companies that prioritize mental health are more likely to retain valuable employees.\n\nSteps to Create a Mental Health-Friendly Workplace:\n\n1. Educate Leadership: Provide training for managers on recognizing signs of mental health issues and how to support employees.\n\n2. Implement Supportive Policies: Offer flexible work arrangements, mental health days, and comprehensive health insurance that includes mental health coverage.\n\n3. Promote Open Communication: Create a culture where employees feel safe discussing mental health concerns without fear of judgment or repercussions.\n\n4. Provide Resources: Offer access to Employee Assistance Programs (EAPs), counseling services, and mental health workshops.\n\n5. Lead by Example: Encourage leaders to share their own experiences with mental health, normalizing the conversation.\n\n6. Reduce Workplace Stress: Implement strategies to manage workload, set realistic deadlines, and promote work-life balance.\n\n7. Foster Social Connections: Encourage team-building activities and create spaces for social interaction.\n\nRemember, addressing mental health in the workplace is not just about managing problems—it's about creating an environment where all employees can thrive. By breaking the stigma and implementing supportive practices, we can create healthier, more productive workplaces for everyone."
      }
    ]
   

    try {
        await Question.insertMany(blogs);
        console.log("Questions added to the database.");
        mongoose.connection.close();
    } catch (err) {
        console.log("Error populating questions:", err);
        mongoose.connection.close();
    }
}
