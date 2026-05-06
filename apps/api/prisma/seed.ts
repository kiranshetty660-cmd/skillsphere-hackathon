import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create a mock user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'alex@skillsphere.dev' },
    update: {},
    create: {
      email: 'alex@skillsphere.dev',
      password: hashedPassword,
      name: 'Alex Kumar',
      bio: 'Full-stack developer passionate about AI and scalable systems.',
      skillScore: 847,
      rank: 47,
      streak: 12,
      interests: JSON.stringify(['💻 Programming', '🤖 AI / ML', '🧮 DSA & Algorithms']),
      badges: JSON.stringify(['Beta Tester', 'Fast Learner']),
    },
  });

  // 2. Create Courses
  const courses = [
    { title: 'Python Professional', description: 'Master Python for backend and data science.', category: 'Programming', level: 'Intermediate', modulesCount: 24, durationHours: 18, emoji: '🐍' },
    { title: 'Java Developer', description: 'Core Java, Spring Boot, and Microservices.', category: 'Programming', level: 'Beginner', modulesCount: 18, durationHours: 14, emoji: '☕' },
    { title: 'Golang Advanced', description: 'Build high performance concurrent applications.', category: 'Programming', level: 'Advanced', modulesCount: 20, durationHours: 22, emoji: '🦫' },
    { title: 'C / C++ Fundamentals', description: 'Deep dive into memory management and pointers.', category: 'Programming', level: 'Beginner', modulesCount: 14, durationHours: 10, emoji: '⚙️' }
  ];

  for (const c of courses) {
    const course = await prisma.course.create({ data: c });
    
    // Add progress for Alex
    if (c.title === 'Python Professional') {
      await prisma.courseProgress.create({
        data: { courseId: course.id, userId: user.id, progressPercent: 62, completedModules: JSON.stringify(['mod1', 'mod2']) }
      });
    } else if (c.title === 'Java Developer') {
      await prisma.courseProgress.create({
        data: { courseId: course.id, userId: user.id, progressPercent: 30, completedModules: JSON.stringify(['mod1']) }
      });
    }
  }

  // 3. Create Job
  await prisma.job.create({
    data: {
      title: 'Backend Engineer (Python) — Remote',
      company: 'TechCorp Inc.',
      location: 'Remote',
      type: 'Full-time',
      description: '3+ yrs Python, REST APIs, PostgreSQL. Competitive pay + equity.',
      requirements: JSON.stringify(['Python', 'PostgreSQL', 'REST']),
    }
  });

  // 4. Create Post
  await prisma.post.create({
    data: {
      userId: user.id,
      content: 'Just hit a 100-day streak on SkillSphere! Consistent practice really makes a difference. 🚀',
      type: 'Achievement',
      tags: JSON.stringify(['Streak', 'Motivation']),
      likesCount: 142,
      commentsCount: 24
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
