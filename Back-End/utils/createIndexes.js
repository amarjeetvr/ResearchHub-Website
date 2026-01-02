import mongoose from 'mongoose';

// Database indexing strategy for optimal performance
const createIndexes = async () => {
  try {
    console.log('🔍 Creating database indexes...');

    // Project indexes for search and filtering
    await mongoose.connection.db.collection('projects').createIndexes([
      // Text search index for title and skills
      { key: { title: 'text', skills: 'text', introduction: 'text' }, name: 'project_search' },
      
      // Compound indexes for common queries
      { key: { status: 1, createdAt: -1 }, name: 'status_date' },
      { key: { clientId: 1, status: 1 }, name: 'client_status' },
      { key: { assignedFreelancer: 1, status: 1 }, name: 'freelancer_status' },
      { key: { 'bids.freelancerId': 1, 'bids.status': 1 }, name: 'bid_freelancer' },
      
      // Budget and deadline filters
      { key: { budgetMin: 1, budgetMax: 1 }, name: 'budget_range' },
      { key: { deadline: 1, status: 1 }, name: 'deadline_status' },
      
      // Category and skills
      { key: { category: 1, status: 1 }, name: 'category_status' },
      { key: { skills: 1, status: 1 }, name: 'skills_status' }
    ]);

    // User indexes - check if exists first
    const userIndexes = await mongoose.connection.db.collection('users').listIndexes().toArray();
    const hasEmailIndex = userIndexes.some(idx => idx.name === 'email_unique' || idx.name === 'email_1');
    
    if (!hasEmailIndex) {
      await mongoose.connection.db.collection('users').createIndex(
        { email: 1 }, 
        { unique: true, name: 'email_unique' }
      );
    }

    // Other user indexes
    await mongoose.connection.db.collection('users').createIndexes([
      { key: { googleId: 1 }, sparse: true, unique: true, name: 'google_id_unique' },
      { key: { role: 1, createdAt: -1 }, name: 'role_date' }
    ]);

    console.log('✅ Database indexes created successfully');
  } catch (error) {
    console.error('❌ Error creating indexes:', error.message);
  }
};

export default createIndexes;