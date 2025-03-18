import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@alcom.com',
      role: 'ADMIN',
      avatarUrl: 'https://example.com/avatar.jpg'
    }
  });

  // Create sample instructor
  const instructor = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'instructor@alcom.com',
      role: 'INSTRUCTOR',
      avatarUrl: 'https://example.com/instructor.jpg'
    }
  });

  // Create sample course with chapters and topics
  const course = await prisma.course.create({
    data: {
      title: 'Introduction to Web Development',
      description: 'Learn the basics of web development',
      instructorId: instructor.id,
      thumbnailUrl: 'https://example.com/course.jpg',
      duration: '8 weeks',
      totalLessons: 24,
      level: 'Beginner',
      price: 99.99,
      startDate: new Date(),
      status: 'PUBLISHED',
      prerequisites: ['Basic computer skills'],
      skills: ['HTML', 'CSS', 'JavaScript'],
      chapters: {
        create: [
          {
            id: 'chapter-1',
            title: 'HTML Fundamentals',
            description: 'Learn HTML basics',
            duration: '2 hours',
            orderIndex: 1,
            topics: {
              create: [
                { title: 'Introduction to HTML', orderIndex: 1 },
                { title: 'HTML Elements', orderIndex: 2 }
              ]
            }
          }
        ]
      }
    }
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });